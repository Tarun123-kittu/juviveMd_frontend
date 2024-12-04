import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const patient_validate_token = createAsyncThunk("patient_validate_token", async ({ token }, thunkAPI) => {
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

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/patient/validate-token`, requestOptions)
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

const patientValidateToken = createSlice({
    name: "patientValidateToken",
    initialState: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: null,
        error: null
    },
    reducers: {
        clear_patient_validate_token_state: (state) => {
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
            .addCase(patient_validate_token.pending, (state) => {
                state.isLoading = true
            })
            .addCase(patient_validate_token.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(patient_validate_token.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.payload
            })
    }
})
export const { clear_patient_validate_token_state } = patientValidateToken.actions
export default patientValidateToken.reducer