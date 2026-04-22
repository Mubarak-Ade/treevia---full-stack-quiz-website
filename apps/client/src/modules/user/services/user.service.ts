import api from "@/utils/axios";
import type { Response, User } from "@/modules/auth/types/auth.types";

export const getUserInfo = async (): Promise<Response<User>> => {
  const res = await api.get<Response<User>>("/user/me");
  return res.data;
};
