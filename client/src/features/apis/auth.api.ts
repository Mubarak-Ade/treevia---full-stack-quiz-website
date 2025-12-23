import api from "@/utils/axios"

export const LoginApi = async (data: Login) => {
    const res = await api.post("user/login", data)
    return res.data
}

export const RegisterApi = async (data: Register) => {
    const res = await api.post("user/register", data)
    return res.data
}