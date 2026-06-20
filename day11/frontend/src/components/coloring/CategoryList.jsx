import { motion } from 'framer-motion';

const CategoryList = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-8">
      {categories.map((category) => (
        <motion.button
          key={category}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedCategory(category)}
          className={`px-5 py-2 rounded-full font-semibold transition-all duration-200 ${
            selectedCategory === category
              ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg'
              : 'bg-white/60 text-gray-600 hover:bg-white'
          }`}
        >
          {category}
        </motion.button>
      ))}
    </div>
  );
};

export default CategoryList;