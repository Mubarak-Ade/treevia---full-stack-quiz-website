import useAuthStore from "@/stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { LoginApi, RegisterApi } from "../apis/auth.api";

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
