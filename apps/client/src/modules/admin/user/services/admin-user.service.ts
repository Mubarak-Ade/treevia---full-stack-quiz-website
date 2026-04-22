import api from "@/utils/axios";

export interface AdminUser {
  _id: string;
  username: string;
  email: string;
  role: "user" | "admin" | "moderator";
  isOnline: boolean;
  profilePic?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UsersResponse {
  users: AdminUser[];
  page?: number;
  pages?: number;
  total: number;
}

export const getUsers = async (query?: any): Promise<UsersResponse> => {
  const response = await api.get("/admin/user", { params: query });
  const users = Array.isArray(response.data) ? response.data : response.data.users || response.data;
  return {
    users: users as AdminUser[],
    page: 0,
    pages: 1,
    total: users.length
  };
};

export const deleteUser = async (userId: string): Promise<any> => {
  const response = await api.delete(`/admin/user/${userId}`);
  return response.data;
};

export const updateUserRole = async (userId: string, role: string): Promise<any> => {
  const response = await api.patch(`/admin/user/${userId}`, { role });
  return response.data;
};
