import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const get_exercise_by_category = createAsyncThunk(
    "get_exercise_by_category",
    async ({ category, patient_category, training_type }, thunkAPI) => {
        const token = Cookies.get("authToken");
        if (!token) {
            return thunkAPI.rejectWithValue({ 
                message: "Authentication token is missing.",
            });
        }

        const validToken = "Bearer " + token;

        try {
            const body = JSON.stringify({
                 patient_category: patient_category,
                exercise_type: category,
                training_types: training_type 
            });

            const requestOptions = {
                method: "POST", 
                headers: {
                    Authorization: validToken,
                    "Content-Type": "application/json" 
                },
                body: body,
            };

            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/exercises`,
                requestOptions
            );
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API Error: ${response.status} - ${errorText}`);
            }

            const result = await response.json();
            return result;

        } catch (error) {
            return thunkAPI.rejectWithValue({
                message: error.message || "Unknown error occurred.",
            });
        }
    }
);

const getExerciseByCategory = createSlice({
    name: "getExerciseByCategory",
    initialState: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        data: null,
        error: null
    },
    reducers: {
        clear_exercise_by_category_state: (state) => {
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
            .addCase(get_exercise_by_category.pending, (state) => {
                state.isLoading = true
            })
            .addCase(get_exercise_by_category.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.data = action.payload
            })
            .addCase(get_exercise_by_category.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
                state.isError = true
            })
    }
})

export const { clear_exercise_by_category_state } = getExerciseByCategory.actions
export default getExerciseByCategory.reducer