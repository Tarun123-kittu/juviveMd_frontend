import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const get_trainer_chat_response_report = createAsyncThunk("get_trainer_chat_response_report", async (thunkAPI) => {
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

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/chat-response-report`, requestOptions)
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

const GetTrainerChatResponseReport = createSlice({
    name: "GetTrainerChatResponseReport",
    initialState: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        data: null,
        error: null
    },
    reducers: {
        clear_trainer_chat_response_report_state: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.data = null
            state.error = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_trainer_chat_response_report.pending, (state) => {
                state.isLoading = true
            })
            .addCase(get_trainer_chat_response_report.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.data = action?.payload
            })
            .addCase(get_trainer_chat_response_report.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action?.payload
            })
    }
})

export const { clear_user_activity_report_state } = GetTrainerChatResponseReport.actions
export default GetTrainerChatResponseReport.reducer