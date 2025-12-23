import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router';
import AppRoutes from './routes/AppRoutes';
import NotificationProvider from './context/NotificationProvider';

function App() {

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   const userStr = localStorage.getItem('user');

  //   if (token && userStr) {
  //     const user = JSON.parse(userStr);
  //     dispatch(setUser({ token, user }));
  //   }
  // }, [dispatch]);

  return (
    <NotificationProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </NotificationProvider>
  );
}

export default App;
