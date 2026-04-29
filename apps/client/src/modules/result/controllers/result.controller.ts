import { GetResult, Leaderboard, Stats } from "@/modules/quiz/types/quiz.types";
import { useQuery } from "@tanstack/react-query";
import { getLeaderboard, getResult, getUserStats } from "../services/result.service";
import { Response } from "@/modules/auth/types/auth.types";

export const useFetchResult = () => useQuery({
    queryKey: ['result'],
    queryFn: getResult,
})

export const useFetchUserStats = () => useQuery<Response<Stats>>({
    queryKey: ['stat'],
    queryFn: getUserStats,
})

export const useFetchLeaderboard = () => useQuery<Leaderboard>({
    queryKey: ['leaderboard'],
    queryFn: getLeaderboard,
    initialData: {
        leaderboard: [{}],
        userRank: {}
    } as Leaderboard
})