import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PaymentUser from './pages/Payment/PaymentUser'
import PaymentAdmin from './pages/Payment/PaymentAdmin'
import MedicalUser from './pages/Medical/MedicalUser'
import MedicalAdmin from './pages/Medical/MedicalAdmin'
import SignUp from './pages/Register/SignUp'
import SignIn from './pages/Register/SignIn'

function App() {
  const routers = createBrowserRouter([
    {
      path: '/Signup',
      element: <SignUp />
    },
    {
      path: '/signin',
      element: <SignIn />
    },
    {
      path: '/paymentuser',
      element: <PaymentUser />, 
    },
      {
      path: '/paymentadmin',
      element: <PaymentAdmin />
    },
    {
      path: '/medicaluser',
      element: <MedicalUser />
    },
    {
      path: '/medicaladmin',
      element: <MedicalAdmin />
    }

  
  ]);

  return (
    <RouterProvider router={routers} />
  );
}

export default App;