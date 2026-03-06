import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../services/user.service";
import { User } from "@/modules/auth/types/auth.types";

export const useFetchUser = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
    initialData: {} as User,
  });
