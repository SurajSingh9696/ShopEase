import pdf from 'pdf-parse';
import fs from 'fs';
import User from '../models/User.js';
import { analyzeResume } from '../services/aiService.js';

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a PDF file' });
    }

    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdf(dataBuffer);
    const resumeText = pdfData.text;

    const analysis = await analyzeResume(resumeText);

    const user = await User.findById(req.user._id);
    user.resumeData = {
      skills: analysis.skills,
      experience: analysis.experience,
      projects: analysis.projects,
      summary: analysis.summary,
      fileName: req.file.originalname,
      uploadedAt: new Date()
    };

    user.interviewReadinessScore = analysis.readinessScore || 0;
    await user.save();

    fs.unlinkSync(req.file.path);

    res.json({
      message: 'Resume uploaded and analyzed successfully',
      resumeData: user.resumeData,
      readinessScore: user.interviewReadinessScore
    });
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: error.message });
  }
};

export const getResumeData = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('resumeData selectedRole interviewReadinessScore');
    
    if (!user.resumeData || !user.resumeData.skills) {
      return res.status(404).json({ message: 'No resume data found' });
    }

    res.json({
      resumeData: user.resumeData,
      selectedRole: user.selectedRole,
      readinessScore: user.interviewReadinessScore
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({ message: 'Please provide a role' });
    }

    const user = await User.findById(req.user._id);
    user.selectedRole = role;
    await user.save();

    res.json({
      message: 'Role updated successfully',
      selectedRole: user.selectedRole
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
