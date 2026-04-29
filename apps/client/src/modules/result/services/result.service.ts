import { Response } from "@/modules/auth/types/auth.types"
import { GetResult, Leaderboard, Stats } from "@/modules/quiz/types/quiz.types"
import api from "@/utils/axios"

export const getResult = async (): Promise<Response<GetResult[]>> => {
    const res = await api.get("/attempts")
    return res.data
}

export const getUserStats = async (): Promise<Response<Stats>> => {
    const res = await api.get<Response<Stats>>("/dashboard")
    return res.data
}

export const getLeaderboard = async () : Promise<Leaderboard> => {
    const res = await api.get<Leaderboard>("/dashboard/board")
    return res.data
}