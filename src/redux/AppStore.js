import { configureStore } from '@reduxjs/toolkit'
import UserLoginAPI from "./slices/authSlice/loginSlice"
import forgotPassword from "./slices/authSlice/forgotPasswordSlice"
import ResetPassword from "./slices/authSlice/resetPasswordSlice"
import createStaffAPI from "./slices/staffSlice/createStaffSlice"
import getAllStaffAPI from "./slices/staffSlice/getAllUsers"
import getSingleStaffAPI from "./slices/staffSlice/getStaffByIdSlice"
import updateStaffAPI from "./slices/staffSlice/updateStaffSlice"
import commonDataAPI from "./slices/commonDataSlice/commonDataDlice"
import getTrainersAPI from "./slices/commonDataSlice/getTrainersSlice"
import patientOnboardingAPI from "./slices/patientSlice/patientOnboardingSlice"
import deleteStffAPI from "./slices/staffSlice/deleteStaff"
import patientResetPasswordAPI from "./slices/patientSlice/patientResetPasswordSlice"
import getPatientListAPI from "./slices/patientSlice/getPatientList"
import deletePatientAPI from "./slices/patientSlice/deletePatientSlice"
import setSelectedPatientAPI from "./slices/patientSlice/getSelectedPatientSlice"
import updatePatientAPI from "./slices/patientSlice/updatePatientSlice"

const AppStore = configureStore({
  reducer: {
    LOGIN_STATE: UserLoginAPI,
    FORGOT_PASSWORD: forgotPassword,
    RESET_PASSWORD: ResetPassword,
    CREATE_STAFF: createStaffAPI,
    ALL_STAFF: getAllStaffAPI,
    STAFF_DETAIL: getSingleStaffAPI,
    UPDATE_STAFF: updateStaffAPI,
    COMMON_DATA: commonDataAPI,
    TRAINERS_LIST: getTrainersAPI,
    ONBOARD_PATIENT: patientOnboardingAPI,
    DELETE_STAFF: deleteStffAPI,
    PATIENT_RESET_PASSWORD: patientResetPasswordAPI,
    GET_PATIENT_LIST: getPatientListAPI,
    DELETE_PATIENT: deletePatientAPI,
    SELECTED_PATIENT_DETAILS: setSelectedPatientAPI,
    UPDATE_PATIENT : updatePatientAPI
  },
})

export default AppStore