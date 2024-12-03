import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const create_exercise = createAsyncThunk("create_exercise", async ({ exercise_name, category, video_link, image, description }, thunkAPI) => {
    const token = Cookies.get('authToken');
    const validToken = "Bearer " + token;
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", validToken);

        const formdata = new FormData();
        formdata.append("exercise_name", exercise_name);
        formdata.append("category", category);
        formdata.append("video_link", video_link);
        formdata.append("image", image);
        formdata.append("description", description);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/exercise/create`, requestOptions)
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

const createExerciseAPI = createSlice({
    name: "createExerciseAPI",
    initialState: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        error: null,
        message: null
    },
    reducers: {
        clear_create_exercise_state: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = null
            state.error = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(create_exercise.pending, (state) => {
                state.isLoading = true
            })
            .addCase(create_exercise.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(create_exercise.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.payload
            })
    }
})
export const { clear_create_exercise_state } = createExerciseAPI.actions
export default createExerciseAPI.reducer