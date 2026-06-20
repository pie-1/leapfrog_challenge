import { motion } from 'framer-motion';
import PageCard from './PageCard';

const PageGrid = ({ pages, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white/50 rounded-2xl h-48 animate-pulse" />
        ))}
      </div>
    );
  }

  if (pages.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎨</div>
        <p className="text-gray-500 text-lg">No coloring pages found!</p>
        <p className="text-gray-400">Upload a PDF or try a different category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {pages.map((page, index) => (
        <motion.div
          key={page._id || page.id}
          initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.05, type: 'spring' }}
          whileHover={{ scale: 1.03, rotate: 1 }}
        >
          <PageCard page={page} />
        </motion.div>
      ))}
    </div>
  );
};

export default PageGrid;