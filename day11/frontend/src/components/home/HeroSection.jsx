import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ScrollIndicator from '../common/ScrollIndicator';
import DrawingPen from '../common/DrawingPen';

const HeroSection = () => {
  const floatingEmojis = ['🖍️', '🎨', '🌈', '⭐', '🖌️', '✨'];

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-gradient-to-br from-pastel-pink/30 via-pastel-yellow/20 to-pastel-sky/30">
      {/* Floating Emojis */}
      {floatingEmojis.map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl md:text-6xl opacity-20 pointer-events-none"
          initial={{ x: Math.random() * 100 - 50, y: Math.random() * 100 - 50 }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
        >
          {emoji}
        </motion.div>
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left max-w-2xl"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
                  ColorMe
                </span>
              </h1>
              <p className="text-2xl md:text-3xl text-gray-600 mt-3 font-light">
                Where imagination comes to life! 🎨
              </p>
            </motion.div>

            {/* Drawing Pen - Now inside the content area */}
            <DrawingPen className="mt-4 mx-auto lg:mx-0" />

            <p className="text-gray-500 mt-4 text-base md:text-lg max-w-md mx-auto lg:mx-0">
              Pick a page, choose your colors, and create something magical. 
              Share your masterpiece with family and friends!
            </p>
            <div className="flex flex-wrap gap-4 mt-6 justify-center lg:justify-start">
              <Link
                to="#pages"
                className="px-7 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full font-semibold hover:scale-105 transition shadow-lg flex items-center gap-2 text-sm md:text-base"
              >
                🎨 Start Coloring
              </Link>
              <Link
                to="/upload"
                className="px-7 py-3 bg-white/80 backdrop-blur-sm text-gray-700 rounded-full font-semibold hover:bg-white transition shadow-lg flex items-center gap-2 text-sm md:text-base"
              >
                📤 Upload PDF
              </Link>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex gap-6 md:gap-8 mt-8 justify-center lg:justify-start"
            >
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-purple-500">50+</div>
                <div className="text-xs md:text-sm text-gray-500">Coloring Pages</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-pink-500">20+</div>
                <div className="text-xs md:text-sm text-gray-500">Colors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-500">100%</div>
                <div className="text-xs md:text-sm text-gray-500">Free</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="flex-1 flex justify-center"
          >
            <div className="relative">
              <div className="text-[150px] md:text-[200px] lg:text-[250px] leading-none animate-float">
                🖍️
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-6 -right-6 text-3xl md:text-4xl"
              >
                ✨
              </motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute -bottom-6 -left-6 text-3xl md:text-4xl"
              >
                🌈
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
};

export default HeroSection;