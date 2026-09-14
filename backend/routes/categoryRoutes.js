import express from 'express';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getCategories)
  .post(authenticateAdmin, createCategory);

router.route('/:id')
  .put(authenticateAdmin, updateCategory)
  .delete(authenticateAdmin, deleteCategory);

export default router;
