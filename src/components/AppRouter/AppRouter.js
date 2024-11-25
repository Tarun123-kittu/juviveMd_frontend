import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "../AppLayout/AppLayout";
import Login from "../../pages/Auth/Login/login"
import ForgotPassword from "../../pages/Auth/forgotPassword/ForgotPassword"
import Dashboard from "../../pages/Auth/Dashboard/Dashboard";
import Staff from "../../pages/Staff/Staff";
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
                    path:"/dashboard",
                    element:<Dashboard/>
                },
                {
                    path:"/staff",
                    element:<Staff/>
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