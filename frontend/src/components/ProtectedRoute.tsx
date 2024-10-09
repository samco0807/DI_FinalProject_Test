// frontend/src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = useAppSelector((state) => state.auth.token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
