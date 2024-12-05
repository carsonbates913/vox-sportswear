import { Routes, Route } from 'react-router-dom';
import Homepage from '../pages/Homepage/Homepage.jsx';
import AboutUs from '../pages/AboutUs/AboutUs.jsx';
import MyCart from '../pages/MyCart/MyCart.jsx';
import Products from '../pages/Products/Products.jsx';
import MyAccount from '../pages/MyAccount/MyAccount.jsx';

export default function AppRoutes(){

  return (
    <Routes>
      <Route path="/aboutus" element={<AboutUs/>}/>
      <Route path="/products" element={<Products/>}/>
      <Route path="/mycart" element={<MyCart/>}/>
      <Route path="/homepage" element={<Homepage/>}/>
      <Route path="/myaccount" element={<MyAccount/>}/>
      <Route path="/" element={<Homepage/>}/>
    </Routes>
  )
}