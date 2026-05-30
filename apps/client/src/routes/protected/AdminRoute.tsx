import useAuthStore from "@/modules/auth/store/auth.store";
import React from "react";
import { Navigate } from "react-router";

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
	const user = useAuthStore(s => s.user);
	const isAuthenticated = useAuthStore(s => s.isAuthenticated);

    if (!isAuthenticated) return <Navigate to="/" replace />;

    if (user?.role !== 'admin') return <Navigate to="/dashboard" replace />;
    return children
};

export default AdminRoute;
