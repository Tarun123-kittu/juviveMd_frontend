import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';



export const create_staff_api = createAsyncThunk("create_staff_api", async ({ data }, thunkAPI) => {
    const token = Cookies.get('authToken');

    const validToken = "Bearer " + token;

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
        formdata.append("hasImage", true);
        formdata.append("countryCode", data?.countryCode);

        const requestOptions = {
            method: "POST",
            headers: myHeaders, 
            body: formdata,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/staff/create`, requestOptions);
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
});


const createStaffAPI = createSlice({
    name: "createStaffAPI",
    initialState: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        error: null,
        message: {}
    },
    reducers: {
        clear_create_staff_state: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = {}
            state.error = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(create_staff_api.pending, (state) => {
                state.isLoading = true
            })
            .addCase(create_staff_api.fulfilled, (state, action) => {
                state.isLoading = false
                state.message = action.payload
                state.isSuccess = true
            })
            .addCase(create_staff_api.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.payload
            })
    }
})
export const { clear_create_staff_state } = createStaffAPI.actions
export default createStaffAPI.reducer