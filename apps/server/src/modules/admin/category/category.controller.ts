import { Request, Response } from 'express';
import { successResponse } from '../../../utils/response.js';
import { CategoryService } from './category.service.js';
import { CreateCategoryDTO, UpdateCategoryDTO } from './category.validate.js';

export const getCategories = async (req: Request, res: Response): Promise<Response> => {
    const categories = await CategoryService.getCategories();
    return successResponse(res, 'Fetched Successfully', categories);
};

export const createCategory = async (req: Request, res: Response): Promise<Response> => {
    const category = await CategoryService.createCategory(req.body);
    return successResponse(res, 'Create Category Successfully', category, 201);
};

export const deleteCategory = async (req: Request, res: Response): Promise<Response> => {
    const category = await CategoryService.deleteCategory(req.params.id);
    return successResponse(res, 'Deleted Category Successfully', category);
};

export const updateCategory = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const category = await CategoryService.updateCategory(
        req.params.id,
        req.body as UpdateCategoryDTO
    );
    return successResponse(res, 'Updated Category Successfully', category, 201);
};
