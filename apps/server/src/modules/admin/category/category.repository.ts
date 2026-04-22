import Category from '../../../models/Category.js';
import { CreateCategoryDTO, UpdateCategoryDTO } from './category.validate.js';

export const CategoryRepostory = {
    findAll: () => Category.find({}).populate('quizCount').sort({createdAt: -1}).lean(),
    create: (payload: CreateCategoryDTO) => Category.create(payload),
    delete: (categoryId: string) => Category.findByIdAndDelete(categoryId),
    update: (categoryId: string, update: UpdateCategoryDTO) =>
        Category.findByIdAndUpdate(
            categoryId,
            update,

            { new: true, runValidators: true }
        ),
};
