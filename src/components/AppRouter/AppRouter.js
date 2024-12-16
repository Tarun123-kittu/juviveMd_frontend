import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "../AppLayout/AppLayout";
import Login from "../../pages/Auth/Login/login"
import ForgotPassword from "../../pages/Auth/forgotPassword/ForgotPassword"
import ResetPassword from "../../pages/Auth/resetPassword/ResetPassword";
import Dashboard from "../../pages/Dashboard/Dashboard";
import Staff from "../../pages/Staff/Staff";
import Patient from "../../pages/Patient/Patient";
import PatientData from "../../pages/Patient/PatientData";
import ProtectedRoute from "../../middleware/authenticationMiddleware/protectedRoutes";
import Receptionist_patients from "../../pages/Receptionist/Receptionist_patientsa";
import Reception_dashboard from "../../pages/Receptionist/Reception_dashboard";
import Exercise from "../../pages/Exercise/Exercise";
import PatientResetPassword from "../reception/patientResetPassword";
import ExerciseView from "../../pages/Exercise/ExerciseView";
import TrainerDashboard from "../Trainer/TrainerDashboard";
import TrainerExercise from "../Trainer/TrainerExercise";
import Message from "../../pages/messages/Message";
import TrainerMessages from "../Trainer/TrainerMessages";
import Settings from "../../pages/settings/Settings";
import TrainerPatients from "../Trainer/TrainerPatients";
import NotAuthorised from "../../common/notAuthorized/NotAuthorised";
import ReceptionMessages from "../reception/ReceptionMessages";
import NotFound from "../../common/notFound/NotFound";
import ReceptionistExercise from "../reception/ReceptionistExercise";
const AppRouter = () => {
    const routes = createBrowserRouter([
        {
            path: "/",
            element: <AppLayout />,
            children: [
                {
                    path: "/",
                    element: <Login />
                },
                {
                    path: "/forgot-password",
                    element: <ForgotPassword />
                },
                {
                    path: "/reset-password/:token",
                    element: <ResetPassword />
                },
                {
                    path: "/dashboard",
                    element: (
                        <ProtectedRoute requiredRole="Admin">
                            <Dashboard />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/settings",
                    element: (
                        <ProtectedRoute requiredRole="Admin">
                            <Settings />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/messages",
                    element: (
                        <ProtectedRoute requiredRole="Admin">
                            <Message />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/staff",
                    element: (
                        <ProtectedRoute requiredRole="Admin">
                            <Staff />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/reception/patient",
                    element: (
                        <ProtectedRoute requiredRole="Receptionist">
                            <Receptionist_patients />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/reception/dashboard",
                    element: (
                        <ProtectedRoute requiredRole="Receptionist">
                            <Reception_dashboard />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/reception/exercise",
                    element: (
                        <ProtectedRoute requiredRole="Receptionist">
                            <ReceptionistExercise />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/reception/messages",
                    element: (
                        <ProtectedRoute requiredRole="Receptionist">
                            <ReceptionMessages />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/patient/reset-password/:token",
                    element: (
                        <PatientResetPassword />
                    ),
                },
                {
                    path: "/patient",
                    element: (
                        <ProtectedRoute requiredRole="Admin">
                            <Patient />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/patientData",
                    element: (
                        <ProtectedRoute requiredRole="Admin">
                            <PatientData />
                        </ProtectedRoute>
                    )

                },
                {
                    path: "/exercise",

                    element: <Exercise />
                    
                },
                {
                    path: "/exerciseView",
                    element: (
                            <ExerciseView />
                    )
                },
                {
                    path: "/trainer/dashboard",
                    element: (
                        <ProtectedRoute requiredRole="Trainer">
                            <TrainerDashboard />
                        </ProtectedRoute>
                    )
                },
                {
                    path: "/trainer/messages",
                    element: (
                        <ProtectedRoute requiredRole="Trainer">
                            <TrainerMessages />
                        </ProtectedRoute>
                    )
                },
                {
                    path: "/trainer/patient",
                    element: (
                        <ProtectedRoute requiredRole="Trainer">
                            <TrainerPatients />
                        </ProtectedRoute>
                    )
                },
                {
                    path: "/trainer/exercise",
                    element: (
                        <ProtectedRoute requiredRole="Trainer">
                            <TrainerExercise />
                        </ProtectedRoute>
                    )
                },
                {
                    path: "/not-authorized",
                    element: (
                            <NotAuthorised />
                    )
                },
                {
                    path: "*", 
                    element: <NotFound />, 
                  },
            ]
        }
    ])
    return (
        <>
            <RouterProvider router={routes} />
        </>
    )
}



export default AppRouter