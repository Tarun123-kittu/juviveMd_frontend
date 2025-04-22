import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const fetchProgressFactor = createAsyncThunk(
  "progressFactor/fetchProgressFactor",
  async ({ patientId, trainingType, startDate, endDate } = {}, thunkAPI) => {
    const token = Cookies.get("authToken");
    const validToken = "Bearer " + token;

    // Set default start and end dates to current month
    const now = new Date();
    const defaultStartDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
    const defaultEndDate = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split("T")[0];

    const finalStartDate = startDate || defaultStartDate;
    const finalEndDate = endDate || defaultEndDate;
    const finalType = trainingType || 'Upper'
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", validToken);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const url = `${process.env.REACT_APP_BACKEND_URL}/progress-factor?patientId=${patientId}&trainingType=${finalType}&startDate=${finalStartDate}&endDate=${finalEndDate}`;

      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage?.message || "Something went wrong");
      }

      const result = await response.json();
      return result?.data || null;
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

const progressFactorSlice = createSlice({
  name: "progressFactor",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: null,
    error: null,
  },
  reducers: {
    clear_progress_factor_state: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProgressFactor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProgressFactor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(fetchProgressFactor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export const { clear_progress_factor_state } = progressFactorSlice.actions;
export default progressFactorSlice.reducer;
