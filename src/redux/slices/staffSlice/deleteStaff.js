import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const delete_staff = createAsyncThunk("delete_staff", async ({ id }, thunkAPI) => {
       const token = Cookies.get('authToken');

    const validToken = "Bearer " + token;
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", validToken);
        const requestOptions = {
            method: "DELETE",
            redirect: "follow",
            headers: myHeaders, 
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/delete-user/${id}`, requestOptions)
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

const deleteStffAPI = createSlice({
    name: "deleteStffAPI",
    initialState: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        message: {},
        error: null
    },
    reducers: {
        clear_delete_staff_state: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = {}
            state.error = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(delete_staff.pending, (state) => {
                state.isLoading = true
            })
            .addCase(delete_staff.fulfilled, (state, action) => {
                state.isLoading = false
                state.message = action.payload
                state.isSuccess = true
            })
            .addCase(delete_staff.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
                state.isError = true
            })
    }
})
export const { clear_delete_staff_state } = deleteStffAPI.actions
export default deleteStffAPI.reducer