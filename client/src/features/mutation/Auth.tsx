import useAuthStore from "@/stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { LoginApi, RegisterApi } from "../apis/auth.api";

export const useLogin = () => {
	const setUser = useAuthStore((s) => s.setUser);
	return useMutation({
		mutationFn: LoginApi,
		onSuccess: (data) => {
			setUser({
				id: data.user.id,
				username: data.user.username,
				email: data.user.email,
				role: data.user.role,
				token: data.token,
			});
		},
	});
};

export const useRegister = () => {
	const setUser = useAuthStore((s) => s.setUser);
	return useMutation({
		mutationFn: RegisterApi,
		onSuccess: (data) => {
			setUser({
				id: data.user.id,
				username: data.user.username,
				email: data.user.email,
				role: data.user.role,
				token: data.token,
			});
		},
	});
};
