import InterviewSession from '../models/InterviewSession.js';

export const getAnalytics = async (req, res) => {
  try {
    const sessions = await InterviewSession.find({
      userId: req.user._id,
      status: 'completed'
    }).sort({ createdAt: -1 });

    if (sessions.length === 0) {
      return res.json({
        totalSessions: 0,
        averageScore: 0,
        accuracyOverTime: [],
        topicStrengths: {},
        communicationScore: 0
      });
    }

    const totalScore = sessions.reduce((sum, s) => sum + s.overallScore, 0);
    const averageScore = Math.round(totalScore / sessions.length);

    const accuracyOverTime = sessions.slice(0, 10).reverse().map(s => ({
      date: s.createdAt.toISOString().split('T')[0],
      score: s.overallScore
    }));

    const roleScores = {};
    sessions.forEach(s => {
      if (!roleScores[s.role]) {
        roleScores[s.role] = { total: 0, count: 0 };
      }
      roleScores[s.role].total += s.overallScore;
      roleScores[s.role].count += 1;
    });

    const topicStrengths = {};
    Object.keys(roleScores).forEach(role => {
      topicStrengths[role] = Math.round(roleScores[role].total / roleScores[role].count);
    });

    const allClarityScores = sessions.flatMap(s =>
      s.questions.filter(q => q.clarity).map(q => q.clarity)
    );
    const communicationScore = allClarityScores.length > 0
      ? Math.round(allClarityScores.reduce((a, b) => a + b, 0) / allClarityScores.length)
      : 0;

    res.json({
      totalSessions: sessions.length,
      averageScore,
      accuracyOverTime,
      topicStrengths,
      communicationScore
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSessionHistory = async (req, res) => {
  try {
    const sessions = await InterviewSession.find({
      userId: req.user._id,
      status: 'completed'
    })
      .sort({ createdAt: -1 })
      .limit(20)
      .select('role overallScore readinessLevel createdAt duration');

    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
