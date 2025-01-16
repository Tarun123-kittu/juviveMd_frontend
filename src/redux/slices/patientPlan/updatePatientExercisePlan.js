import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const updatePatientExercisePlan = createAsyncThunk("updatePatientExercisePlan", async ({ planId, patientId, planValidFrom, planValidTo, days }, thunkAPI) => {
    const token = Cookies.get('authToken');
    const validToken = "Bearer " + token;
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", validToken);

        const raw = JSON.stringify({
            "planId": planId,
            "patientId": patientId,
            "planValidFrom": planValidFrom,
            "planValidTo": planValidTo,
            "days": days
        });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/update-plan-exercise`, requestOptions)
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

const updatePatientExercisePlanSlice = createSlice({
    name: "updatePatientExercisePlanSlice",
    initialState: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        error: null,
        data: null,
    },
    reducers: {
        clear_update_patient_exercise_plan_state: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.error = null;
            state.data = null;
            return state;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(updatePatientExercisePlan.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(updatePatientExercisePlan.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
        })
        builder.addCase(updatePatientExercisePlan.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload;
        })
    }
})

export const { clear_update_patient_exercise_plan_state } = updatePatientExercisePlanSlice.actions;
export default updatePatientExercisePlanSlice.reducer;