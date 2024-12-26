import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const get_patient_difficuilties = createAsyncThunk("get_patient_difficuilties", async ({ patientId }, thunkAPI) => {
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

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/patient-difficulties?patientId=${patientId}`, requestOptions)
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

export const getPatientDifficuilties = createSlice({
    name: "getPatientDifficuilties",
    initialState: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        data: null,
        error: null
    },
    reducers: {
        clear_patient_difficuilties_state: (state) => {
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
            .addCase(get_patient_difficuilties.pending, (state) => {
                state.isLoading = true
            })
            .addCase(get_patient_difficuilties.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.data = action.payload
            })
            .addCase(get_patient_difficuilties.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.payload
            })
    }
})
export const { clear_patient_difficuilties_state } = getPatientDifficuilties.actions
export default getPatientDifficuilties.reducer