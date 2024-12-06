import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const get_quotes = createAsyncThunk("get_quotes", async (thunkAPI) => {
    try {
        const response = await fetch("https://dummyjson.com/quotes")
        const result = await response.json()
        return result
    } catch (error) {
        return thunkAPI.rejectWithValue({
            message: error.message,
        });
    }
})

const getQuotesAPI = createSlice({
    name: "getQuotesAPI",
    initialState: {
        isSuccess : false,
        data: []
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_quotes.fulfilled, (state, action) => {
                state.isSuccess = true
                state.data = action.payload
            })
    }
})

export default getQuotesAPI.reducer