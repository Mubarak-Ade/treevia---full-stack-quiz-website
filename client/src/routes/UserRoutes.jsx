import React from "react";
import PrivateRoute from "../route/PrivateRoute";
import UserDashboardLayout from "../component/dashboard/UserDashboardLayout";
import { Route } from "react-router";
import UserDashboard from "../pages/Dashboard/User/UserDashboard";
import UserManagement from "../pages/Dashboard/Admin/UserManageMent";
import Analytics from "../pages/Dashboard/Admin/Analytics";
import AdminSettings from "../pages/Dashboard/Admin/AdminSettings";
import CreateQuiz from "../component/dashboard/createQuiz/CreateQuiz";

const UserRoutes = () => [
    <Route element={<PrivateRoute />}>
        <Route
            handle={{ breadcrumb: "User" }}
            path="/user"
            element={<UserDashboardLayout />}
        >
            <Route
                handle={{ breadcrumb: "Quizzes" }}
                path="quizzes"
                element={<CreateQuiz />}
            />
            <Route
                handle={{ breadcrumb: "Dashboard" }}
                path="dashboard"
                element={<UserDashboard />}
            />
            <Route
                handle={{ breadcrumb: "Users" }}
                path="users"
                element={<UserManagement />}
            />
            <Route
                handle={{ breadcrumb: "Results" }}
                path="results"
                element={<Analytics />}
            />
            <Route
                handle={{ breadcrumb: "Settings" }}
                path="settings"
                element={<AdminSettings />}
            />
        </Route>
    </Route>,
];

export default UserRoutes;
