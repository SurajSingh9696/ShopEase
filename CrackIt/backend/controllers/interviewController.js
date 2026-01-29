import InterviewSession from '../models/InterviewSession.js';
import User from '../models/User.js';
import { generateInterviewQuestions, evaluateAnswer } from '../services/aiService.js';

export const startInterview = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { role } = req.body;

    const targetRole = role || user.selectedRole;

    const questions = await generateInterviewQuestions(
      targetRole,
      user.resumeData?.skills || [],
      5
    );

    const session = await InterviewSession.create({
      userId: user._id,
      role: targetRole,
      questions: questions.map(q => ({ question: q })),
      status: 'in-progress'
    });

    res.json({
      sessionId: session._id,
      role: session.role,
      questions: session.questions.map(q => q.question),
      totalQuestions: session.questions.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getInterviewSession = async (req, res) => {
  try {
    const session = await InterviewSession.findOne({
      _id: req.params.sessionId,
      userId: req.user._id
    });

    if (!session) {
      return res.status(404).json({ message: 'Interview session not found' });
    }

    res.json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const submitAnswer = async (req, res) => {
  try {
    const { questionIndex, answer } = req.body;
    const session = await InterviewSession.findOne({
      _id: req.params.sessionId,
      userId: req.user._id
    });

    if (!session) {
      return res.status(404).json({ message: 'Interview session not found' });
    }

    if (questionIndex < 0 || questionIndex >= session.questions.length) {
      return res.status(400).json({ message: 'Invalid question index' });
    }

    const question = session.questions[questionIndex];
    const evaluation = await evaluateAnswer(question.question, answer, session.role);

    session.questions[questionIndex].answer = answer;
    session.questions[questionIndex].score = evaluation.score;
    session.questions[questionIndex].feedback = evaluation.feedback;
    session.questions[questionIndex].relevance = evaluation.relevance;
    session.questions[questionIndex].clarity = evaluation.clarity;
    session.questions[questionIndex].technicalDepth = evaluation.technicalDepth;
    session.questions[questionIndex].missingKeywords = evaluation.missingKeywords;
    session.questions[questionIndex].answeredAt = new Date();

    await session.save();

    res.json({
      score: evaluation.score,
      feedback: evaluation.feedback,
      relevance: evaluation.relevance,
      clarity: evaluation.clarity,
      technicalDepth: evaluation.technicalDepth,
      missingKeywords: evaluation.missingKeywords
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const completeInterview = async (req, res) => {
  try {
    const session = await InterviewSession.findOne({
      _id: req.params.sessionId,
      userId: req.user._id
    });

    if (!session) {
      return res.status(404).json({ message: 'Interview session not found' });
    }

    const answeredQuestions = session.questions.filter(q => q.answer);
    const totalScore = answeredQuestions.reduce((sum, q) => sum + q.score, 0);
    const averageScore = answeredQuestions.length > 0 ? totalScore / answeredQuestions.length : 0;

    session.overallScore = Math.round(averageScore);
    session.status = 'completed';
    session.completedAt = new Date();
    session.duration = Math.round((session.completedAt - session.createdAt) / 1000 / 60);

    if (averageScore >= 8) {
      session.readinessLevel = 'Expert';
    } else if (averageScore >= 6) {
      session.readinessLevel = 'Advanced';
    } else if (averageScore >= 4) {
      session.readinessLevel = 'Intermediate';
    } else {
      session.readinessLevel = 'Beginner';
    }

    await session.save();

    res.json({
      overallScore: session.overallScore,
      readinessLevel: session.readinessLevel,
      duration: session.duration,
      questionsAnswered: answeredQuestions.length,
      totalQuestions: session.questions.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
