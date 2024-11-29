import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const get_all_staff = createAsyncThunk("get_all_staff", async ({ page }, thunkAPI) => {
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

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/staff?page=${page}`, requestOptions)
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

const getAllStaffAPI = createSlice({
    name: "getAllStaff",
    initialState: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        data: [],
        error: null
    },
    reducers: {
        clear_staff_data: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.data = []
            state.error = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_all_staff.pending, (state) => {
                state.isLoading = true
            })
            .addCase(get_all_staff.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.data = action.payload
            })
            .addCase(get_all_staff.rejected, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.error = null
            })
    }
})
export const { clear_staff_data } = getAllStaffAPI.actions
export default getAllStaffAPI.reducer