import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import HelloPage from './pages/Hello/HelloPage'

import HomeUser from './pages/Home/HomeUser'
import HomeAdmin from './pages/Home/HomeAdmin'
import StatmentUser from './pages/Statment/StatmentUser'
import PaymentUser from './pages/Payment/PaymentUser'
import PunishmentUser from './pages/Punishment/PunishmentUser'
import BookUser from './pages/Bus/BookUser'
import HolydayUser from './pages/Holyday/HolydayUser'
import ExecuseUser from './pages/Execuse/ExecuseUser'
import ProfileUser from './pages/Profile/ProfileUser'
import ProfileAdmin from './pages/Profile/ProfileAdmin'
import RelativesUser from './pages/RelativesFamily/RelativesUser'
import RelativesAdmin from './pages/RelativesFamily/RelativesAdmin'
import MedicalUser from './pages/Medical/MedicalUser'

const router = createBrowserRouter([
  // صفحة الترحيب - منفصلة بدون Layout
  {
    path: '/',
    element: <HelloPage />,
  },
  // باقي الصفحات - مع Layout
  {
    path: '/app',
    element: <Layout />,
    children: [
      { index: true, element: <HomeUser /> },
      { path: 'admin-home', element: <HomeAdmin /> },
      { path: 'statment', element: <StatmentUser /> },
      { path: 'payment', element: <PaymentUser /> },
      { path: 'punishment', element: <PunishmentUser /> },
      { path: 'bus', element: <BookUser /> },
      { path: 'holyday', element: <HolydayUser /> },
      { path: 'execuse', element: <ExecuseUser /> },
      { path: 'profile', element: <ProfileUser /> },
      { path: 'profile-admin', element: <ProfileAdmin /> },
      { path: 'relatives', element: <RelativesUser /> },
      { path: 'relatives-admin', element: <RelativesAdmin /> },
      { path: 'medical', element: <MedicalUser /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}