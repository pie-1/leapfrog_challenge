import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionWrapper from '../common/SectionWrapper';

const services = [
  { id: 1, name: 'Animals', emoji: '🐾', color: 'from-orange-400 to-pink-400', count: '12 pages' },
  { id: 2, name: 'Nature', emoji: '🌿', color: 'from-green-400 to-teal-400', count: '10 pages' },
  { id: 3, name: 'Cartoon', emoji: '⭐', color: 'from-yellow-400 to-orange-400', count: '8 pages' },
  { id: 4, name: 'Numbers', emoji: '🔢', color: 'from-blue-400 to-purple-400', count: '6 pages' },
  { id: 5, name: 'Alphabet', emoji: '🔤', color: 'from-red-400 to-pink-400', count: '8 pages' },
  { id: 6, name: 'Vehicles', emoji: '🚗', color: 'from-teal-400 to-blue-400', count: '7 pages' },
  { id: 7, name: 'Fruits', emoji: '🍎', color: 'from-red-400 to-orange-400', count: '5 pages' },
  { id: 8, name: 'Space', emoji: '🚀', color: 'from-purple-400 to-indigo-400', count: '6 pages' },
  { id: 9, name: 'Dinosaurs', emoji: '🦕', color: 'from-green-400 to-yellow-400', count: '5 pages' },
  { id: 10, name: 'Princess', emoji: '👸', color: 'from-pink-400 to-purple-400', count: '6 pages' },
];

const ServicesSection = () => {
  return (
    <SectionWrapper className="py-16 md:py-20 bg-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              🎨 What can you color?
            </h2>
            <p className="text-gray-500 mt-2 text-base md:text-lg">
              Explore our collection of fun coloring pages
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, type: 'spring' }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-2xl p-4 md:p-5 shadow-md hover:shadow-xl transition-all text-center cursor-pointer"
            >
              <div className={`w-14 h-14 md:w-16 md:h-16 mx-auto rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center text-3xl md:text-4xl`}>
                {service.emoji}
              </div>
              <h3 className="font-semibold text-gray-700 mt-3 text-sm md:text-base">{service.name}</h3>
              <p className="text-xs text-gray-400">{service.count}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            to="/upload"
            className="inline-block px-7 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full font-semibold hover:scale-105 transition shadow-lg text-sm md:text-base"
          >
            📤 Upload Your Own PDF
          </Link>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default ServicesSection;