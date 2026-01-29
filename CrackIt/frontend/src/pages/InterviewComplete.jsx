import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import api from '../services/api';
import { Trophy, TrendingUp, Home, BarChart, Award, Target, Clock, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

const InterviewComplete = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, [sessionId]);

  const fetchResults = async () => {
    try {
      const response = await api.get(`/interview/session/${sessionId}`);
      setResults(response.data);
      setLoading(false);
    } catch (error) {
      alert('Failed to load results');
      navigate('/dashboard');
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

  if (loading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-96">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full mb-4"
          />
          <p className="text-gray-600 dark:text-gray-400">Loading results...</p>
        </div>
      </Layout>
    );
  }

  const getReadinessColor = (level) => {
    const colors = {
      'Beginner': 'from-red-500 to-orange-500',
      'Intermediate': 'from-yellow-500 to-orange-500',
      'Advanced': 'from-blue-500 to-cyan-500',
      'Expert': 'from-green-500 to-emerald-500'
    };
    return colors[level] || 'from-gray-500 to-gray-600';
  };

  const getReadinessBg = (level) => {
    const backgrounds = {
      'Beginner': 'from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20',
      'Intermediate': 'from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20',
      'Advanced': 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
      'Expert': 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20'
    };
    return backgrounds[level] || 'from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900';
  };

  const suggestions = {
    'Beginner': [
      'Focus on fundamental concepts and definitions',
      'Practice more basic coding problems',
      'Build small projects to gain practical experience'
    ],
    'Intermediate': [
      'Dive deeper into advanced topics',
      'Work on larger projects with real-world scenarios',
      'Practice explaining your thought process clearly'
    ],
    'Advanced': [
      'Focus on system design and architecture',
      'Contribute to open-source projects',
      'Prepare for behavioral interview questions'
    ],
    'Expert': [
      'Refine your communication skills',
      'Prepare leadership and scenario-based questions',
      'Review your recent projects and achievements'
    ]
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 -m-4 sm:-m-6 p-4 sm:p-6">
        <div className="max-w-6xl mx-auto">
          {/* Celebration Header */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 sm:mb-12 pt-4 sm:pt-8"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-4 sm:mb-6 shadow-2xl"
            >
              <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
            >
              Interview Complete! 🎉
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400"
            >
              Great job! Here's your performance summary
            </motion.p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8"
          >
            {/* Overall Score */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-effect rounded-3xl p-8 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-purple-500/10" />
              <div className="relative">
                <Award className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <div className="text-6xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {results.overallScore}
                </div>
                <p className="text-gray-600 dark:text-gray-400 font-semibold">Overall Score</p>
              </div>
            </motion.div>

            {/* Readiness Level */}
            <motion.div
              whileHover={{ scale: 1.02, y: -3 }}
              transition={{ duration: 0.15 }}
              className={`glass-effect rounded-3xl p-8 text-center relative overflow-hidden bg-gradient-to-br ${getReadinessBg(results.readinessLevel)}`}
            >
              <div className="relative">
                <Target className="w-12 h-12 mx-auto mb-4 text-gray-700 dark:text-gray-300" />
                <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${getReadinessColor(results.readinessLevel)} bg-clip-text text-transparent`}>
                  {results.readinessLevel}
                </div>
                <p className="text-gray-600 dark:text-gray-400 font-semibold">Readiness Level</p>
              </div>
            </motion.div>

            {/* Duration */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-effect rounded-3xl p-8 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-orange-500/10" />
              <div className="relative">
                <Clock className="w-12 h-12 text-pink-600 mx-auto mb-4" />
                <div className="text-6xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent mb-2">
                  {results.duration}m
                </div>
                <p className="text-gray-600 dark:text-gray-400 font-semibold">Duration</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Performance Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-effect rounded-3xl p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Performance Breakdown</h2>
            </div>

            <div className="space-y-6">
              {/* Questions Answered */}
              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Questions Answered</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {results.questions.filter(q => q.answer).length} / {results.questions.length}
                  </span>
                </div>
                <div className="relative w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ 
                      width: `${(results.questions.filter(q => q.answer).length / results.questions.length) * 100}%` 
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full"
                  />
                </div>
              </div>

              {results.questions.filter(q => q.answer).length > 0 && (
                <>
                  {/* Average Relevance */}
                  <div>
                    <div className="flex justify-between mb-3">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Average Relevance</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {Math.round(
                          results.questions
                            .filter(q => q.relevance)
                            .reduce((sum, q) => sum + q.relevance, 0) /
                            results.questions.filter(q => q.relevance).length
                        )}/10
                      </span>
                    </div>
                    <div className="relative w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${
                            (results.questions
                              .filter(q => q.relevance)
                              .reduce((sum, q) => sum + q.relevance, 0) /
                              results.questions.filter(q => q.relevance).length /
                              10) *
                            100
                          }%`
                        }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Average Clarity */}
                  <div>
                    <div className="flex justify-between mb-3">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Average Clarity</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {Math.round(
                          results.questions
                            .filter(q => q.clarity)
                            .reduce((sum, q) => sum + q.clarity, 0) /
                            results.questions.filter(q => q.clarity).length
                        )}/10
                      </span>
                    </div>
                    <div className="relative w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${
                            (results.questions
                              .filter(q => q.clarity)
                              .reduce((sum, q) => sum + q.clarity, 0) /
                              results.questions.filter(q => q.clarity).length /
                              10) *
                            100
                          }%`
                        }}
                        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-effect rounded-3xl p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Next Steps</h2>
            </div>

            <div className="space-y-4">
              {(suggestions[results.readinessLevel] || suggestions['Beginner']).map((suggestion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + (0.1 * index) }}
                  className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl hover:shadow-lg transition-shadow"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 pt-1">{suggestion}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              onClick={() => navigate('/dashboard')}
              className="btn-primary px-8 py-4 text-lg flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              onClick={() => navigate('/analytics')}
              className="px-8 py-4 text-lg glass-effect rounded-xl font-semibold text-gray-700 dark:text-gray-300 hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <BarChart className="w-5 h-5" />
              <span>View Analytics</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default InterviewComplete;
