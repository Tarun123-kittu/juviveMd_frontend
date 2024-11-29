import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const update_staff = createAsyncThunk("update_staff", async ({ data, id }, thunkAPI) => {
    const token = Cookies.get('authToken');
    const validToken = "Bearer " + token;
    console.log(data?.image,"this is from redux store")
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", validToken);

        const formdata = new FormData();
        formdata.append("profilePic", data?.image);
        formdata.append("firstName", data?.firstName);
        formdata.append("lastName", data?.lastName);
        formdata.append("phone", data?.phone);
        formdata.append("gender", data?.gender);
        formdata.append("email", data?.email);
        formdata.append("address", data?.address);
        formdata.append("role", data?.role);
        formdata.append("hasImage", data?.hasImage);
        formdata.append("id", id);

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: formdata,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/staff/update`, requestOptions)
        if (!response.ok) {
            const errorMessage = await response.json();
            if (errorMessage) {
                throw new Error(errorMessage.message);
            }
        }

        const result = await response.json();
        return result;
    } catch (error) {
        return thunkAPI.rejectWithValue({
            message: error.message,
        });
    }
})

const updateStaffAPI = createSlice({
    name: "updateStaffAPI",
    initialState: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        message: null,
        error: null
    },
    reducers: {
        clear_update_staff_state: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = null
            state.error = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(update_staff.pending, (state) => {
                state.isLoading = true
            })
            .addCase(update_staff.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(update_staff.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.payload
            })
    }
})

export const { clear_update_staff_state } = updateStaffAPI.actions
export default updateStaffAPI.reducer