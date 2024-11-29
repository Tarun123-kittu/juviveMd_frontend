import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const get_trainers = createAsyncThunk("get_trainers", async (thunkAPI) => {
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
        
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/trainers-list`, requestOptions)
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

const getTrainersAPI = createSlice({
    name: "getTrainersAPI",
    initialState: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        data: [],
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_trainers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(get_trainers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.data = action.payload
            })
            .addCase(get_trainers.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.payload
            })
    }
})

export default getTrainersAPI.reducer

