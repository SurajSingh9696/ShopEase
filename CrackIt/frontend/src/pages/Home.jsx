import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Brain, 
  Target, 
  TrendingUp, 
  Award, 
  Zap,
  CheckCircle2,
  ArrowRight,
  Play,
  Users,
  BarChart3,
  Shield,
  Clock,
  Star,
  Github,
  Linkedin,
  Mail,
  X
} from 'lucide-react';

const Home = () => {
  const [showDemoModal, setShowDemoModal] = useState(false);

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced AI evaluates your resume and identifies key skills for targeted preparation',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Target,
      title: 'Role-Specific Questions',
      description: 'Get customized interview questions tailored to your target job position',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: TrendingUp,
      title: 'Real-Time Feedback',
      description: 'Receive instant evaluation and actionable feedback on your answers',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: BarChart3,
      title: 'Performance Analytics',
      description: 'Track your progress with detailed insights and performance metrics',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is encrypted and stored securely with enterprise-grade protection',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Clock,
      title: 'Practice Anytime',
      description: '24/7 access to mock interviews - practice at your own pace and schedule',
      gradient: 'from-pink-500 to-rose-500'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Active Users', icon: Users },
    { number: '50K+', label: 'Interviews Conducted', icon: Play },
    { number: '95%', label: 'Success Rate', icon: Award },
    { number: '4.9/5', label: 'User Rating', icon: Star }
  ];

  const benefits = [
    'Personalized interview questions based on your resume',
    'Instant AI-powered feedback and scoring',
    'Comprehensive performance analytics dashboard',
    'Practice for multiple job roles and industries',
    'Track improvement over time with detailed metrics',
    'Mobile-friendly interface for on-the-go practice'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="w-10 sm:w-14 h-10 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center overflow-hidden">
                <img src="/CrackIt.png" alt="CrackIt Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                  CrackIt
                </h1>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2 sm:space-x-4"
            >
              <Link
                to="/login"
                className="px-3 sm:px-6 py-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-semibold transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 sm:px-6 py-2 text-sm sm:text-base bg-gradient-to-r from-primary-500 to-purple-600 text-white rounded-lg sm:rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                Get Started
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.3, type: "spring", stiffness: 300, damping: 20 }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-100 to-purple-100 dark:from-primary-900/30 dark:to-purple-900/30 rounded-full px-4 py-2 mb-6"
              >
                <Zap className="w-4 h-4 text-primary-600" />
                <span className="text-sm font-semibold text-primary-700 dark:text-primary-400">
                  AI-Powered Interview Practice
                </span>
              </motion.div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                  Ace Your Next
                </span>
                <br />
                <span className="bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Interview with AI
                </span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 leading-relaxed">
                Practice with AI-generated interview questions tailored to your resume. 
                Get instant feedback, track your progress, and land your dream job with confidence.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary-500 to-purple-600 text-white rounded-2xl font-semibold shadow-2xl hover:shadow-primary-500/50 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Start Free Trial</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  onClick={() => setShowDemoModal(true)}
                  className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-700"
                >
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </motion.button>
              </div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-12 flex items-center gap-8"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Free to start</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">No credit card required</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Hero Image/Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3, type: "spring", stiffness: 300, damping: 20 }}
              className="relative"
            >
              <div className="relative glass-effect rounded-3xl p-8 shadow-2xl">
                {/* Animated gradient background */}
                <motion.div 
                  animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.02, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl" 
                />
                
                <div className="relative space-y-4">
                  {/* Mock Interview Card */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                        <Brain className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">AI Interviewer</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Ready to begin</p>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      "Explain the difference between SQL and NoSQL databases..."
                    </p>
                    <div className="flex gap-2">
                      <div className="flex-1 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
                      <div className="flex-1 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
                      <div className="flex-1 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                    </div>
                  </motion.div>

                  {/* Stats Card */}
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl"
                  >
                    <h4 className="font-bold text-gray-900 dark:text-white mb-4">Your Progress</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">85%</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Score</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">12</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Sessions</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Pro</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Level</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-r from-primary-500 to-purple-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center text-white"
                >
                  <IconComponent className="w-8 h-8 mx-auto mb-3 opacity-80" />
                  <p className="text-4xl font-bold mb-2">{stat.number}</p>
                  <p className="text-white/80">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
              Powerful Features to Succeed
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to prepare for your next interview and land your dream job
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="glass-effect rounded-3xl p-8 hover:shadow-2xl transition-all"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                Why Choose CrackIt?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Our platform combines cutting-edge AI technology with proven interview strategies to help you succeed.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-effect rounded-3xl p-8 shadow-2xl"
            >
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Upload Resume</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">AI analyzes your skills and experience</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Practice Interviews</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Get role-specific questions and scenarios</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Improve & Succeed</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Track progress and ace your interviews</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-effect rounded-3xl p-12 text-center bg-gradient-to-br from-primary-500/10 to-purple-500/10"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Join thousands of successful candidates who landed their dream jobs with our AI-powered platform
            </p>
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="px-10 py-4 bg-gradient-to-r from-primary-500 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-primary-500/50 transition-all inline-flex items-center gap-2"
              >
                <span>Start Your Free Trial</span>
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 sm:px-6 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
                  <img src="/CrackIt.png" alt="CrackIt Logo" className="w-full h-full object-contain" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white">CrackIt</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Empowering your career journey with AI-powered interview preparation.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-primary-600 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary-600 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary-600 transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-primary-600 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary-600 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary-600 transition-colors">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><Link to="/privacy-policy" className="hover:text-primary-600 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-primary-600 transition-colors">Terms & Conditions</Link></li>
                <li><Link to="/cookie-policy" className="hover:text-primary-600 transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">© 2026 CrackIt. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <a 
                  href="https://github.com/SurajSingh9696" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-all hover:scale-110"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/suraj-singh-070a73213/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-all hover:scale-110 group"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-white" />
                </a>
                <a 
                  href="mailto:otheruse998877@gmail.com" 
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-all hover:scale-110 group"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Demo Video Modal */}
      {showDemoModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setShowDemoModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowDemoModal(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Video Container */}
            <div className="relative pt-[56.25%]">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="CrackIt Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Demo Info */}
            <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800">
              <h3 className="text-xl font-bold text-white mb-2">CrackIt Demo</h3>
              <p className="text-gray-400 text-sm">
                Watch how our AI-powered platform helps you prepare for interviews with personalized questions, 
                real-time feedback, and comprehensive analytics.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Home;
