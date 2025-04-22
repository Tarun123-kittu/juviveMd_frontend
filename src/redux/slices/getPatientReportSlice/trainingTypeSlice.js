import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const fetchTrainingTypeDistribution = createAsyncThunk(
    "fetchTrainingTypeDistribution",
    async ({ patientId, startDate, endDate } = {}, thunkAPI) => {
      const token = Cookies.get("authToken");
      const validToken = "Bearer " + token;
  
      // Set default start and end dates to current month
      const now = new Date();
      const defaultStartDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0]; // 1st of the month
      const defaultEndDate = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split("T")[0]; // Last day of month
  
      const finalStartDate = startDate || defaultStartDate;
      const finalEndDate = endDate || defaultEndDate;
  
      try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", validToken);
  
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };
  
        const url = `${process.env.REACT_APP_BACKEND_URL}/training-type-distribution?patientId=${patientId}&startDate=${finalStartDate}&endDate=${finalEndDate}`;
  
        const response = await fetch(url, requestOptions);
  
        if (!response.ok) {
          const errorMessage = await response.json();
          throw new Error(errorMessage?.message || "Something went wrong");
        }
  
        const result = await response.json();
        return result;
      } catch (error) {
        return thunkAPI.rejectWithValue({ message: error.message });
      }
    }
  );

const trainingTypeSlice = createSlice({
  name: "trainingTypeDistribution",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: null,
    error: null,
  },
  reducers: {
    clear_training_type_state: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrainingTypeDistribution.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTrainingTypeDistribution.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(fetchTrainingTypeDistribution.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export const { clear_training_type_state } = trainingTypeSlice.actions;
export default trainingTypeSlice.reducer;
