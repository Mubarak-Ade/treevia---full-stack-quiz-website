import useAuthStore from "@/modules/auth/store/auth.store";
import { QuizLoader } from "@/components/feature/QuizLoader";
import React from "react";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
	const user = useAuthStore((s) => s.user);
	const isAuthReady = useAuthStore((s) => s.isAuthReady);

	if (!isAuthReady) {
		return <QuizLoader loading={true} />;
	}

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
