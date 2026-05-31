import { Login, Register, ResetPasswordRequest, VerifyResetPassword } from "@/modules/auth/types/auth.types"
import api from "@/utils/axios"

export const LoginApi = async (data: Login) => {
    const res = await api.post("auth/login", data)
    return res.data
}

export const RegisterApi = async (data: Register) => {
    const res = await api.post("auth/register", data)
    return res.data
}

export const logoutApi = async () => {
    const res = await api.post("auth/logout")
    return res.data
}

export const sendResetPasswordTokenApi = async (data: ResetPasswordRequest) => {
    const res = await api.post("auth/reset", data)
    return res.data
}

export const verifyResetPasswordApi = async (data: VerifyResetPassword) => {
    const res = await api.post("auth/verify", data)
    return res.data
}

export const verifyEmailApi = async (token: string) => {
    const res = await api.get("auth/verify-email", { params: { token } })
    return res.data
}

export const resendVerificationEmailApi = async (data: { email: string }) => {
    const res = await api.post("auth/resend-verification", data)
    return res.data
}
