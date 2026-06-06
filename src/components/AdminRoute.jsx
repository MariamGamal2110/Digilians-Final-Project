import React from "react";
import { Navigate } from "react-router-dom";
import { getSavedUser } from "../api/client";

export default function AdminRoute({ children }) {
  const user = getSavedUser();

  if (!user || user.role !== "admin") {
    return <Navigate to="/signin?role=commander" replace />;
  }

  return children;
}
