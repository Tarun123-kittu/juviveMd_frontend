import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { unProtectedUrls } from "../Utils/constantData";
import { useParams } from "react-router-dom";

const AppLayout = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const params = useParams();
  const { token } = params;

  // Check if the current route is unprotected
  const isUnprotectedRoute = 
    unProtectedUrls.some((url) => 
      url.includes(":token") 
        ? pathname === url.replace(":token", token || "") 
        : pathname === url
    );

  // If the route is not unprotected, it's a protected route
  const isProtectedRoute = !isUnprotectedRoute;

  console.log({ isProtectedRoute, pathname });

  return (
    <>
      {isProtectedRoute ? (
        <>
          <Sidebar />
          <Outlet />
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default AppLayout;

// // Unprotected URLs configuration
// export const unProtectedUrls = [
//   "/login",
//   "/",
//   "/sign-up",
//   "/reset-password/:token",
//   "/forgot-password",
//   "/patient/reset-password/:token"
// ];
