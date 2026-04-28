
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'

import HomeUser from './pages/Home/HomeUser'
import StatmentAdmin from './pages/Statment/StatmentAdmin'

import HomeAdmin from './pages/Home/HomeAdmin'
// import HomeAdmin from './pages/Home/HomeAdmin'

import StatmentUser from './pages/Statment/StatmentUser'
import PaymentUser from './pages/Payment/PaymentUser'
import PunishmentUser from './pages/Punishment/PunishmentUser'
import PunishmentAdmin from './pages/Punishment/PunishmentAdmin'
import BookUser from './pages/Bus/BookUser'
import ExecuseUser from './pages/Execuse/ExecuseUser'
import ProfileUser from './pages/Profile/ProfileUser'
import ProfileAdmin from './pages/Profile/ProfileAdmin'
import RelativesUser from './pages/RelativesFamily/RelativesUser'
import RelativesAdmin from './pages/RelativesFamily/RelativesAdmin'
import MedicalUser from './pages/Medical/MedicalUser'
import HolidayAdmin from './pages/Holiday/HolidayAdmin'
import HolidayUser from './pages/Holiday/HolidayUser'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomeUser /> },
      { path: 'admin-home', element: <HomeAdmin /> },
      { path: 'StatmentUser', element: <StatmentUser /> },
      { path: 'StatmentAdmin', element: <StatmentAdmin /> },
      { path: 'payment', element: <PaymentUser /> },
      { path: 'payment', element: <PaymentUser /> },
      { path: 'punishment', element: <PunishmentUser /> },
      { path: 'punishment-admin', element: <PunishmentAdmin/> },
      { path: 'bus', element: <BookUser /> },
      { path: 'execuse', element: <ExecuseUser /> },
      { path: 'profile', element: <ProfileUser /> },
      { path: 'profile-admin', element: <ProfileAdmin /> },
      { path: 'relatives', element: <RelativesUser /> },
      { path: 'relatives-admin', element: <RelativesAdmin /> },
      { path: 'medical', element: <MedicalUser /> },
      { path: 'HolidayAdmin', element: <HolidayAdmin /> },
      { path: 'HolidayUser', element: <HolidayUser /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
