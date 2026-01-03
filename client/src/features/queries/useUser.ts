import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../apis/auth.api";
import { User } from "@/models/Auth";

export const useFetchUser = () => useQuery({
    queryKey: ['user'],
    queryFn: getUserInfo,
    initialData: {} as User
})