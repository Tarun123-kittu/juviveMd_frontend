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
import updatePatientPaymentAPI from "./slices/patientSlice/updatePayment"
import createExerciseAPI from "./slices/exerciseSlice/createExercise"
import getExerciseAPI from "./slices/exerciseSlice/getExercise"
import updateExerciseStatusAPI from "./slices/exerciseSlice/updateExerciseStatus"
import getSingleExercise from "./slices/exerciseSlice/getSingleExercise"
import updateExerciseAPI from "./slices/exerciseSlice/updateExercise"
import patientValidateToken from "./slices/patientSlice/patientValidatePasswordToken"
import userValidateToken from "./slices/authSlice/userValidatePasswordToken"
import getQuotesAPI from "./slices/quotesSlice/quotesSlice"
import createExerciseDraftAPI from "./slices/exerciseSlice/createAsDraft"
import updateExerciseDraftAPI from "./slices/exerciseSlice/updateExercideDraft"
import getRoleSlice from "./slices/roleSlice/getRole"
import permissionSlice from "./slices/roleSlice/permissionSlice"
import uploadExerciseAPI from "./slices/exerciseSlice/uploadExercises"
import getExerciseByCategory from "./slices/exerciseSlice/getExerciseByCategory"
import createPatientPlan from "./slices/patientPlan/createPatientPlan"
import getPatientPlan from "./slices/patientPlan/getPAtientPlan"
import getSelectedPatientExerciseDetails from "./slices/patientPlan/getSelectedPAtientPlan"
import update_patient_plan from "./slices/patientPlan/updatePatientPlan"
import getPatientDifficuilties from "./slices/patientPlan/getPatientDifficuilties"
import changePasswordAPI from "./slices/authSlice/changePassword"
import recentChats from "./slices/chatSlice/recentChats"
import getWholeChat from "./slices/chatSlice/getWholeChat"
import sendMessages from "./slices/chatSlice/sendMessages"
import DashboardAPI from "./slices/dashboardSlice/dashboard"
import deletePatientPlanAPI from "./slices/patientPlan/deletePatientPlan"
import ReadMessageAPI from "./slices/chatSlice/readMessages"
import deleteExercise from "./slices/exerciseSlice/deleteExercise"

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
    UPDATE_PATIENT: updatePatientAPI,
    UPDATE_PATIENT_PAYMENT: updatePatientPaymentAPI,
    CREATE_EXERCISE: createExerciseAPI,
    ALL_EXERCISES: getExerciseAPI,
    UPDATE_EXERCISE_STATUS: updateExerciseStatusAPI,
    SINGLE_EXERCISE: getSingleExercise,
    UPDATE_EXERCISE_DATA: updateExerciseAPI,
    PATIENT_VALIDATE_TOKEN: patientValidateToken,
    USER_VALIDATE_TOKEN: userValidateToken,
    GET_QUOTES: getQuotesAPI,
    CREATE_DRAFT_EXERCISE: createExerciseDraftAPI,
    UPDATE_DRAFT_EXERCISE: updateExerciseDraftAPI,
    ROLE_LIST: getRoleSlice,
    PERMISSIONS_DATA: permissionSlice,
    UPLOAD_EXERCISE: uploadExerciseAPI,
    EXERCISE_BY_CATEGORY: getExerciseByCategory,
    CREATE_PATIENT_PLAN: createPatientPlan,
    GET_PATIENT_PLAN: getPatientPlan,
    GET_SELECTED_PATIENT_EXERCISE_DETAILS: getSelectedPatientExerciseDetails,
    UPDATE_PATIENT_PLAN: update_patient_plan,
    PATIENT_DIFFICUILTIES: getPatientDifficuilties,
    CHANGE_PASSWORD: changePasswordAPI,
    RECENT_CHATS: recentChats,
    GET_WHOLE_CHAT: getWholeChat,
    SEND_MESSAGE: sendMessages,
    DASHBOARD_STATE: DashboardAPI,
    DELETE_PATIENT_PLAN: deletePatientPlanAPI,
    READ_MESSAGE: ReadMessageAPI,
    DELETE_EXERCISE: deleteExercise
  },
})

export default AppStore