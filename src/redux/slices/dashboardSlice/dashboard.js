import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const dashboard_api = createAsyncThunk("dashboard_api", async (thunkAPI) => {
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

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/dashboard`, requestOptions)
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

const DashboardAPI = createSlice({
    name: "DashboardAPI",
    initialState: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        data: null,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(dashboard_api.pending, (state) => {
                state.isLoading = true
            })
            .addCase(dashboard_api.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.data = action.payload
            })
            .addCase(dashboard_api.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.error = action.payload
            })
    }
})

export default DashboardAPI.reducer