import useAuthStore from "@/modules/auth/store/auth.store";
import React from "react";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
	const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

	return isAuthenticated ? (
		children
	) : (
		<Navigate
			to="/login"
			replace
		/>
	);
};

export default PrivateRoute;
