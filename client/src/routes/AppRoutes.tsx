import React from 'react';
import { Routes } from 'react-router';
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

      </Routes>
    </>
  );
};

export default AppRoutes;
