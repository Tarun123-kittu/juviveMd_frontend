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
import PatientResetPassword from "../reception/patientResetPassword";
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
                        <Receptionist_patients />
                    ),
                },
                {
                    path: "/reception/dashboard",
                    element: (
                        <Reception_dashboard />
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

                    children: [
                        {
                            path: "/patient/patientData",
                            element: (
                                <ProtectedRoute requiredRole="ADMIN">
                                    <PatientData />
                                </ProtectedRoute>
                            )

                        }
                    ]
                }
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