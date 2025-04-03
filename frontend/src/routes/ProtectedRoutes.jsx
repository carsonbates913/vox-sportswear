import { Navigate } from 'react-router-dom';

import AdminDashboard from '../pages/AdminDashboard/AdminDashboard.jsx';
import MyAccount from '../pages/MyAccount/MyAccount.jsx';

export const MyAccountRedirect = ({ user }) => {
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return user.isAdmin ? <AdminDashboard /> : <MyAccount />;
};