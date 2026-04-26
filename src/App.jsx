import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import StatmentAdmin from './pages/Statment/StatmentAdmin';
import StatmentUser from './pages/Statment/StatmentUser';

// إذا لم يكن لديك CartProvider حالياً، قم بالتعليق عليه أو حذفه
// import { CartProvider } from './context/CartContext'; 

const routers = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <StatmentUser /> },
      { path: 'StatmentUser', element: <StatmentUser /> },
      { path: 'StatmentAdmin', element: <StatmentAdmin /> },
    ]
  }
]);

function App() {
  return (
    // <CartProvider> 
      <RouterProvider router={routers} />
    // </CartProvider>
  );
}

export default App;