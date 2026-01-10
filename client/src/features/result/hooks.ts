import { GetResult, Leaderboard, Stats } from "@/features/quiz/types";
import { useQuery } from "@tanstack/react-query";
import { getLeaderboard, getResult, getUserStats } from "./result.api";

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