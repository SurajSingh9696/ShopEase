import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';

const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{
          rotate: { duration: 1.5, repeat: Infinity, ease: "linear" },
          scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
        }}
        className={`${sizes[size]} bg-gradient-to-br from-primary-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl mb-4`}
      >
        <Loader className="w-1/2 h-1/2 text-white" />
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-gray-600 dark:text-gray-400 font-medium"
      >
        {text}
      </motion.p>
    </div>
  );
};

export default LoadingSpinner;
