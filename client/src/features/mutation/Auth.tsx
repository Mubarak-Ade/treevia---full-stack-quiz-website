import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginApi, RegisterApi } from "../apis/auth.api";
import useAuthStore from "@/stores/useAuthStore";


export const useLogin = () => {
    const setToken = useAuthStore(s => s.setToken)
    const setUser = useAuthStore(s => s.setUser)
	return useMutation({
		mutationFn: LoginApi,
		onSuccess: (data) => {
            setToken(data.token)
            setUser(data.user)
        },
	});
};

export const useRegister = () => {
    const setToken = useAuthStore(s => s.setToken)
    const setUser = useAuthStore(s => s.setUser)
	return useMutation({
		mutationFn: RegisterApi,
		onSuccess: (data) => {
            setToken(data.token)
            setUser(data.user)
        },
	});
};
