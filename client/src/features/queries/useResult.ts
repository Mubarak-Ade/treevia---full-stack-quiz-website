import { GetResult, Leaderboard, Stats } from "@/models/Quiz";
import { useQuery } from "@tanstack/react-query";
import { getLeaderboard, getResult, getUserStats } from "../apis/result.api";

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
    initialData: {} as Leaderboard
})