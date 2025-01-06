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
import Exercise from "../../pages/Exercise/Exercise";
import PatientResetPassword from "../reception/patientResetPassword";
import ExerciseView from "../../pages/Exercise/ExerciseView";
import Message from "../../pages/messages/Message";
import Settings from "../../pages/settings/Settings";
import NotAuthorised from "../../common/notAuthorized/NotAuthorised";
import NotFound from "../../common/notFound/NotFound";
import PatientReport from "../../pages/Patient/PatientReport";

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
                            <Dashboard />
                    ),
                },
                {
                    path: "/settings",
                    element: (
                            <Settings />
                    ),
                },
                {
                    path: "/messages",
                    element: (
                            <Message />
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
                    path: "/patient/reset-password/:token",
                    element: (
                        <PatientResetPassword />
                    ),
                },
                {
                    path: "/patient",
                    element: (
                            <Patient />
                    ),
                },
                {
                    path: "/patientData",
                    element: (
                            <PatientData />
                    )

                },
                {
                    path: "/patient-report",
                    element: (
                            <PatientReport />
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