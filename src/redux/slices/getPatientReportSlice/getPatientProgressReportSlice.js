import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Async thunk to fetch all three reports simultaneously
export const get_patient_progress_report = createAsyncThunk(
  "get_patient_progress_report/get",
  async ({ patientId }, thunkAPI) => { 
    const token = Cookies.get("authToken");
    const validToken = "Bearer " + token;

    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", validToken);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      // Fetch all three types of reports in parallel
      const apiUrls = ["daily", "weekly", "monthly"].map(
        (type) => `${process.env.REACT_APP_BACKEND_URL}/progress-report?patientId=${patientId}&range=${type}`
      );

      const responses = await Promise.all(apiUrls.map(url => fetch(url, requestOptions)));

      // Check if all responses are valid
      const invalidResponse = responses.find(response => !response.ok);
      if (invalidResponse) {
        const errorMessage = await invalidResponse.json();
        throw new Error(errorMessage.message);
      }

      // Parse JSON data from all responses
      const [dailyData, weeklyData, monthlyData] = await Promise.all(responses.map(response => response.json()));

      return { dailyData, weeklyData, monthlyData };
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.message
      });
    }
  }
);

// Redux slice
const getPatientProgressReportSlice = createSlice({
  name: "getPatientWeightReportSlice",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: {
      daily: null,
      weekly: null,
      monthly: null
    },
    selectedReportType: "daily", // Default selection
    error: null
  },
  reducers: {
    clear_get_patient_progress_report_state: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.data = { daily: null, weekly: null, monthly: null };
      state.error = null;
      state.selectedReportType="daily"
    },
    setSelectedReportType: (state, action) => {
        state.selectedReportType = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_patient_progress_report.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(get_patient_progress_report.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = {
          daily: action.payload.dailyData,
          weekly: action.payload.weeklyData,
          monthly: action.payload.monthlyData
        };
      })
      .addCase(get_patient_progress_report.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error;
      });
  }
});

export const { setSelectedReportType,clear_get_patient_progress_report_state } = getPatientProgressReportSlice.actions;
export default getPatientProgressReportSlice.reducer;
