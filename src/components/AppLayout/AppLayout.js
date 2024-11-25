import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { unProtectedUrls } from "../Utils/constantData";

const AppLayout = () => {
  const location = useLocation(); // React Router hook to get the current location
console.log("unProtectedUrls==>>",unProtectedUrls)
 console.log(location.pathname)
  return (
    <>
      {/* Check if the current path is not in the list of unprotected URLs */}
      {!unProtectedUrls.includes(location.pathname) ? (
          <>
        <Sidebar/>
          <Outlet /></>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default AppLayout;
