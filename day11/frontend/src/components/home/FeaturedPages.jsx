import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FeaturedPages = ({ pages = [], loading = false }) => {
  if (loading) {
    return (
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400 mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="pages" className="py-16 bg-white/50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800">
            🌟 Featured Coloring Pages
          </h2>
          <p className="text-gray-500 mt-2 text-lg">
            Pick your favorite and start coloring!
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {pages.map((page, index) => (
            <motion.div
              key={page.id || page._id || index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, type: 'spring' }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <Link to={`/color/${page.id || page._id}`}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border-2 border-pastel-pink/20 hover:border-pastel-pink/50">
                  <div className="h-32 bg-gradient-to-br from-pastel-pink/10 to-pastel-sky/10 flex items-center justify-center p-2 relative">
                    <span className="absolute top-1 right-1 text-xs px-2 py-0.5 rounded-full bg-black/10">
                      {page.source === 'image' ? '🖼️' : 
                       page.source === 'pdf' ? '📄' : '📤'}
                    </span>
                    <div 
                      className="w-full h-full flex items-center justify-center"
                      dangerouslySetInnerHTML={{ 
                        __html: page.svg || page.imageData || '<span class="text-4xl">🎨</span>' 
                      }}
                    />
                  </div>
                  <div className="p-2 text-center">
                    <h3 className="font-semibold text-gray-700 text-sm truncate">
                      {page.name}
                    </h3>
                    <span className="text-xs text-gray-400">{page.category}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPages;