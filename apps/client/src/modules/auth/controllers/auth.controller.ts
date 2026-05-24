import useAuthStore from '@/modules/auth/store/auth.store';
import { useMutation } from '@tanstack/react-query';
import {
    LoginApi,
    logoutApi,
    RegisterApi,
    sendResetPasswordTokenApi,
    verifyEmailApi,
    verifyResetPasswordApi,
} from '../services/auth.service';

export const useLogin = () => {
    const setAuth = useAuthStore(s => s.setAuth);
    return useMutation({
        mutationFn: LoginApi,
        onSuccess: data => {
            setAuth(data.data);
        },
    });
};

export const useRegister = () => {
    const setAuth = useAuthStore(s => s.setAuth);
    return useMutation({
        mutationFn: RegisterApi,
        onSuccess: data => {
            setAuth(data);
        },
    });
};

export const useLogout = () => {
    const setAuth = useAuthStore(s => s.setAuth);
    return useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
			setAuth(null)
		},
    });
};

export const useSendResetPasswordToken = () => {
    return useMutation({
        mutationFn: sendResetPasswordTokenApi,
    });
};

export const useVerifyResetPassword = () => {
    return useMutation({
        mutationFn: verifyResetPasswordApi,
    });
};

export const useVerifyEmail = () => {
    return useMutation({
        mutationFn: verifyEmailApi,
    });
};
