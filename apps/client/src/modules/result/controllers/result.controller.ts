import { GetResult, Leaderboard, Stats } from "@/modules/quiz/types/quiz.types";
import { useQuery } from "@tanstack/react-query";
import { getLeaderboard, getResult, getUserStats } from "../services/result.service";

export const useFetchResult = () => useQuery<GetResult[]>({
    queryKey: ['result'],
    queryFn: getResult,
    initialData: [],
})

export const useFetchUserStats = () => useQuery<Stats>({
    queryKey: ['stat'],
    queryFn: getUserStats,
    initialData: {} as Stats
})

export const useFetchLeaderboard = () => useQuery<Leaderboard>({
    queryKey: ['leaderboard'],
    queryFn: getLeaderboard,
    initialData: {
        leaderboard: [{}],
        userRank: {}
    } as Leaderboard
})