import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const create_patient_plan = createAsyncThunk("create_patient_plan", async ({ category, exerciseId, patientId, sets, heartRateTarget, zoneTarget, intensity, pace, distanceGoal, weekdays }, thunkAPI) => {
    const token = Cookies.get('authToken');
    const validToken = "Bearer " + token;
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", validToken);

        const raw = JSON.stringify({
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
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/create-plan`, requestOptions)
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

const createPatientPlan = createSlice({
    name: "createPatientPlan",
    initialState: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        data: null,
        error: null
    },
    reducers: {
        clear_create_patient_plan_state: (state) => {
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
            .addCase(create_patient_plan.pending, (state) => {
                state.isLoading = true
            })
            .addCase(create_patient_plan.fulfilled, (state, action) => {
                state.isSuccess = true
                state.data = action.payload
                state.isLoading = false
            })
            .addCase(create_patient_plan.rejected, (state, action) => {
                state.isError = true
                state.error = action.payload
                state.isLoading = false
            })
    }
})
export const { clear_create_patient_plan_state } = createPatientPlan.actions
export default createPatientPlan.reducer