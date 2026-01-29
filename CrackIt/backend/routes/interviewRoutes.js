import express from 'express';
import {
  startInterview,
  getInterviewSession,
  submitAnswer,
  completeInterview
} from '../controllers/interviewController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/start', protect, startInterview);
router.get('/session/:sessionId', protect, getInterviewSession);
router.post('/answer/:sessionId', protect, submitAnswer);
router.post('/complete/:sessionId', protect, completeInterview);

export default router;
