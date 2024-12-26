import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const updatePatientPlan = createAsyncThunk("updatePatientPlan", async ({ id, category, exerciseId, patientId, sets, heartRateTarget, zoneTarget, intensity, pace, distanceGoal, weekdays }, thunkAPI) => {
    const token = Cookies.get('authToken');
    if (!token) {
        return thunkAPI.rejectWithValue({ message: "Authentication token is missing" });
    }

    const validToken = "Bearer " + token;

    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    if (!backendUrl) {
        return thunkAPI.rejectWithValue({ message: "Backend URL is not defined" });
    }
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", validToken);

        const raw = JSON.stringify({
            "planId": id,
            "category": category,
            "exerciseId": exerciseId,
            "patientId": patientId,
            "sets": sets,
            "heartRateTarget": heartRateTarget,
            "zoneTarget": zoneTarget,
            "intensity": intensity,
            "pace": pace,
            "distanceGoal": distanceGoal,
            "weekdays": weekdays
        });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(`${backendUrl}/update-plan-exercise`, requestOptions)
        if (!response.ok) {
            const errorMessage = await response.json();
            throw new Error(errorMessage?.message || "An unknown error occurred");
        }

        const result = await response.json();
        return result;
    } catch (error) {
        return thunkAPI.rejectWithValue({
            message: error?.message || "An unexpected error occurred",
        });
    }
})

const update_patient_plan = createSlice({
    name: "update_patient_plan",
    initialState: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        data: null,
        error: null
    },
    reducers: {
        clear_update_patient_plan_state: (state) => {
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
            .addCase(updatePatientPlan.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updatePatientPlan.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.data = action.payload
            })
            .addCase(updatePatientPlan.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.payload
            })
    }
})
export const { clear_update_patient_plan_state } = update_patient_plan.actions
export default update_patient_plan.reducer