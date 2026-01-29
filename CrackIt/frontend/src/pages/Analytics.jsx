import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Layout from '../components/Layout';
import api from '../services/api';
import { TrendingUp, Award, Target, MessageCircle } from 'lucide-react';

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const [analyticsRes, historyRes] = await Promise.all([
        api.get('/analytics'),
        api.get('/analytics/history')
      ]);
      setAnalytics(analyticsRes.data);
      setHistory(historyRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </Layout>
    );
  }

  if (!analytics || analytics.totalSessions === 0) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto text-center py-12">
          <div className="card">
            <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">No Analytics Yet</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Complete your first interview to see your performance analytics
            </p>
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="btn-primary"
            >
              Start Interview
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const topicData = Object.entries(analytics.topicStrengths).map(([topic, score]) => ({
    topic,
    score
  }));

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Performance Analytics</h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Track your progress and identify areas for improvement
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Sessions
              </h3>
              <Target className="w-5 h-5 text-primary-600" />
            </div>
            <p className="text-3xl font-bold">{analytics.totalSessions}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Average Score
              </h3>
              <Award className="w-5 h-5 text-primary-600" />
            </div>
            <p className="text-3xl font-bold">{analytics.averageScore}/10</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Communication
              </h3>
              <MessageCircle className="w-5 h-5 text-primary-600" />
            </div>
            <p className="text-3xl font-bold">{analytics.communicationScore}/10</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Trend
              </h3>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">
              {analytics.accuracyOverTime.length > 1 &&
              analytics.accuracyOverTime[analytics.accuracyOverTime.length - 1].score >
                analytics.accuracyOverTime[0].score
                ? '↑'
                : '→'}
            </p>
          </motion.div>
        </div>

        {analytics.accuracyOverTime.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="card mb-8"
          >
            <h2 className="text-2xl font-bold mb-6">Score Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics.accuracyOverTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#4f46e5"
                  strokeWidth={2}
                  dot={{ fill: '#4f46e5', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        {topicData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="card mb-8"
          >
            <h2 className="text-2xl font-bold mb-6">Performance by Role</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topicData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="topic" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Bar dataKey="score" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        {history.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="card"
          >
            <h2 className="text-2xl font-bold mb-6">Session History</h2>
            <div className="space-y-4">
              {history.map((session, index) => (
                <div
                  key={session._id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
                >
                  <div>
                    <p className="font-semibold">{session.role}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(session.createdAt).toLocaleDateString()} • {session.duration}m
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary-600">
                      {session.overallScore}/10
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {session.readinessLevel}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default Analytics;
