import { Category } from "@/features/quiz/types";
import api from "@/utils/axios";

export const getCategories = async () : Promise<Category[]> => {
    const res = await api.get<Category[]>("/admin/category")
    return res.data
}

export const deleteCategory = async (id: string) : Promise<void> => {
    const res = await api.delete(`/admin/category/${id}`)
    return res.data
}

export const createCategory = async (data: Category) => {
    const res = await api.post('/admin/category', data)
    return res.data
}

interface EditState {
    data : Category
    id?: string
}

export const editCategory = async ({data, id}: EditState) => {
    // const 
    const res = await api.patch(`/admin/category/${id}`, data)
    return res.data
}