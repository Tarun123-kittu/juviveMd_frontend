import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const get_exercise_by_category = createAsyncThunk(
    "get_exercise_by_category",
    async ({ category, difficuilty }, thunkAPI) => {
        const token = Cookies.get("authToken");
        if (!token) {
            return thunkAPI.rejectWithValue({
                message: "Authentication token is missing.",
            });
        }

        const validToken = "Bearer " + token;
        try {
            const requestOptions = {
                method: "GET",
                headers: {
                    Authorization: validToken,
                },
                redirect: "follow",
            };

            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/exercises?category=${category}&difficulty_level=${difficuilty}`,
                requestOptions
            );

            const contentType = response.headers.get("content-type");
            if (!response.ok || !contentType?.includes("application/json")) {
                throw new Error(
                    `Unexpected response: ${response.statusText || "Error"}`
                );
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