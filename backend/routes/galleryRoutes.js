import express from 'express';
import {
  getGallery,
  createGalleryItem,
  deleteGalleryItem,
} from '../controllers/galleryController.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getGallery)
  .post(authenticateAdmin, createGalleryItem);

router.route('/:id')
  .delete(authenticateAdmin, deleteGalleryItem);

export default router;
