import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import api from '../services/api';
import { Send, Loader, CheckCircle, XCircle, SkipForward, MessageCircle, Sparkles, TrendingUp } from 'lucide-react';

const Interview = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchSession();
  }, [sessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [feedback]);

  const fetchSession = async () => {
    try {
      const response = await api.get(`/interview/session/${sessionId}`);
      setSession(response.data);
      
      const answeredCount = response.data.questions.filter(q => q.answer).length;
      setCurrentQuestionIndex(answeredCount);
      
      setLoading(false);
    } catch (error) {
      alert('Failed to load interview session');
      navigate('/dashboard');
    }
  };

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) {
      alert('Please provide an answer');
      return;
    }

    setSubmitting(true);
    try {
      const response = await api.post(`/interview/answer/${sessionId}`, {
        questionIndex: currentQuestionIndex,
        answer: answer.trim()
      });

      setFeedback(response.data);
      
      setTimeout(() => {
        if (currentQuestionIndex < session.questions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
          setAnswer('');
          setFeedback(null);
        } else {
          handleCompleteInterview();
        }
      }, 3000);
    } catch (error) {
      alert('Failed to submit answer');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSkip = () => {
    if (currentQuestionIndex < session.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setAnswer('');
      setFeedback(null);
    } else {
      handleCompleteInterview();
    }
  };

  const handleCompleteInterview = async () => {
    try {
      await api.post(`/interview/complete/${sessionId}`);
      navigate(`/interview-complete/${sessionId}`);
    } catch (error) {
      alert('Failed to complete interview');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-96">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full mb-4"
          />
          <p className="text-gray-600 dark:text-gray-400">Loading interview session...</p>
        </div>
      </Layout>
    );
  }

  const currentQuestion = session?.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / session.questions.length) * 100;

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 -m-4 sm:-m-6 p-4 sm:p-6">
        <div className="max-w-5xl mx-auto">
          {/* Header with Progress */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4">
              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">Interview in Progress</h1>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    Question {currentQuestionIndex + 1} of {session.questions.length}
                  </p>
                </div>
              </div>
              <div className="w-full sm:w-auto text-left sm:text-right">
                <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                  {Math.round(progress)}%
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Complete</p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="relative w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 rounded-full"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer" />
            </div>
          </motion.div>

          {/* Question Card */}
          <div className="space-y-4 sm:space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: -50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 50, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25, duration: 0.3 }}
                className="glass-effect rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg"
                  >
                    <Sparkles className="w-6 h-6 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-xl text-gray-900 dark:text-white leading-relaxed"
                    >
                      {currentQuestion.question}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Answer / Feedback Section */}
            <AnimatePresence mode="wait">
              {!feedback ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="glass-effect rounded-3xl p-8"
                >
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Your Answer
                  </label>
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Share your thoughts and expertise..."
                    className="input min-h-[200px] resize-none text-lg"
                    disabled={submitting}
                  />
                  
                  <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubmitAnswer}
                      disabled={submitting || !answer.trim()}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 flex-1 py-4"
                    >
                      {submitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Evaluating Answer...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Submit Answer</span>
                        </>
                      )}
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSkip}
                      disabled={submitting}
                      className="glass-effect px-6 py-4 rounded-xl font-semibold text-gray-700 dark:text-gray-300 hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <SkipForward className="w-5 h-5" />
                      <span>Skip Question</span>
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="glass-effect rounded-3xl p-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0"
                    >
                      <CheckCircle className="w-7 h-7 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        AI Evaluation
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {feedback.feedback}
                      </p>
                    </div>
                  </div>
                  
                  {/* Scores Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {[
                      { label: 'Overall', value: feedback.score, color: 'from-blue-500 to-cyan-500' },
                      { label: 'Relevance', value: feedback.relevance, color: 'from-purple-500 to-pink-500' },
                      { label: 'Clarity', value: feedback.clarity, color: 'from-orange-500 to-red-500' },
                      { label: 'Technical', value: feedback.technicalDepth, color: 'from-green-500 to-emerald-500' }
                    ].map((metric, index) => (
                      <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center shadow-lg"
                      >
                        <div className={`text-3xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent mb-1`}>
                          {metric.value}/10
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">{metric.label}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Missing Keywords */}
                  {feedback.missingKeywords?.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl p-4 border border-yellow-200 dark:border-yellow-800"
                    >
                      <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
                        💡 Consider mentioning:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {feedback.missingKeywords.map((keyword, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + (0.1 * index) }}
                            className="px-3 py-1 bg-yellow-200 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 rounded-lg text-sm font-medium"
                          >
                            {keyword}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Moving to next question indicator */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-6 text-center"
                  >
                    <div className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span>Moving to next question...</span>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Interview;
