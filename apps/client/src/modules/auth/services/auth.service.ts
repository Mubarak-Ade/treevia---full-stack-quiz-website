import { Login, Register } from "@/modules/auth/types/auth.types"
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