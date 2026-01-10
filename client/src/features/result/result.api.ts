import { GetResult, Leaderboard, Stats } from "@/features/quiz/types"
import api from "@/utils/axios"

export const getResult = async (): Promise<GetResult[]> => {
    const res = await api.get<GetResult[]>("/results")
    return res.data
}

export const getUserStats = async (): Promise<Stats> => {
    const res = await api.get<Stats>("/dashboard")
    return res.data
}

export const getLeaderboard = async () : Promise<Leaderboard> => {
    const res = await api.get<Leaderboard>("/dashboard/board")
    return res.data
}