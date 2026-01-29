import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Briefcase, Check, Code, Server, Rocket, BarChart3, Sparkles } from 'lucide-react';

const RoleSelection = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(user?.selectedRole || '');
  const [customRole, setCustomRole] = useState('');
  const [loading, setLoading] = useState(false);

  const predefinedRoles = [
    {
      title: 'Frontend Developer',
      description: 'React, Vue, Angular, HTML, CSS',
      icon: Code,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Backend Developer',
      description: 'Node.js, Python, Java, Databases',
      icon: Server,
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Full Stack Developer',
      description: 'Frontend + Backend + Deployment',
      icon: Rocket,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Data Analyst',
      description: 'SQL, Python, Visualization, Statistics',
      icon: BarChart3,
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setCustomRole('');
  };

  const handleSave = async () => {
    const roleToSave = customRole.trim() || selectedRole;
    
    if (!roleToSave) {
      alert('Please select or enter a role');
      return;
    }

    setLoading(true);
    try {
      await api.put('/resume/role', { role: roleToSave });
      updateUser({ selectedRole: roleToSave });
      navigate('/dashboard');
    } catch (error) {
      alert('Failed to save role');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 -m-4 sm:-m-6 p-4 sm:p-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 sm:mb-12 pt-4 sm:pt-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 shadow-xl"
            >
              <Briefcase className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </motion.div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Select Your Target Role
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
              Choose the position you're preparing for and we'll tailor your interview experience
            </p>
          </motion.div>

          {/* Role Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {predefinedRoles.map((role, index) => {
              const IconComponent = role.icon;
              const isSelected = selectedRole === role.title;
              
              return (
                <motion.button
                  key={role.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index, type: "spring" }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleRoleSelect(role.title)}
                  className={`relative glass-effect rounded-3xl p-6 text-left overflow-hidden transition-all ${
                    isSelected
                      ? 'ring-4 ring-primary-500 shadow-2xl'
                      : 'hover:shadow-xl'
                  }`}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${role.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
                  
                  {/* Check Badge */}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <Check className="w-5 h-5 text-white" />
                    </motion.div>
                  )}

                  <div className="relative">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${role.gradient} rounded-2xl mb-4 shadow-lg`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                      {role.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {role.description}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Custom Role Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-effect rounded-3xl p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Custom Role</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Enter any specific position</p>
              </div>
            </div>
            <input
              type="text"
              value={customRole}
              onChange={(e) => {
                setCustomRole(e.target.value);
                setSelectedRole('');
              }}
              placeholder="e.g., Mobile Developer, DevOps Engineer, ML Engineer"
              className="input w-full text-lg"
            />
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              onClick={handleSave}
              disabled={loading || (!selectedRole && !customRole.trim())}
              className="btn-primary px-8 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </span>
              ) : (
                'Save & Continue'
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              onClick={() => navigate('/dashboard')}
              className="px-8 py-4 text-lg glass-effect rounded-xl font-semibold text-gray-700 dark:text-gray-300 hover:shadow-lg transition-all"
            >
              Back to Dashboard
            </motion.button>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default RoleSelection;
