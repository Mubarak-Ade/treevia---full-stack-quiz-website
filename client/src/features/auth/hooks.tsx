import useAuthStore from "@/features/auth/store";
import { useMutation } from "@tanstack/react-query";
import { LoginApi, RegisterApi } from "./auth.api";

export const useLogin = () => {
	const setAuth = useAuthStore((s) => s.setAuth);
	return useMutation({
		mutationFn: LoginApi,
		onSuccess: (data) => {
			setAuth(data.user, data.token);
		},
	});
};

export const useRegister = () => {
	const setAuth = useAuthStore((s) => s.setAuth);
	return useMutation({
		mutationFn: RegisterApi,
		onSuccess: (data) => {
			setAuth(data.user, data.token);
		},
	});
};
