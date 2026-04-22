import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../services/user.service";

export const useFetchUser = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
  });
