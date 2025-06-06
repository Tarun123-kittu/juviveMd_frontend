import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const update_exercise = createAsyncThunk("update_exercise", async ({ exercise_name, exercise_type, video_link, categories,unit, image_url, description, draft, training_type, id, hasImage }, thunkAPI) => {
    const token = Cookies.get("authToken");
    const validToken = "Bearer " + token;
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", validToken);
        myHeaders.append("Content-Type", "application/json"); 

        const body = {
            exercise_name,
            exercise_type,
            video_link,
            image_url, 
            description,
            id,
            hasImage,
            unit,
            draft,
            categories,
            training_type 
        };

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: JSON.stringify(body), 
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/exercise/update`, requestOptions);
        if (!response.ok) {
            const errorMessage = await response.json();
            if (errorMessage) {
                throw {
                    message: errorMessage.message || "An error occurred",
                    loggedError: errorMessage.loggedError || "An error occurred",
                };
            }
        }

        const result = await response.json();
        return result;
    } catch (error) {
        return thunkAPI.rejectWithValue({
            message: error.message || "An error occurred",
            loggedError: error.loggedError || "An error occurred",
        });
    }
});

const updateExerciseAPI = createSlice({
    name: "updateExerciseAPI",
    initialState: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        error: null,
        message: null
    },
    reducers: {
        clear_update_exercise_state: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = null;
            state.error = null;
            return state;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(update_exercise.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(update_exercise.fulfilled, (state, action) => {
                state.isLoading = false;
                state.message = action.payload;
                state.isSuccess = true;
            })
            .addCase(update_exercise.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.isError = true;
            });
    }
});

export const { clear_update_exercise_state } = updateExerciseAPI.actions;
export default updateExerciseAPI.reducer;
