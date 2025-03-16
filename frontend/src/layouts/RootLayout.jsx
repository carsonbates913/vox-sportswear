import MainNavigation from '../components/Navbar/MainNavigation.jsx';
import { Outlet } from 'react-router-dom';

export default function RootLayout() {

  return (
    <div className="layout-container">
      <MainNavigation/>
      <Outlet />
    </div>)
}