import { useEffect, ReactNode } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router';

interface AdminRouteProps {
  children?: ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();

  console.log(user);

  return user?.role === 'admin' ? <Outlet /> : navigate('/unauthorize') || null;
};

export default AdminRoute;
