import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";

import HelloPage from "./pages/Hello/HelloPage";

import HomeUser from "./pages/Home/HomeUser";
import HomeAdmin from "./pages/Home/HomeAdmin";

import StatmentUser from "./pages/Statment/StatmentUser";
import StatmentAdmin from "./pages/Statment/StatmentAdmin";

import PaymentUser from "./pages/Payment/PaymentUser";
import PaymentAdmin from "./pages/Payment/PaymentAdmin";

import PunishmentUser from "./pages/Punishment/PunishmentUser";
import PunishmentAdmin from "./pages/Punishment/PunishmentAdmin";

import BookUser from "./pages/Bus/BookUser";
import BookAdmin from "./pages/Bus/BookAdmin";

import ExecuseUser from "./pages/Execuse/ExecuseUser";
import ExecuseAdmin from "./pages/Execuse/ExecuseAdmin";

import ProfileUser from "./pages/Profile/ProfileUser";
import ProfileAdmin from "./pages/Profile/ProfileAdmin";

import RelativesUser from "./pages/RelativesFamily/RelativesUser";
import RelativesAdmin from "./pages/RelativesFamily/RelativesAdmin";

import HolidayUser from "./pages/Holiday/HolidayUser";
import HolidayAdmin from "./pages/Holiday/HolidayAdmin";

import MedicalUser from "./pages/Medical/MedicalUser";
import MedicalAdmin from "./pages/Medical/MedicalAdmin";
import SignIn from "./pages/Register/SignIn";
import SignUp from "./pages/Register/SignUp";
import AdminRoute from "./components/AdminRoute";

const router = createBrowserRouter([
  { path: "/", element: <HelloPage /> },

  { path: "/SignIn", element: <SignIn /> },
  { path: "/signin", element: <SignIn /> },
  { path: "/login", element: <Navigate to="/signin" replace /> },
  { path: "/SignUp", element: <SignUp /> },
  { path: "/signup", element: <SignUp /> },

  {
    element: <Layout />,
    children: [
      // User pages
      { path: "/home", element: <HomeUser /> },
      { path: "/statment", element: <StatmentUser /> },
      { path: "/payment", element: <PaymentUser /> },
      { path: "/punishment", element: <PunishmentUser /> },
      { path: "/bus", element: <BookUser /> },
      { path: "/execuse", element: <ExecuseUser /> },
      { path: "/profile", element: <ProfileUser /> },
      { path: "/relatives", element: <RelativesUser /> },
      { path: "/holiday", element: <HolidayUser /> },
      { path: "/medical", element: <MedicalUser /> },

      // Admin pages
      { path: "/admin", element: <Navigate to="/admin/home" replace /> },
      {
        path: "/admin/home",
        element: (
          <AdminRoute>
            <HomeAdmin />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/statment",
        element: (
          <AdminRoute>
            <StatmentAdmin />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/payment",
        element: (
          <AdminRoute>
            <PaymentAdmin />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/punishment",
        element: (
          <AdminRoute>
            <PunishmentAdmin />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/bus",
        element: (
          <AdminRoute>
            <BookAdmin />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/execuse",
        element: (
          <AdminRoute>
            <ExecuseAdmin />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/profile",
        element: (
          <AdminRoute>
            <ProfileAdmin />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/relatives",
        element: (
          <AdminRoute>
            <RelativesAdmin />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/holiday",
        element: (
          <AdminRoute>
            <HolidayAdmin />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/medical",
        element: (
          <AdminRoute>
            <MedicalAdmin />
          </AdminRoute>
        ),
      },

      // Old paths redirects
      { path: "/adminHome", element: <Navigate to="/admin/home" replace /> },
      { path: "/StatmentUser", element: <Navigate to="/statment" replace /> },
      {
        path: "/StatmentAdmin",
        element: <Navigate to="/admin/statment" replace />,
      },
      { path: "/paymentUser", element: <Navigate to="/payment" replace /> },
      {
        path: "/paymentAdmin",
        element: <Navigate to="/admin/payment" replace />,
      },
      {
        path: "/punishment-admin",
        element: <Navigate to="/admin/punishment" replace />,
      },
      {
        path: "/execuse-admin",
        element: <Navigate to="/admin/execuse" replace />,
      },
      {
        path: "/profile-admin",
        element: <Navigate to="/admin/profile" replace />,
      },
      {
        path: "/relatives-admin",
        element: <Navigate to="/admin/relatives" replace />,
      },
      { path: "/HolidayUser", element: <Navigate to="/holiday" replace /> },
      {
        path: "/HolidayAdmin",
        element: <Navigate to="/admin/holiday" replace />,
      },
      { path: "/MedicalUser", element: <Navigate to="/medical" replace /> },
      {
        path: "/MedicalAdmin",
        element: <Navigate to="/admin/medical" replace />,
      },
    ],
  },

  { path: "*", element: <Navigate to="/" replace /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
