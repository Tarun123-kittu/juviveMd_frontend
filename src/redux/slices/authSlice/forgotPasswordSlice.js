import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const forgot_password = createAsyncThunk(
  "forgot_password",
  async ({ email }, thunkAPI) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        email: email,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/forget-password`,
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

const forgotPassword = createSlice({
  name: "forgotPassword",
  initialState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
    error: null,
  },
  reducers: {
    clear_forgot_password_state: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.isLoading = false;
      state.message = "";
      state.error = null;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgot_password.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgot_password.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(forgot_password.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});
export const {clear_forgot_password_state} = forgotPassword.actions
export default forgotPassword.reducer
