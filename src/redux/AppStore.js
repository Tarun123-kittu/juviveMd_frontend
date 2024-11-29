import { configureStore } from '@reduxjs/toolkit'
import UserLoginAPI from "./slices/authSlice/loginSlice"
import forgotPassword from "./slices/authSlice/forgotPasswordSlice"
import ResetPassword from "./slices/authSlice/resetPasswordSlice"
import createStaffAPI from "./slices/staffSlice/createStaffSlice"
import getAllStaffAPI from "./slices/staffSlice/getAllUsers"
import getSingleStaffAPI from "./slices/staffSlice/getStaffByIdSlice"
import updateStaffAPI from "./slices/staffSlice/updateStaffSlice"

const AppStore = configureStore({
  reducer: {
    LOGIN_STATE: UserLoginAPI,
    FORGOT_PASSWORD: forgotPassword,
    RESET_PASSWORD: ResetPassword,
    CREATE_STAFF: createStaffAPI,
    ALL_STAFF: getAllStaffAPI,
    STAFF_DETAIL : getSingleStaffAPI,
    UPDATE_STAFF : updateStaffAPI
  },
})

export default AppStore