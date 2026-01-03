import useAuthStore from "@/stores/useAuthStore";
import React from "react";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
	const user = useAuthStore((s) => s.user);
	return user ? (
	children
	) : (
		<Navigate
			to="/login"
			replace
		/>
	);
};

export default PrivateRoute;
