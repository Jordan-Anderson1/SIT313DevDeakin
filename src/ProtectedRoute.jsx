import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "./context/AuthContext";

//Protects routes from users who are not registered/logged in by returning to the home page

const ProtectedRoute = ({ children }) => {
  const { user } = UserAuth();
  if (!user) {
    return <Navigate to="/loginAlert" />;
  }

  return children;
};

export default ProtectedRoute;
