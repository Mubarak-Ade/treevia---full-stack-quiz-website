import { Router } from 'express';
import {
    createCategory,
    getCategories,
    deleteCategory,
    updateCategory,
} from './category.controller.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';
import { zodValidator } from '../../../utils/zodError.js';
import {
    CreateCategorySchema,
    UpdateCategorySchema,
} from './category.validate.js';

const router = Router();

router.get('/', asyncHandler(getCategories));
router.post('/', zodValidator(CreateCategorySchema), asyncHandler(createCategory));
router.delete('/:id', asyncHandler(deleteCategory));
router.patch('/:id', zodValidator(UpdateCategorySchema), asyncHandler(updateCategory));

export default router;
