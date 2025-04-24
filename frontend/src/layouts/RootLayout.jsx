import MainNavigation from '../components/Navbar/MainNavigation.jsx';
import { Outlet } from 'react-router-dom';
import ScrollToTop from '../routes/ScrollToTop.jsx';

export default function RootLayout() {

  return (
    <div className="layout-container">
      <ScrollToTop />
      <MainNavigation/>
      <Outlet />
    </div>)
}