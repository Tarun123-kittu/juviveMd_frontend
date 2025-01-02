import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const get_whole_chat = createAsyncThunk("get_whole_chat", async ({ page, receiverId }, thunkAPI) => {
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

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/whole-chat?page=${page}&receiverId=${receiverId}`, requestOptions)
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

const getWholeChat = createSlice({
    name: "getWholeChat",
    initialState: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        error: null,
        data: null
    },
    reducers: {
        clear_whole_chat_state: (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.error = null
            state.data = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_whole_chat.pending, (state) => {
                state.isLoading = true
            })
            .addCase(get_whole_chat.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload
                state.isSuccess = true
            })
            .addCase(get_whole_chat.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
                state.isError = true
            })
    }
})

export const { clear_whole_chat_state } = getWholeChat.actions
export default getWholeChat.reducer