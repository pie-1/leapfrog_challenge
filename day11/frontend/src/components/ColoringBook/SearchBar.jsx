import { motion } from 'framer-motion';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative max-w-md mx-auto mb-8"
    >
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="text-gray-400">🔍</span>
      </div>
      <input
        type="text"
        placeholder="Search coloring pages..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-4 py-3 rounded-full border-2 border-pastel-pink/30 focus:border-pastel-pink focus:outline-none bg-white/70 backdrop-blur-sm text-gray-700 placeholder-gray-400"
      />
    </motion.div>
  );
};

export default SearchBar;