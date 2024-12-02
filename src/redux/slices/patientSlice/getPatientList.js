import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const get_patients_list = createAsyncThunk("get_patients_list", async (params, thunkAPI) => {
    const token = Cookies.get('authToken');
    const validToken = "Bearer " + token;
    
    const requestBody = {};
    const fields = ["page", "tab", "date", "username", "trainer", "gender", "goal", "status"];

    fields.forEach(field => {
        if (params[field] !== undefined && params[field] !== null) {
            requestBody[field] = params[field];
        }
    });

    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", validToken);

        const raw = JSON.stringify(requestBody);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/patient-list`, requestOptions);
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
});

const getPatientListAPI = createSlice({
    name: "getPatientListAPI",
    initialState: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        data: [],
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_patients_list.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(get_patients_list.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.data = action.payload;
            })
            .addCase(get_patients_list.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            });
    }
});

export default getPatientListAPI.reducer;
