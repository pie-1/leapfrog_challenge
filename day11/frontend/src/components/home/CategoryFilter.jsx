import { motion } from 'framer-motion';

const categories = [
  { id: 'All', emoji: '🌈', label: 'All' },
  { id: 'Animals', emoji: '🐾', label: 'Animals' },
  { id: 'Nature', emoji: '🌿', label: 'Nature' },
  { id: 'Cartoon', emoji: '⭐', label: 'Cartoon' },
  { id: 'Patterns', emoji: '🌀', label: 'Patterns' },
  { id: 'Uploaded', emoji: '📤', label: 'My Uploads' },
];

const CategoryFilter = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {categories.map((cat) => (
        <motion.button
          key={cat.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelectCategory(cat.id)}
          className={`px-5 py-2.5 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${
            selectedCategory === cat.id
              ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg'
              : 'bg-white/70 text-gray-600 hover:bg-white'
          }`}
        >
          <span>{cat.emoji}</span>
          {cat.label}
        </motion.button>
      ))}
    </div>
  );
};

export default CategoryFilter;