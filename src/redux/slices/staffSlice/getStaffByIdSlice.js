import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const get_single_staff = createAsyncThunk("get_single_staff", async ({ staffId }, thunkAPI) => {
    const token = Cookies.get('authToken');
    const validToken = "Bearer " + token;
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", validToken);


        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/staff-user/${staffId}`, requestOptions)
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

const getSingleStaffAPI = createSlice({
    name: "getSingleStaffAPI",
    initialState: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        data: {},
        error: null
    },
    reducers: {
        clear_single_staff_state: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.data = {}
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_single_staff.pending, (state) => {
                state.isLoading = true
            })
            .addCase(get_single_staff.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.data = action.payload
            })
            .addCase(get_single_staff.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.payload
            })
    }
})
export const { clear_single_staff_state } = getSingleStaffAPI.actions
export default getSingleStaffAPI.reducer