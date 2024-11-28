import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const reset_password = createAsyncThunk(
  "reset_password",
  async ({ password,token,confirmPassword}, thunkAPI) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        password: password,
        token: token,
        confirmPassword : confirmPassword
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/reset-password`,
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

const ResetPassword = createSlice({
  name: "ResetPassword",
  initialState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
    error: null,
  },
  reducers: {
    clear_reset_password_state: (state) => {
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
      .addCase(reset_password.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(reset_password.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(reset_password.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});
export const {clear_reset_password_state} = ResetPassword.actions
export default ResetPassword.reducer
