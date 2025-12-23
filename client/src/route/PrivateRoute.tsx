import React, { useEffect, ReactNode } from 'react';
import { Outlet, useNavigate } from 'react-router';

interface PrivateRouteProps {
  children?: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      JSON.parse(storedUser);
    }
  }, []);

  return user ? <Outlet /> : navigate('/login') || null;
};

export default PrivateRoute;
