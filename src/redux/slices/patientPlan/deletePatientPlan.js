import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const delete_patient_plan = createAsyncThunk("delete_patient_plan", async ({ id }, thunkAPI) => {
    const token = Cookies.get('authToken');
    const validToken = "Bearer " + token;
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", validToken);

        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/delete-plan-exercise/${id}`, requestOptions)
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

const deletePatientPlanAPI = createSlice({
    name: "deletePatientPlanAPI",
    initialState: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        error: null,
        data: null
    },
    reducers: {
        clear_delete_patient_plan_state: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.data = null
            state.error = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(delete_patient_plan.pending, (state) => {
                state.isLoading = true
            })
            .addCase(delete_patient_plan.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
                state.data = action.payload
            })
            .addCase(delete_patient_plan.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.payload
            })
    }
})
export const { clear_delete_patient_plan_state } = deletePatientPlanAPI.actions
export default deletePatientPlanAPI.reducer