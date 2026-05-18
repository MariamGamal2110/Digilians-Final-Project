

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'

import HelloPage from './pages/Hello/HelloPage'
import HomeUser from './pages/Home/HomeUser'
import HomeAdmin from './pages/Home/HomeAdmin'

import StatmentAdmin from './pages/Statment/StatmentAdmin'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import LayoutAdmin from './components/Layout'; // لو الملف اسمه Layout.jsx فعلاً
import HelloPage from "./pages/Hello/HelloPage";

import HomeAdmin from './pages/Home/HomeAdmin'
// import HomeAdmin from './pages/Home/HomeAdmin'

import StatmentUser from './pages/Statment/StatmentUser'

import PaymentUser from './pages/Payment/PaymentUser'
import PaymentAdmin from './pages/Payment/PaymentAdmin'

import PunishmentUser from './pages/Punishment/PunishmentUser'
import PunishmentAdmin from './pages/Punishment/PunishmentAdmin'

import BookUser from './pages/Bus/BookUser'

import ExecuseUser from './pages/Execuse/ExecuseUser.jsx'
// import ExecuseAdmin from './pages/Execuse/ExecuseAdmin.jsx'

import ProfileUser from './pages/Profile/ProfileUser'
import ProfileAdmin from './pages/Profile/ProfileAdmin'

import RelativesUser from './pages/RelativesFamily/RelativesUser'
import RelativesAdmin from './pages/RelativesFamily/RelativesAdmin'

import HolidayAdmin from './pages/Holiday/HolidayAdmin'
import HolidayUser from './pages/Holiday/HolidayUser'

import SignIn from './pages/Register/SignIn'
import SignUp from './pages/Register/SignUp'

import MedicalUser from './pages/Medical/MedicalUser'
import MedicalAdmin from './pages/Medical/MedicalAdmin'

function ExecuseAdminPlaceholder() {
  return (
    <section dir="rtl" className="min-h-screen bg-[#fafafa] px-6 py-8">
      <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
        <h1 className="text-3xl font-bold text-[#1f220f] mb-3">
          إدارة الالتماسات
        </h1>

        <p className="text-[#676b59] text-sm leading-7">
          صفحة الالتماسات الخاصة بالأدمن موجودة، لكن الكومبوننتات المرتبطة بها لم يتم رفعها على GitHub بعد.
        </p>

        <div className="mt-6 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-xl px-5 py-4 text-sm font-bold leading-7">
          المطلوب رفع فولدر:
          <br />
          src/components/ExcuseAdminComponents
        </div>
      </div>
    </section>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomeUser /> },
      { path: 'adminHome', element: <HomeAdmin /> },

      { path: 'profile', element: <ProfileUser /> },
      { path: 'profile-admin', element: <ProfileAdmin /> },

      { path: 'medicalUser', element: <MedicalUser /> },
      { path: 'medicalAdmin', element: <MedicalAdmin /> },
      { path: 'medical', element: <MedicalUser /> },

      { path: 'paymentUser', element: <PaymentUser /> },
      { path: 'paymentAdmin', element: <PaymentAdmin /> },
      { path: 'payment', element: <PaymentUser /> },

      { path: 'StatmentUser', element: <StatmentUser /> },
      { path: 'StatmentAdmin', element: <StatmentAdmin /> },

      { path: 'punishment', element: <PunishmentUser /> },
      { path: 'punishment-admin', element: <PunishmentAdmin /> },

      { path: 'bus', element: <BookUser /> },

      { path: 'execuse', element: <ExecuseUser /> },
      { path: 'execuse-admin', element: <ExecuseAdminPlaceholder /> },

      { path: 'relatives', element: <RelativesUser /> },
      { path: 'relatives-admin', element: <RelativesAdmin /> },

      { path: 'HolidayAdmin', element: <HolidayAdmin /> },
      { path: 'HolidayUser', element: <HolidayUser /> },
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
])

export default function App() {
  return <RouterProvider router={router} />
}