import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const read_message = createAsyncThunk("read_message", async ({ receiverId }, thunkAPI) => {
    const token = Cookies.get('authToken');
    const validToken = "Bearer " + token;
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", validToken);

        const raw = JSON.stringify({
            "receiverId": receiverId
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/read-message`, requestOptions)
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

const ReadMessageAPI = createSlice({
    name: "ReadMessageAPI",
    initialState: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        data: null,
        error: null
    },
    reducers: {
        clear_read_message_state: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.data = null
            state.error = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(read_message.pending, (state) => {
                state.isLoading = true
            })
            .addCase(read_message.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.data = action.payload
            })
            .addCase(read_message.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.payload
            })
    }
})
export const { clear_read_message_state } = ReadMessageAPI.actions
export default ReadMessageAPI.reducer

