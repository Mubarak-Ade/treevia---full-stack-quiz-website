import { GetResult } from "@/models/Quiz"
import api from "@/utils/axios"

export const getResult = async (): Promise<GetResult[]> => {
    const res = await api.get<GetResult[]>("/results")
    return res.data
}