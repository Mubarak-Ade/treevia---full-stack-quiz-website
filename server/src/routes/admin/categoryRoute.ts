import { Router } from 'express';
import { createCategory, getCategories, deleteCategory, updateCategory } from '../../controllers/admin/categoryController.js';

const router = Router();

router.get('/', getCategories );
router.post('/', createCategory)
router.delete('/:id', deleteCategory)
router.patch('/:id', updateCategory)

export default router;