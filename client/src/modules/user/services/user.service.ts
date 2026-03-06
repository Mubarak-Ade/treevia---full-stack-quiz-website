import api from "@/utils/axios";
import type { User } from "@/modules/auth/types/auth.types";

export const getUserInfo = async (): Promise<User> => {
  const res = await api.get<User>("/user/me");
  return res.data;
};
