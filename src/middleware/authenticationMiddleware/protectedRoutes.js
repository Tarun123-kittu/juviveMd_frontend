import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import authenticationMiddleware from "./authenticationMiddleware"

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = Cookies.get("authToken");
  const userRole = token ? authenticationMiddleware(token) : null;

  if (!token || userRole !== requiredRole) {
    return <Navigate to="/" replace />; 
  }

  return children;
};

export default ProtectedRoute;
