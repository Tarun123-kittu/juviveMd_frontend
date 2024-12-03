import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const update_patient_payment_api = createAsyncThunk("update_patient_payment_api", async ({ id, payment_status }, thunkAPI) => {

    const token = Cookies.get('authToken');
    const validToken = "Bearer " + token;
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", validToken);

        const raw = JSON.stringify({
            "id": id,
            "payment": payment_status
        });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/patient/update-payment`, requestOptions)
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

const updatePatientPaymentAPI = createSlice({
    name: "updatePatientPaymentAPI",
    initialState: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: null,
        error: null
    },
    reducers: {
        clear_patient_payment_update_state: (state) => {
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
            .addCase(update_patient_payment_api.pending, (state) => {
                state.isLoading = true
            })
            .addCase(update_patient_payment_api.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(update_patient_payment_api.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.payload
            })
    }
})
export const { clear_patient_payment_update_state } = updatePatientPaymentAPI.actions
export default updatePatientPaymentAPI.reducer