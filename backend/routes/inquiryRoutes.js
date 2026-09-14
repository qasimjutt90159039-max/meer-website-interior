import express from 'express';
import {
  createInquiry,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
} from '../controllers/inquiryController.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .post(createInquiry)
  .get(authenticateAdmin, getInquiries);

router.route('/:id')
  .put(authenticateAdmin, updateInquiryStatus)
  .delete(authenticateAdmin, deleteInquiry);

export default router;
