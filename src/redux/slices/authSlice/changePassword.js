import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const change_password = createAsyncThunk("change_password", async ({ currentPassword, newPassword, confirmNewPassword }, thunkAPI) => {
    const token = Cookies.get('authToken');

    const validToken = "Bearer " + token;
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", validToken);

        const raw = JSON.stringify({
            "currentPassword": currentPassword,
            "newPassword": newPassword,
            "confirmNewPassword": confirmNewPassword
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/change-password`, requestOptions)
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

const changePasswordAPI = createSlice({
    name: "createPasswordAPI",
    initialState: {
        isSuccess: false,
        isError: false,
        isLoading: false,
        error: null,
        data: null
    },
    reducers: {
        clear_change_password_api_state: (state) => {
            state.isSuccess = false
            state.isError = false
            state.isLoading = false
            state.error = null
            state.data = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(change_password.pending, (state) => {
                state.isLoading = true
            })
            .addCase(change_password.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.data = action.payload
            })
            .addCase(change_password.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.payload
            })
    }
})

export const { clear_change_password_api_state } = changePasswordAPI.actions
export default changePasswordAPI.reducer