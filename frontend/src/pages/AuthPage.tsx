import React from "react"
import { AuthForm } from "../components/AuthForm";
import { $isAuthenticated } from "../models/auth";
import { useUnit } from "effector-react";
import { Navigate } from "react-router-dom";
import { MAIN_PATH } from "../shared/constants";

const AuthPage: React.FC = () => {
  const isAuthenticated = useUnit($isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={MAIN_PATH} />
  }
  
  return (
    <AuthForm />
  );
}

export { AuthPage };
