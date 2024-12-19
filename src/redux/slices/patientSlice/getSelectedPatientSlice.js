import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const get_selected_patient = createAsyncThunk(
    "get_selected_patient",
    async ({ id }, thunkAPI) => {
        const token = Cookies.get("authToken");
        if (!token) {
            return thunkAPI.rejectWithValue({ message: "Authorization token is missing" });
        }
        const validToken = "Bearer " + token;
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", validToken);

            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow",
            };

            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/patient/${id}`,
                requestOptions
            );
            if (!response.ok) {
                const errorMessage = await response.json().catch(() => ({ message: response.statusText }));
                throw new Error(errorMessage.message || "Something went wrong");
            }

            const result = await response.json();
            return result;
        } catch (error) {
            return thunkAPI.rejectWithValue({
                message: error.message,
            });
        }
    }
);

const setSelectedPatientAPI = createSlice({
    name: "setSelectedPatientAPI",
    initialState: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        data: {},
        error: null,
    },
    reducers: {
        clear_selected_patient_state: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.data = {};
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_selected_patient.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(get_selected_patient.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.data = action.payload;
            })
            .addCase(get_selected_patient.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            });
    },
});

export const { clear_selected_patient_state } = setSelectedPatientAPI.actions;
export default setSelectedPatientAPI.reducer;
