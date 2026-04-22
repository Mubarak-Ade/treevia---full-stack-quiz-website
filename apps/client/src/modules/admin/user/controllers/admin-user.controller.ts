import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsers, deleteUser, updateUserRole, UsersResponse } from "../services/admin-user.service";

export const useFetchUsers = () => useQuery<UsersResponse>({
    queryKey: ["admin-users"],
    queryFn: () => getUsers(),
    initialData: {
        users: [],
        page: 0,
        pages: 0,
        total: 0
    } as UsersResponse
})

export const useDeleteUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-users"] })
        }
    })
}

export const useUpdateUserRole = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ userId, role }: { userId: string; role: string }) =>
            updateUserRole(userId, role),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-users"] })
        }
    })
}
