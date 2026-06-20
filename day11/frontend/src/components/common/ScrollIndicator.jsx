import { motion } from 'framer-motion';

const ScrollIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span className="text-xs text-gray-400 font-medium tracking-wider uppercase">
        Scroll
      </span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center pt-1.5"
      >
        <motion.div
          animate={{ y: [0, 14, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-1.5 h-1.5 bg-pink-400 rounded-full"
        />
      </motion.div>
    </motion.div>
  );
};

export default ScrollIndicator;