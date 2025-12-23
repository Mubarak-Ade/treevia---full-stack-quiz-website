import React from 'react';
import AdminDashboardLayout from '../component/dashboard/AdminDashboardLayout';
import AdminDashboard from '../pages/Dashboard/Admin/AdminDashboard';
import CreateQuiz from '../component/dashboard/createQuiz/CreateQuiz';
import UserManagement from '../pages/Dashboard/Admin/UserManageMent';
import Analytics from '../pages/Dashboard/Admin/Analytics';
import AdminSettings from '../pages/Dashboard/Admin/AdminSettings';
import PrivateRoute from '../route/PrivateRoute';
import AdminRoute from '../route/AdminRoute';
import { Route } from 'react-router';
import QuestionManagement from '../pages/Dashboard/Admin/QuestionManagement';
import QuizManagement from '../pages/Dashboard/Admin/QuizManagement';
import CreateQuestion from '../pages/Dashboard/Admin/CreateQuestion';
import CreateQuestions from '../component/dashboard/createQuiz/CreateQuestions';

const AdminRoutes = (): JSX.Element[] => [
  <Route
    key="admin-route"
    element={
      <PrivateRoute>
        <AdminRoute />
      </PrivateRoute>
    }
  >
    <Route path="/admin" element={<AdminDashboardLayout />}>
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="quizzes" element={<QuizManagement />} />
      <Route path="quizzes/create" element={<CreateQuiz />} />
      <Route path="quizzes/create/:id/add-question/" element={<CreateQuestions />} />
      <Route path="questions" element={<QuestionManagement />} />
      <Route path="users" element={<UserManagement />} />
      <Route path="results" element={<Analytics />} />
      <Route path="settings" element={<AdminSettings />} />
    </Route>
  </Route>,
];

export default AdminRoutes;
