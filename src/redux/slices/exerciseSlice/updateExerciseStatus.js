import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const update_exercise_status = createAsyncThunk("update_exercise_status", async ({ id, status }, thunkAPI) => {
      const token = Cookies.get("authToken");
      const validToken = "Bearer " + token;
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", validToken);

        const raw = JSON.stringify({
            "id": id,
            "status": status
        });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/exercise/update-status`, requestOptions)

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

const updateExerciseStatusAPI = createSlice({
    name: "updateExerciseStatusAPI",
    initialState: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        message: null,
        error: null
    },
    reducers: {
        clear_update_exercise_status_state: (state) => {
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
            .addCase(update_exercise_status.pending, (state) => {
                state.isLoading = true
            })
            .addCase(update_exercise_status.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(update_exercise_status.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.payload
            })
    }
})
export const { clear_update_exercise_status_state } = updateExerciseStatusAPI.actions
export default updateExerciseStatusAPI.reducer