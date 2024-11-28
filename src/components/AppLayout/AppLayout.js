import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { unProtectedUrls } from "../Utils/constantData";
import { useParams } from "react-router-dom";

const AppLayout = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const params = useParams()
  const {token} = params

  const isProtectedRoute = pathname !== `/reset-password/${token}` && !unProtectedUrls.includes(pathname);

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
