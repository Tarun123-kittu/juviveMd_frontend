import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const get_exercise = createAsyncThunk(
    "get_exercise",
    async ({ page, tab, date, exercise, category }, thunkAPI) => {
      const token = Cookies.get("authToken");
      const validToken = "Bearer " + token;
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", validToken);
  
        // Dynamically build the request body
        const raw = JSON.stringify({
          ...(date && { date }),
          ...(exercise && { exercise }),
          ...(category && { category }),
          ...(page && { page }),
          ...(tab && { tab }),
        });
  
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
  
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/exercise-list`,
          requestOptions
        );
  
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
    }
  );
  
  const getExerciseAPI = createSlice({
    name: "getExerciseAPI",
    initialState: {
      isLoading: false,
      isError: false,
      isSuccess: false,
      data: [],
      error: null,
    },
    extraReducers: (builder) => {
      builder
        .addCase(get_exercise.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(get_exercise.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.data = action.payload;
        })
        .addCase(get_exercise.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.error = action.payload;
        });
    },
  });
  
  export default getExerciseAPI.reducer;
  