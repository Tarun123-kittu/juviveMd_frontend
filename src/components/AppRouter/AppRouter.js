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
                        <ProtectedRoute requiredRole="ADMIN">
                            <Dashboard />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/settings",
                    element: (
                        <ProtectedRoute requiredRole="ADMIN">
                            <Settings />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/messages",
                    element: (
                        <ProtectedRoute requiredRole="ADMIN">
                            <Message />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/staff",
                    element: (
                        <ProtectedRoute requiredRole="ADMIN">
                            <Staff />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/reception/patient",
                    element: (
                        <ProtectedRoute requiredRole="RECEPTIONIST">
                            <Receptionist_patients />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/reception/dashboard",
                    element: (
                        <ProtectedRoute requiredRole="RECEPTIONIST">
                            <Reception_dashboard />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/reception/messages",
                    element: (
                        <ProtectedRoute requiredRole="RECEPTIONIST">
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
                        <ProtectedRoute requiredRole="ADMIN">
                            <Patient />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/patient/patientData",
                    element: (
                        <ProtectedRoute requiredRole="ADMIN">
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
                        <ProtectedRoute requiredRole="ADMIN">
                            <ExerciseView />
                        </ProtectedRoute>
                    )
                },
                {
                    path: "/trainer/dashboard",
                    element: (
                        <ProtectedRoute requiredRole="TRAINER">
                            <TrainerDashboard />
                        </ProtectedRoute>
                    )
                },
                {
                    path: "/trainer/messages",
                    element: (
                        <ProtectedRoute requiredRole="TRAINER">
                            <TrainerMessages />
                        </ProtectedRoute>
                    )
                },
                {
                    path: "/trainer/patient",
                    element: (
                        <ProtectedRoute requiredRole="TRAINER">
                            <TrainerPatients />
                        </ProtectedRoute>
                    )
                },
                {
                    path: "/trainer/exercise",
                    element: (
                        <ProtectedRoute requiredRole="TRAINER">
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