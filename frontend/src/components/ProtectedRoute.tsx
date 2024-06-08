import React from "react"
import { $isAuthenticated } from "../models/auth";
import { useUnit } from "effector-react";
import { Navigate } from "react-router-dom";
import { AUTH_PATH } from "../shared/constants";

interface IProtectedRoute {
    children?: React.ReactNode;
}

const ProtectedRoute = ({ children }: IProtectedRoute) => {
  const isAuthenticated = useUnit($isAuthenticated);
    
  return isAuthenticated ? children : <Navigate to={AUTH_PATH} />;
}

export { ProtectedRoute };
