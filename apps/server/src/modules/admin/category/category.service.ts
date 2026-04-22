import createHttpError from 'http-errors';
import Category, { CategoryModel } from '../../../models/Category.js';
import Quiz from '../../../models/Quiz.js';
import { CreateCategoryDTO, UpdateCategoryDTO } from './category.validate.js';
import { CategoryRepostory } from './category.repository.js';
import { AppError } from '../../../utils/error-handler.js';
import mongoose from 'mongoose';

export const CategoryService = {
    async getCategories() {
        const category = await CategoryRepostory.findAll();
        return category;
    },

    async createCategory(body: CreateCategoryDTO) {
        const category = await CategoryRepostory.create({
            ...body,
            tags: body.tags.map(t => ({ name: t })),
        });
        return {
            message: 'category created successfully',
            category,
        };
    },

    async deleteCategory(categoryId: string) {
        const category = await CategoryRepostory.delete(categoryId);
        if (!category) {
            throw new AppError(404, 'category not found');
        }

        return category;
    },

    async updateCategory(categoryId: string, body: UpdateCategoryDTO) {
        const { name, description, tags } = body;

        const update = {
            ...(name ? { name } : {}),
            ...(description ? { description } : {}),
            ...(tags && Array.isArray(tags) ? { tags: tags } : {}),
        };

        const category = await CategoryRepostory.update(categoryId, update);

        if (!category) {
            throw new AppError(404, 'category does not exist');
        }

        return category;
    },
};
