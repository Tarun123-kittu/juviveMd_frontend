import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const get_patient_plan_message = createAsyncThunk("get_patient_plan_message", async ({ patientId }, thunkAPI) => {
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

        const response = await fetch(`${backendUrl}/suggestion-message?patientId=${patientId}`, requestOptions)
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
})

const GetPatientPlanMessage = createSlice({
    name: "GetPatientPlanMessage",
    initialState: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        error: null,
        data: null
    },
    reducers: {
        clear_patient_plan_message_state: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.error = null
            state.data = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_patient_plan_message.pending, (state) => {
                state.isLoading = true
            })
            .addCase(get_patient_plan_message.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.data = action.payload
            })
            .addCase(get_patient_plan_message.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.payload
            })
    }
})

export const { clear_patient_plan_message_state } = GetPatientPlanMessage.actions
export default GetPatientPlanMessage.reducer