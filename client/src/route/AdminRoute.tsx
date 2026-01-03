import useAuthStore from "@/stores/useAuthStore";
import React from "react";
import { Navigate } from "react-router";

const AdminRoute = ({children} : {children: React.ReactNode}) => {
	const user = useAuthStore((s) => s.user);

	return user?.role === "admin" ? (
		children
	) : (
		<Navigate
			to="/"
			replace
		/>
	);
};

export default AdminRoute;
