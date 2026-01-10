import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../auth/auth.api";
import { User } from "@/features/auth/type";

export const useFetchUser = () => useQuery({
    queryKey: ['user'],
    queryFn: getUserInfo,
    initialData: {} as User
})