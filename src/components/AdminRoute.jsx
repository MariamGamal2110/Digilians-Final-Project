import React from "react";
import { Navigate } from "react-router-dom";
import { getSavedUser } from "../api/client";

export default function AdminRoute({ children }) {
  const user = getSavedUser('admin');
  const adminRoles = ["admin", "commander", "super_admin"];

  if (!user || !adminRoles.includes(user.role)) {
    return <Navigate to="/signin?role=commander" replace />;
  }

  return children;
}
