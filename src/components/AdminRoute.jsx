import React from "react";
import { Navigate } from "react-router-dom";
import { getSavedUser, getToken } from "../api/client";

function isAdminRole(role = "") {
  const normalizedRole = String(role).trim().toLowerCase();

  return [
    "admin",
    "commander",
    "super_admin",
    "superadmin",
    "مدير النظام",
    "مشرف",
    "إدارة",
    "الادارة",
  ].includes(normalizedRole);
}

export default function AdminRoute({ children }) {
  const user = getSavedUser('admin') || getSavedUser('user');
  const token = getToken('admin') || getToken('user');

  if (!token || !user || !isAdminRole(user.role)) {
    return <Navigate to="/signin?role=commander" replace />;
  }

  return children;
}
