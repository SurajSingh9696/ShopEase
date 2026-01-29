import express from 'express';
import multer from 'multer';
import { uploadResume, getResumeData, updateRole } from '../controllers/resumeController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

router.post('/upload', protect, upload.single('resume'), uploadResume);
router.get('/data', protect, getResumeData);
router.put('/role', protect, updateRole);

export default router;
