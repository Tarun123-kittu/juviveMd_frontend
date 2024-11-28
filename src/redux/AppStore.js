import { configureStore } from '@reduxjs/toolkit'
import UserLoginAPI from "./slices/authSlice/loginSlice"
import forgotPassword from "./slices/authSlice/forgotPasswordSlice"
import ResetPassword from "./slices/authSlice/resetPasswordSlice"
import createStaffAPI from "./slices/staffSlice/createStaffSlice"

const AppStore = configureStore({
  reducer: {
    LOGIN_STATE: UserLoginAPI,
    FORGOT_PASSWORD: forgotPassword,
    RESET_PASSWORD: ResetPassword,
    CREATE_STAFF: createStaffAPI
  },
})

export default AppStore