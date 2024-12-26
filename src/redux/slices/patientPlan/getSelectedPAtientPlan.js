import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const get_selected_patient_exercise_details = createAsyncThunk("get_selected_patient_exercise_details", async ({ id }, thunkAPI) => {
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
        myHeaders.append("Authorization", validToken);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        const response = await fetch(`${backendUrl}/plan-exercise?planId=${id}`, requestOptions);
        if (!response.ok) {
            const errorMessage = await response.json();
            throw new Error(errorMessage?.message || "An unknown error occurred");
        }

        const result = await response.json();
        return result;
    } catch (error) {
        // Improve error handling
        return thunkAPI.rejectWithValue({
            message: error?.message || "An unexpected error occurred",
        });
    }
});

const getSelectedPatientExerciseDetails = createSlice({
    name: "getSelectedPatientExerciseDetails",
    initialState: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        data: null,
        error: null
    },
    reducers: {
        clear_selected_patient_exercise_state: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.data = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_selected_patient_exercise_details.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(get_selected_patient_exercise_details.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.data = action.payload;
            })
            .addCase(get_selected_patient_exercise_details.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            });
    }
});

export const { clear_selected_patient_exercise_state } = getSelectedPatientExerciseDetails.actions;
export default getSelectedPatientExerciseDetails.reducer;
