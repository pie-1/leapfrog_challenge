import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const services = [
  { id: 'lion', name: 'Animals', emoji: '🐾', color: 'from-orange-400 to-pink-400', count: '12 pages' },
  { id: 'butterfly', name: 'Nature', emoji: '🌿', color: 'from-green-400 to-teal-400', count: '10 pages' },
  { id: 'cat', name: 'Cartoon', emoji: '⭐', color: 'from-yellow-400 to-orange-400', count: '8 pages' },
  // Add more with actual template IDs
];

const ServicesSection = () => {
  return (
    <section className="py-16 bg-white/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">🎨 What can you color?</h2>
          <p className="text-gray-500 mt-2 text-lg">Explore our collection of fun coloring pages</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {services.map((service, index) => (
            <Link to={`/color/${service.id}`} key={service.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, type: 'spring' }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-all text-center cursor-pointer"
              >
                <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center text-3xl`}>
                  {service.emoji}
                </div>
                <h3 className="font-semibold text-gray-700 mt-3">{service.name}</h3>
                <p className="text-xs text-gray-400">{service.count}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;