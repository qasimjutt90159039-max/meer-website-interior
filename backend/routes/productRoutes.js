import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(authenticateAdmin, createProduct);

router.route('/:id')
  .get(getProductById)
  .put(authenticateAdmin, updateProduct)
  .delete(authenticateAdmin, deleteProduct);

export default router;
