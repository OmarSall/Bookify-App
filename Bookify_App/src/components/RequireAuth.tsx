import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/services/auth/AuthContext";
import { JSX } from "react";

export default function RequireAuth() {
  const { user } = useAuth();
  const loc = useLocation();
  if (!user) {
    return <Navigate to="/login" state={{ from: loc }} replace />;
  }
  return <Outlet />;
}
