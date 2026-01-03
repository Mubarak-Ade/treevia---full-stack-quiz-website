import React from 'react';
import { Routes } from 'react-router';
import { AdminRoutes } from './AdminRoutes';
import { DashboardRoutes } from './DashboardRoutes';
import PublicRoutes from './PublicRoutes';

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
