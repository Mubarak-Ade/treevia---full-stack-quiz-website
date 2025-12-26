import React from 'react';
import { Routes } from 'react-router';
import PublicRoutes from './PublicRoutes';
import { DashboardRoutes } from './DashboardRoutes';

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

      </Routes>
    </>
  );
};

export default AppRoutes;
