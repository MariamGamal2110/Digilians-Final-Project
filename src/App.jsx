import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import LayoutAdmin from './components/Layout'; // لو الملف اسمه Layout.jsx فعلاً
import HelloPage from "./pages/Hello/HelloPage";

import HomeUser from "./pages/Home/HomeUser";
import HomeAdmin from "./pages/Home/HomeAdmin";
import StatmentUser from "./pages/Statment/StatmentUser";
import StatmentAdmin from "./pages/Statment/StatmentAdmin";
import PaymentUser from "./pages/Payment/PaymentUser";
import PunishmentUser from "./pages/Punishment/PunishmentUser";
import PunishmentAdmin from "./pages/Punishment/PunishmentAdmin";
import BookUser from "./pages/Bus/BookUser";
import BookAdmin from "./pages/Bus/BookAdmin";
import ExecuseUser from "./pages/Execuse/ExecuseUser";
import ProfileUser from "./pages/Profile/ProfileUser";
import ProfileAdmin from "./pages/Profile/ProfileAdmin";
import RelativesUser from "./pages/RelativesFamily/RelativesUser";
import RelativesAdmin from "./pages/RelativesFamily/RelativesAdmin";
import MedicalUser from "./pages/Medical/MedicalUser";
import HolidayAdmin from "./pages/Holiday/HolidayAdmin";
import HolidayUser from "./pages/Holiday/HolidayUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HelloPage />,
  },
  // صفحات اليوزر
  {
    path: "/app",
    element: <Layout />,
    children: [
      { index: true, element: <HomeUser /> },
      { path: "statment", element: <StatmentUser /> },
      { path: "payment", element: <PaymentUser /> },
      { path: "punishment", element: <PunishmentUser /> },
      { path: "bus", element: <BookUser /> },
      { path: "execuse", element: <ExecuseUser /> },
      { path: "profile", element: <ProfileUser /> },
      { path: "relatives", element: <RelativesUser /> },
      { path: "medical", element: <MedicalUser /> },
      { path: "holiday", element: <HolidayUser /> }, 
    ],
  },
  // صفحات الأدمن
  {
    path: "/admin",
    element: <LayoutAdmin />,
    children: [
      { index: true, element: <HomeAdmin /> },
      { path: "bus", element: <BookAdmin /> },
      // تم حذف سطر bus المكرر الخاص بـ BookUser
      { path: "statment", element: <StatmentAdmin /> },
      { path: "punishment", element: <PunishmentAdmin /> },
      { path: "profile", element: <ProfileAdmin /> },
      { path: "relatives", element: <RelativesAdmin /> },
      { path: "holiday", element: <HolidayAdmin /> }, // تم تصحيح الاسبيلنج
    ],
  },
  // مسار احتياطي في حال كتابة لينك خطأ
  {
    path: "*",
    element: <HelloPage />, // أو صفحة 404 مخصصة
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
