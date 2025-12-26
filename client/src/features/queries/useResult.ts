import { GetResult } from "@/models/Quiz";
import { useQuery } from "@tanstack/react-query";
import { getResult } from "../apis/result.api";

export const useFetchResult = () => useQuery<GetResult[]>({
    queryKey: ['result'],
    queryFn: getResult,
    initialData: [],
})