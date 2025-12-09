// src/components/ProtectedRoute.tsx

import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactElement;
  requiredRole?: "user" | "council";
};

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const role = localStorage.getItem("role");

  // Not logged in → send to landing page
  if (!role) return <Navigate to="/" replace />;

  // Logged in but wrong role
  if (requiredRole && role !== requiredRole) {
    return <Navigate to={role === "council" ? "/council" : "/add-land"} replace />;
  }

  return children;
};
