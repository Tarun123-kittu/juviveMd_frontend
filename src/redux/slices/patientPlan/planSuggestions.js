import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const fetchPlanSuggestions = createAsyncThunk("fetchPlanSuggestions", async ({ patientId }, thunkAPI) => {
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

        const response = await fetch(`${backendUrl}/exercise-suggestions?patientId=${patientId}`, requestOptions)
        if (!response.ok) {
            const errorMessage = await response.json();
            throw new Error(errorMessage?.message || "An unknown error occurred");
        }

        const result = await response.json();
        return result;
    } catch (error) {
        return thunkAPI.rejectWithValue({
            message: error?.message || "An unexpected error occurred",
        });
    }
})

const FetchPlanSuggestions = createSlice({
    name: "FetchPlanSuggestions",
    initialState: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        error: null,
        data: null,
    },
    reducers: {
        clear_suggested_plans_state: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.error = null;
            state.data = null;
            return state;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlanSuggestions.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchPlanSuggestions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.data = action.payload;
            })
            .addCase(fetchPlanSuggestions.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            })
    }
})

export const { clear_suggested_plans_state } = FetchPlanSuggestions.actions;
export default FetchPlanSuggestions.reducer;