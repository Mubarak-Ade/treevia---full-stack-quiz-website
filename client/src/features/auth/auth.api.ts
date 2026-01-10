import { Login, Register } from "@/features/auth/type"
import api from "@/utils/axios"

export const LoginApi = async (data: Login) => {
    const res = await api.post("auth/login", data)
    return res.data
}

export const RegisterApi = async (data: Register) => {
    const res = await api.post("auth/register", data)
    return res.data
}

export const getUserInfo = async () => {
    const res = await api.get("/user/me")
    return res.data
}