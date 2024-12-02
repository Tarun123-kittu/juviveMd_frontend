import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const update_patient = createAsyncThunk("update_patient", async ({ id, stepOnefullData, selected_health_issue, height_unit, weight_unit, stepThreefullData, third_step_weight_unit, step_four_additional_information, workout_frequency,patient_details }, thunkAPI) => {
    console.log(patient_details,"patient_detailspatient_details")
    const token = Cookies.get('authToken');
    const validToken = "Bearer " + token;
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", validToken);

        const raw = JSON.stringify({
            "id": id,
            "name": stepOnefullData?.name ? stepOnefullData?.name : patient_details?.name,
            "phone": stepOnefullData?.tel ? stepOnefullData?.tel : patient_details?.phone,
            "email": stepOnefullData?.email ? stepOnefullData?.email : patient_details?.email,
            "gender": stepOnefullData?.gender ? stepOnefullData?.gender : patient_details?.gender,
            "height": {
                "unit": height_unit ? height_unit : patient_details?.height?.unit,
                "value": stepOnefullData?.height ? stepOnefullData?.height : patient_details?.height?.value
            },
            "weight": {
                "unit": weight_unit ? weight_unit : patient_details?.weight?.unit,
                "value": stepOnefullData?.weight ? stepOnefullData?.weight : patient_details?.weight?.value
            },
            "goal": stepOnefullData?.goal ? stepOnefullData?.goal : patient_details?.goal,
            "dob": stepOnefullData?.date ? stepOnefullData?.date : patient_details?.dob,
            "trainerID": stepOnefullData?.trainer ? stepOnefullData?.trainer : patient_details?.trainerID,
            "step": 4,
            "health_issue_text": selected_health_issue ? selected_health_issue : patient_details?.health_issue_text,
            "optimal_weight": {
                "unit": third_step_weight_unit ? third_step_weight_unit : patient_details?.optimal_weight?.unit,
                "value": stepThreefullData?.optimalWeight ? stepThreefullData?.optimalWeight : patient_details?.optimal_weight?.value
            },
            "fat_percentage": {
                "unit": "perc",
                "value": stepThreefullData?.bodyFat ? stepThreefullData?.bodyFat : patient_details?.fat_percentage?.value
            },
            "discomfort": stepThreefullData?.discomfort ? stepThreefullData?.discomfort : patient_details?.discomfort,
            "activity_level": stepThreefullData?.activityLevel ? stepThreefullData?.activityLevel : patient_details?.activity_level,
            "sleep_rate": stepThreefullData?.sleepHours ? stepThreefullData?.sleepHours : patient_details?.sleep_rate,
            "workout_types": stepThreefullData?.workoutTypes ? stepThreefullData?.workoutTypes : patient_details?.workout_types,
            "workout_place": stepThreefullData?.workoutPlace ? stepThreefullData?.workoutPlace : patient_details?.workout_place,
            "equipment": stepThreefullData?.homeEquipment ? stepThreefullData?.homeEquipment : patient_details?.equipment,
            "workout_time": stepThreefullData?.workoutTime ? stepThreefullData?.workoutTime : patient_details?.workout_time,
            "exercise_perweek": workout_frequency ? workout_frequency : patient_details?.exercise_perweek,
            "additional_information": step_four_additional_information ? step_four_additional_information : patient_details?.additional_information
        });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/patient/update`, requestOptions)
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

const updatePatientAPI = createSlice({
    name: "updatePatientAPI",
    initialState: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        message: null,
        error: null
    },
    reducers: {
        clear_update_patient_state: (state) => {
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
            .addCase(update_patient.pending, (state) => {
                state.isLoading = true
            })
            .addCase(update_patient.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(update_patient.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.payload
            })
    }
})
export const { clear_update_patient_state } = updatePatientAPI.actions
export default updatePatientAPI.reducer