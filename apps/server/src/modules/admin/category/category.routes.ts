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
import { rateLimitStrategies } from '../../../middleware/rateLimiter.js';

const router = Router();

router.get('/', asyncHandler(getCategories));
router.post('/', rateLimitStrategies.adminWrite, zodValidator(CreateCategorySchema), asyncHandler(createCategory));
router.delete('/:id', rateLimitStrategies.adminWrite, asyncHandler(deleteCategory));
router.patch('/:id', rateLimitStrategies.adminWrite, zodValidator(UpdateCategorySchema), asyncHandler(updateCategory));

export default router;
