import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const patient_onboarding_api = createAsyncThunk("patient_onboarding_api", async ({ values }, thunkAPI) => {
        const token = Cookies.get('authToken');

    const validToken = "Bearer " + token;
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImNyZWF0ZWRfYXQiOiIyMDI0LTExLTI3VDExOjM4OjMzLjM5NVoiLCJsYXN0TmFtZSI6ImFkbWluIiwiYWRkcmVzcyI6ImFiYyIsImVtYWlsIjoidGFydW4uZ2F1dGFtQHVsdGl2aWMuY29tIiwiZmlyc3ROYW1lIjoiYWRtaW4iLCJyZXNldFRva2VuIjpudWxsLCJ1cGRhdGVkX2F0IjoiMjAyNC0xMS0yN1QxMTozODozMy4zOTVaIiwicGFzc3dvcmQiOiIkMmEkMTAkdW1ScVpvQ241SlU1SmJTMThmbTV6ZVhWNTE2bVF1VlJqQkVMNjYvQVczN3dOSjRBOFVuU3UiLCJyb2xlIjoiQURNSU4iLCJpbWFnZSI6bnVsbCwicmVzZXRfdG9rZW4iOiJkMTc1NzU4MDhhOTMzMjBlN2NmZWUzODI2YWY1NmU2NDUwZjg1N2E1NjA3M2EzYTM5YTNiNDg5ZDVmNDQ1YTA2IiwicmVzZXRfdG9rZW5fZXhwaXJlcyI6IjIwMjQtMTEtMjhUMDU6MDA6MTkuODcxWiIsImlkIjoiYjUxNGNiN2EtOWI0My00MTFhLTk0NjMtOTgzNGVjZDM5NjJiIiwicGhvbmUiOiI3ODMxMDIyMDAwIn0sImlhdCI6MTczMjc2OTU3Mn0.vWoUroS8fkJH_YNnoCclh-ko6z9govM8TeXgZnn5KPs");

        const raw = JSON.stringify({
            "name": "ankush",
            "phone": 7831040000,
            "email": "tarun.gautam@ultivic.com",
            "gender": "MALE",
            "height": {
                "unit": "feet",
                "value": 6
            },
            "weight": {
                "unit": "kg",
                "value": 84
            },
            "goal": "Gain Muscle Mass",
            "dob": "sds",
            "trainerID": "anddkjfkdj",
            "step": 3,
            "health_issue_text": "",
            "optimal_weight": {
                "unit": "lbs/kg",
                "value": 84
            },
            "fat_percentage": {
                "unit": "perc",
                "value": 84
            },
            "discomfort": "Shoulder",
            "activity_level": "",
            "sleep_rate": "",
            "workout_types": "",
            "workout_place": "",
            "equipment": "",
            "workout_time": "",
            "exercise_perweek": [
                "sunday",
                "monday"
            ],
            "additional_information": "this is description"
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("https://1kgnwnst17.execute-api.us-east-1.amazonaws.com/prod/api/patient/create", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    } catch (error) {

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