import { motion } from 'framer-motion';

const PageCard = ({ page }) => {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border-2 border-pastel-pink/20"
    >
      <div 
        className="h-40 bg-gradient-to-br from-pastel-pink/20 to-pastel-sky/20 flex items-center justify-center p-4"
        dangerouslySetInnerHTML={{ __html: page.svg }}
      />
      <div className="p-4">
        <h3 className="font-semibold text-gray-700 truncate">{page.name}</h3>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs px-2 py-1 bg-pastel-pink/20 text-pink-500 rounded-full">
            {page.category}
          </span>
          <span className="text-xs text-gray-400">{page.difficulty}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PageCard;