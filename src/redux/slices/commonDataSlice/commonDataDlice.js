import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const common_data_api = createAsyncThunk("common_data_api", async (thunkAPI) => {
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

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/common-data`, requestOptions)
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

const commonDataAPI = createSlice({
    name: "commonDataAPI",
    initialState: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        data: [],
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(common_data_api.pending, (state) => {
                state.isLoading = true
            })
            .addCase(common_data_api.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.data = action.payload
            })
            .addCase(common_data_api.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.payload
            })
    }
})

export default commonDataAPI.reducer