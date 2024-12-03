import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const patient_onboarding_api = createAsyncThunk("patient_onboarding_api", async ({ step, stepOnefullData, selected_health_issue,trainer_name, height_unit, weight_unit, stepThreefullData, third_step_weight_unit, step_four_additional_information, workout_frequency }, thunkAPI) => {
    const token = Cookies.get('authToken');
    const validToken = "Bearer " + token;
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", validToken);

        const raw = JSON.stringify({
            "name": stepOnefullData?.name,
            "phone": stepOnefullData?.tel,
            "email": stepOnefullData?.email,
            "gender": stepOnefullData?.gender,
            "height": {
                "unit": height_unit,
                "value": stepOnefullData?.height
            },
            "weight": {
                "unit": weight_unit,
                "value": stepOnefullData?.weight
            },
            "goal": stepOnefullData?.goal,
            "dob": stepOnefullData?.date,
            "trainerID": stepOnefullData?.trainer,
            "trainerName" :trainer_name,
            "step": step,
            "health_issue_text": selected_health_issue,
            "optimal_weight": {
                "unit": third_step_weight_unit,
                "value": stepThreefullData?.optimalWeight
            },
            "fat_percentage": {
                "unit": "perc",
                "value": stepThreefullData?.bodyFat
            },
            "discomfort": stepThreefullData?.discomfort,
            "activity_level": stepThreefullData?.activityLevel,
            "sleep_rate": stepThreefullData?.sleepHours,
            "workout_types": stepThreefullData?.workoutTypes,
            "workout_place": stepThreefullData?.workoutPlace,
            "equipment": stepThreefullData?.homeEquipment,
            "workout_time": stepThreefullData?.workoutTime,
            "exercise_perweek": workout_frequency,
            "additional_information": step_four_additional_information
        });
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/patient/create`, requestOptions)
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

const patientOnboardingAPI = createSlice({
    name: "patientOnboardingAPI",
    initialState: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        error: null,
        message: null
    },
    reducers: {
        clear_patient_onboarding_state: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.error = null
            state.message = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(patient_onboarding_api.pending, (state) => {
                state.isLoading = true
            })
            .addCase(patient_onboarding_api.fulfilled, (state, action) => {
                state.isLoading = false
                state.message = action.payload
                state.isSuccess = true
            })
            .addCase(patient_onboarding_api.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
                state.isError = true
            })
    }
})
export const { clear_patient_onboarding_state } = patientOnboardingAPI.actions
export default patientOnboardingAPI.reducer