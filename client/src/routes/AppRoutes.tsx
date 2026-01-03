import React from 'react';
import { Route, Routes } from 'react-router';
import PublicRoutes from './PublicRoutes';
import { DashboardRoutes } from './DashboardRoutes';
import { AdminRoutes } from './AdminRoutes';
import { Example } from '@/admin/pages/example';

/**
 * App Routes Component
 * This handles all the routes in the app
 */
const AppRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        {/* Public Route */}
        {PublicRoutes()}

        {/* Dashboard Route */}
        {DashboardRoutes()}

        {/* Admin Route */}
        {AdminRoutes()}


      </Routes>
    </>
  );
};

export default AppRoutes;
