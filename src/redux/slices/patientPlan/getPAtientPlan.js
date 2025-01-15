import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const get_patient_plan = createAsyncThunk("get_patient_plan", async ({ id, currentDate }, thunkAPI) => {
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

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/patient-exercises?patientId=${id}&currentDate=${currentDate}`, requestOptions);

        if (!response.ok) {
            const errorMessage = await response.json();
            throw new Error(errorMessage?.message || "An unknown error occurred");
        }

        const result = await response.json();
        return result;
    } catch (error) {
        return thunkAPI.rejectWithValue({
            message: error.message || "An unexpected error occurred",
        });
    }
});

const getPatientPlan = createSlice({
    name: "getPatientPlan",
    initialState: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        data: null,
        error: null
    },
    reducers: {
        clear_patient_plan_state: (state) => {
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
            .addCase(get_patient_plan.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(get_patient_plan.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.data = action.payload;
            })
            .addCase(get_patient_plan.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload?.message || "Failed to fetch patient plan";
            });
    }
});
export const { clear_patient_plan_state } = getPatientPlan.actions
export default getPatientPlan.reducer;
