import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
export const fetch_weight_progress = createAsyncThunk(
    "fetch_weight_progress",
    async ({ patientId, monthsToCompare = 1 }, thunkAPI) => {
      const token = Cookies.get("authToken");
      const validToken = "Bearer " + token;
  
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/weight-progress?patientId=${patientId}&monthsToCompare=${monthsToCompare}`,
          {
            method: "GET",
            headers: {
              Authorization: validToken,
            },
          }
        );
  
        if (!response.ok) {
          const errorMessage = await response.json();
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
  const weightProgressSlice = createSlice({
    name: "weightProgressSlice",
    initialState: {
      isLoading: false,
      isSuccess: false,
      isError: false,
      data: null,
      error: null,
    },
    reducers: {
      clear_weight_progress_state: (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = false;
        state.data = null;
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetch_weight_progress.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(fetch_weight_progress.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.data = action.payload;
        })
        .addCase(fetch_weight_progress.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.error = action.payload;
        });
    },
  });
  
  export const { clear_weight_progress_state } = weightProgressSlice.actions;
  export default weightProgressSlice.reducer;