import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const user_validate_token = createAsyncThunk("user_validate_token", async ({ token }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "token": token
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/staff/validate-token`, requestOptions)
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

const userValidateToken = createSlice({
    name: "userValidateToken",
    initialState: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: null,
        error: null
    },
    reducers: {
        clear_user_validate_token_state: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = null
            state.error = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(user_validate_token.pending, (state) => {
                state.isLoading = true
            })
            .addCase(user_validate_token.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(user_validate_token.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.payload
            })
    }
})
export const { clear_user_validate_token_state } = userValidateToken.actions
export default userValidateToken.reducer