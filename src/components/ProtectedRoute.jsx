import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { PageLoader } from "./LoadingSkeletons";

const ProtectedRoute = () => {
  const { token, user, loading } = useAuth();

  if (loading) {
    return <PageLoader />;
  }

  if (!token || !user) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
