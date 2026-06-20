import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const featuredPages = [
  { id: 'lion', name: 'Happy Lion', category: 'Animals', emoji: '🦁' },
  { id: 'butterfly', name: 'Butterfly', category: 'Animals', emoji: '🦋' },
  { id: 'flower', name: 'Flower Garden', category: 'Nature', emoji: '🌺' },
  { id: 'tree', name: 'Magic Tree', category: 'Nature', emoji: '🌳' },
  { id: 'cat', name: 'Friendly Cat', category: 'Cartoon', emoji: '🐱' },
  { id: 'rocket', name: 'Rocket Ship', category: 'Cartoon', emoji: '🚀' },
  { id: 'sun', name: 'Sun & Clouds', category: 'Nature', emoji: '☀️' },
  { id: 'fish', name: 'Underwater Fish', category: 'Animals', emoji: '🐠' },
  { id: 'dino', name: 'Cute Dinosaur', category: 'Cartoon', emoji: '🦕' },
  { id: 'rainbow', name: 'Rainbow', category: 'Nature', emoji: '🌈' },
];

const FeaturedPages = () => {
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
          {featuredPages.map((page, index) => (
            <motion.div
              key={page.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, type: 'spring' }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <Link to={`/color/${page.id}`}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border-2 border-pastel-pink/20 hover:border-pastel-pink/50">
                  <div className="h-32 bg-gradient-to-br from-pastel-pink/10 to-pastel-sky/10 flex items-center justify-center text-5xl">
                    {page.emoji}
                  </div>
                  <div className="p-3 text-center">
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