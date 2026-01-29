import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { 
  FileText, 
  Briefcase, 
  Play, 
  TrendingUp, 
  Upload,
  Target,
  Zap,
  Award,
  Clock,
  CheckCircle2
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/analytics');
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const hasResume = user?.resumeData?.skills?.length > 0;

  const quickActions = [
    {
      title: 'Upload Resume',
      description: 'Get AI-powered analysis',
      icon: Upload,
      gradient: 'from-blue-500 to-cyan-500',
      action: () => navigate('/resume'),
      disabled: false
    },
    {
      title: 'Select Role',
      description: 'Choose target position',
      icon: Target,
      gradient: 'from-purple-500 to-pink-500',
      action: () => navigate('/role'),
      disabled: !hasResume
    },
    {
      title: 'Start Interview',
      description: 'Begin practice session',
      icon: Play,
      gradient: 'from-green-500 to-emerald-500',
      action: async () => {
        try {
          const response = await api.post('/interview/start', {});
          navigate(`/interview/${response.data.sessionId}`);
        } catch (error) {
          alert('Failed to start interview');
        }
      },
      disabled: !hasResume
    },
    {
      title: 'View Analytics',
      description: 'Track your progress',
      icon: TrendingUp,
      gradient: 'from-orange-500 to-red-500',
      action: () => navigate('/analytics'),
      disabled: false
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8 relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 p-6 sm:p-8 shadow-2xl"
        >
          <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-3">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 animate-pulse" />
              <span className="text-sm sm:text-base text-white/90 font-medium">Ready to improve?</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
              Your Interview Prep Hub
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-white/90">
              Let's ace that dream job together! 🚀
            </p>
          </div>
          {/* Animated background shapes */}
          <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-white/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 left-0 w-32 sm:w-48 h-32 sm:h-48 bg-white/10 rounded-full blur-3xl" style={{ animationDelay: '1s' }} />
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -3 }}
            transition={{ duration: 0.15 }}
            className="card bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-none"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Resume Status</h3>
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {hasResume ? 'Ready' : 'Pending'}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                {hasResume ? <CheckCircle2 className="w-6 h-6 text-white" /> : <FileText className="w-6 h-6 text-white" />}
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {hasResume
                ? `${user.resumeData.skills.length} skills detected`
                : 'Upload your resume to begin'}
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -3 }}
            transition={{ duration: 0.15 }}
            className="card bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-none"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Target Role</h3>
                <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {user?.selectedRole || 'Not Selected'}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Current focus area
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -3 }}
            transition={{ duration: 0.15 }}
            className="card bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-none"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Readiness Score</h3>
                <div className="flex items-baseline space-x-1">
                  <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    {user?.interviewReadinessScore || 0}
                  </p>
                  <span className="text-lg text-gray-500">%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {loading ? 'Calculating...' : `${stats?.totalSessions || 0} sessions completed`}
            </p>
          </motion.div>
        </motion.div>

        {/* Quick Actions */}
        <div className="mb-6 sm:mb-8">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center space-x-2"
          >
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
            <span>Quick Actions</span>
          </motion.h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.title}
                  variants={itemVariants}
                  whileHover={{ scale: action.disabled ? 1 : 1.02, y: action.disabled ? 0 : -2 }}
                  whileTap={{ scale: action.disabled ? 1 : 0.98 }}
                  onClick={action.action}
                  disabled={action.disabled}
                  className="card text-left transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                >
                  <div className="relative z-10 flex items-start space-x-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${action.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">{action.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {action.description}
                      </p>
                    </div>
                  </div>
                  {!action.disabled && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${action.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        {/* Skills Section */}
        {hasResume && user.resumeData.skills.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="card bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-none"
          >
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold">Your Skills</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {user.resumeData.skills.map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.05, duration: 0.15 }}
                  whileHover={{ scale: 1.05, y: -1 }}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Motivational Banner */}
        {!hasResume && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.3, type: "spring", stiffness: 300, damping: 20 }}
            className="card bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-none text-center p-8"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Let's Get Started!</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Upload your resume to unlock personalized interview questions and AI feedback
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              onClick={() => navigate('/resume')}
              className="btn-primary inline-flex items-center space-x-2"
            >
              <Upload className="w-5 h-5" />
              <span>Upload Resume Now</span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
