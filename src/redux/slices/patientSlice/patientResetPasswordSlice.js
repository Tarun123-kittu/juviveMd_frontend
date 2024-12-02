import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const patient_reset_password = createAsyncThunk("patient_reset_password", async ({ token, password, confirmPassword }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "token": token,
            "password": password,
            "confirmPassword": confirmPassword
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/reset-password`, requestOptions)
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

const patientResetPasswordAPI = createSlice({
    name: "patientResetPasswordAPI",
    initialState: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: {},
        error: null
    },
    reducers: {
        clear_patient_reset_password_state: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = {}
            state.error = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(patient_reset_password.pending, (state) => {
                state.isLoading = true
            })
            .addCase(patient_reset_password.fulfilled, (state, action) => {
                state.isLoading = false
                state.message = action.payload
                state.isSuccess = true
            })
            .addCase(patient_reset_password.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
                state.isError = true
            })
    }
})
export const { clear_patient_reset_password_state } = patientResetPasswordAPI.actions
export default patientResetPasswordAPI.reducer