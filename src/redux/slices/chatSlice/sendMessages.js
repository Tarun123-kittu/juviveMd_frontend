import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const send_message = createAsyncThunk("send_message", async ({ receiverId, message }, thunkAPI) => {
    const token = Cookies.get('authToken');
    const validToken = "Bearer " + token;
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", validToken);

        const raw = JSON.stringify({
            "receiverId": receiverId,
            "message": message
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/message`, requestOptions)
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

const sendMessages = createSlice({
    name: "sendMessages",
    initialState: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        error: null,
        data: null
    },
    reducers: {
        clear_send_message_state: (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.data = null
            state.error = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(send_message.pending, (state) => {
                state.isLoading = true
            })
            .addCase(send_message.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.data = action.Payload
            })
            .addCase(send_message.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.payload
            })
    }
})
export const { clear_send_message_state } = sendMessages.actions
export default sendMessages.reducer