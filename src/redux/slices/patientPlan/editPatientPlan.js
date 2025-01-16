import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const isPatientPlanEditable = createAsyncThunk("isPatientPlanEditable", async ({ id }, thunkAPI) => {
    const token = Cookies.get('authToken');
    const validToken = "Bearer " + token;
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", validToken);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/latest-plan?patientId=${id}`, requestOptions)
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

const IsPatientPlanEditableSlice = createSlice({
    name: "IsPatientPlanEditableSlice",
    initialState: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        error: null,
        data: null,
    },
    reducers: {
        clear_is_patient_plan_editable: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.error = null
            state.data = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(isPatientPlanEditable.pending, (state) => {
                state.isLoading = true
            })
            .addCase(isPatientPlanEditable.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.data = action.payload
            })
            .addCase(isPatientPlanEditable.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.error
            })
    }
})

export const { clear_is_patient_plan_editable } = IsPatientPlanEditableSlice.actions
export default IsPatientPlanEditableSlice.reducer
