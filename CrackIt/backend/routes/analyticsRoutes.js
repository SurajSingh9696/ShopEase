import express from 'express';
import { getAnalytics, getSessionHistory } from '../controllers/analyticsController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getAnalytics);
router.get('/history', protect, getSessionHistory);

export default router;
