import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const get_patient_weight__report = createAsyncThunk("get_patient_weight__report", async ({ patientId }, thunkAPI) => {
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

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/patient-weight-report?patientId=${patientId}`, requestOptions)
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

const getPatientWeightReportSlice = createSlice({
    name: "getPatientWeightReportSlice",
    initialState: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        data: null,
        error: null
    },
    reducers: {
        clear_get_patient_weight_report_state: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.data = null
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_patient_weight__report.pending, (state) => {
                state.isLoading = true
            })
            .addCase(get_patient_weight__report.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.data = action.payload
            })
            .addCase(get_patient_weight__report.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.error
            })
    }
})

export const { clear_get_patient_exercise_plan_state } = getPatientWeightReportSlice.actions
export default getPatientWeightReportSlice.reducer
