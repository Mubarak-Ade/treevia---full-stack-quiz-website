import useAuthStore from "@/modules/auth/store/auth.store";
import { QuizLoader } from "@/components/feature/QuizLoader";
import React from "react";
import { Navigate } from "react-router";

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
	const user = useAuthStore((s) => s.user);

	if (!user) {
		return <QuizLoader loading={true} />;
	}

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
