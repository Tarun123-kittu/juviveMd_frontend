import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import authenticationMiddleware from "./authenticationMiddleware"

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = Cookies.get("authToken");
  const userRole = token ? authenticationMiddleware(token) : null;

  // if (!token || userRole !== requiredRole) {
  //   return <Navigate to="/" replace />; 
  // }
  if (!token) {
    return <Navigate to="/" replace />;
  }
  else if (userRole !== requiredRole) {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
