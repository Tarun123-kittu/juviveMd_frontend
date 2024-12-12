import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const upload_exercises = createAsyncThunk("upload_exercises", async ({ file }, thunkAPI) => {
    const token = Cookies.get("authToken");
    const validToken = "Bearer " + token;
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", validToken);

        const formdata = new FormData();
        formdata.append("file", file);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/upload-exercise`, requestOptions)
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

const uploadExerciseAPI = createSlice({
    name: "uploadExerciseAPI",
    initialState: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        data: [],
        error: null
    },
    reducers: {
        clear_upload_exercise_state: (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.data = []
            state.error = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(upload_exercises.pending, (state) => {
                state.isLoading = true
            })
            .addCase(upload_exercises.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.data = action.payload
            })
            .addCase(upload_exercises.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
                state.isError = true
            })
    }
})
export const { clear_upload_exercise_state } = uploadExerciseAPI.actions
export default uploadExerciseAPI.reducer