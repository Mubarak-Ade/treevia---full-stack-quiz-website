import useAuthStore from "@/modules/auth/store/auth.store";
import { useMutation } from "@tanstack/react-query";
import { LoginApi, logoutApi, RegisterApi } from "../services/auth.service";

export const useLogin = () => {
	const setAuth = useAuthStore((s) => s.setAuth);
	return useMutation({
		mutationFn: LoginApi,
		onSuccess: (data) => {
			setAuth(data);
		},
	});
};

export const useRegister = () => {
	const setAuth = useAuthStore((s) => s.setAuth);
	return useMutation({
		mutationFn: RegisterApi,
		onSuccess: (data) => {
			setAuth(data);
		},
	});
};

export const useLogout = () => {
	return useMutation({
		mutationFn: logoutApi
	})
}
