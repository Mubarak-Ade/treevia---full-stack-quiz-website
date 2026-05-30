import { Response } from "@/modules/auth/types/auth.types";
import { Leaderboard, Stats } from "@/modules/quiz/types/quiz.types";
import { useQuery } from "@tanstack/react-query";
import { getLeaderboard, getResult, getUserStats } from "../services/result.service";

export const useFetchResult = (params?: { searchTerm?: string }) => useQuery({
    queryKey: ['result', params],
    queryFn: () => getResult(params),
})

export const useFetchUserStats = () => useQuery<Response<Stats>>({
    queryKey: ['stat'],
    queryFn: getUserStats,
    retry: false,
    staleTime: Infinity,
})

export const useFetchLeaderboard = (params?: { searchTerm?: string }) => useQuery<Leaderboard>({
    queryKey: ['leaderboard', params],
    queryFn: () => getLeaderboard(params),
    initialData: {
        leaderboard: [{}],
        userRank: {}
    } as Leaderboard
})