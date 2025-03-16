import { createBrowserRouter } from 'react-router-dom';
import Homepage from '../pages/Homepage/Homepage.jsx';
import AboutUs from '../pages/AboutUs/AboutUs.jsx';
import MyCart from '../pages/MyCart/MyCart.jsx';
import Products from '../pages/Products/Products.jsx';
import MyAccount from '../pages/MyAccount/MyAccount.jsx';
import ViewProduct from '../pages/Products/ViewProduct.jsx';
import RootLayout from '../layouts/RootLayout.jsx';

  export const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          path: '/',
          element: <Homepage />,
          errorElement: <div>Page not found</div>,
        },
        {
          path: '/aboutus',
          element: <AboutUs />,
        },
        {
          path: '/products',
          element: <Products />,
        },
        {
          path: '/products/:productName',
          element: <ViewProduct />,
        },
        {
          path: '/mycart',
          element: <MyCart />,
        },
        {
          path: '/myaccount',
          element: <MyAccount />,
        },
      ]
    }
  ])