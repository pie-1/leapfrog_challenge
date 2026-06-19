import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 15 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-pastel-pink/30"
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
          🎨 ColorMe
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-gray-600 hover:text-pink-500 transition">Home</Link>
          <Link to="/upload" className="text-gray-600 hover:text-pink-500 transition">Upload</Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;