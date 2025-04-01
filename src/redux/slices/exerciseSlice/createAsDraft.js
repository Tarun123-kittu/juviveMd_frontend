import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const create_exercise_draft = createAsyncThunk("create_exercise_draft", async ({ exercise_name, exercise_type, video_link, unit,categories, image_url, description, draft, training_type }, thunkAPI) => {
    const token = Cookies.get('authToken');
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
            draft: true,
            unit,
            categories,
            image_url,
            training_type
        };

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(body), 
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/exercise/create`, requestOptions);
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

const createExerciseDraftAPI = createSlice({
    name: "createExerciseDraftAPI",
    initialState: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        error: null,
        message: null
    },
    reducers: {
        clear_create_exercise_draft_state: (state) => {
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
            .addCase(create_exercise_draft.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(create_exercise_draft.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
            })
            .addCase(create_exercise_draft.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            });
    }
});

export const { clear_create_exercise_draft_state } = createExerciseDraftAPI.actions;
export default createExerciseDraftAPI.reducer;
