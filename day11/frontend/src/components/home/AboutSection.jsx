import { motion } from 'framer-motion';
import SectionWrapper from '../common/SectionWrapper';

const AboutSection = () => {
  const features = [
    { icon: '🎨', title: '50+ Coloring Pages', desc: 'From animals to space, we have it all!' },
    { icon: '🌈', title: '20+ Vibrant Colors', desc: 'Pick your favorite and start creating.' },
    { icon: '📤', title: 'Upload Your Own PDF', desc: 'Color your own coloring books.' },
    { icon: '👨‍👩‍👧‍👦', title: 'Share with Family', desc: 'Show off your masterpieces!' },
    { icon: '🖍️', title: 'Easy to Use', desc: 'Perfect for kids of all ages.' },
    { icon: '🌟', title: '100% Free', desc: 'No hidden costs, just fun!' },
  ];

  return (
    <SectionWrapper className="py-16 md:py-20 bg-gradient-to-br from-pastel-pink/10 via-pastel-yellow/10 to-pastel-sky/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
              🎨 About ColorMe
            </h2>
            <p className="text-gray-500 mt-3 text-lg max-w-2xl mx-auto">
              The free, interactive coloring book for kids of all ages
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Left - Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-lg"
          >
            <div className="text-5xl mb-4">📖</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Our Story</h3>
            <p className="text-gray-600 leading-relaxed">
              ColorMe was born from a simple idea: every child deserves a canvas 
              to express their creativity. We believe that coloring is not just 
              fun—it's a way to learn, relax, and grow.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              Whether you're a parent, teacher, or little artist, ColorMe is 
              here to bring joy and color to your world.
            </p>
          </motion.div>

          {/* Right - Mission */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 md:p-8 shadow-lg"
          >
            <div className="text-5xl mb-4">🌟</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To inspire creativity and imagination in every child through 
              the magic of coloring. We're building a world where every 
              page is a new adventure.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2 text-gray-600">
                <span className="text-green-500">✓</span> Safe & kid-friendly
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <span className="text-green-500">✓</span> Always free to use
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <span className="text-green-500">✓</span> New pages weekly
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-10"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-xl p-4 text-center shadow-md hover:shadow-xl transition"
            >
              <div className="text-3xl md:text-4xl mb-2">{feature.icon}</div>
              <h4 className="font-semibold text-gray-700 text-sm">{feature.title}</h4>
              <p className="text-xs text-gray-400 mt-1 hidden md:block">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <p className="text-gray-500 text-lg">
            🎨 <span className="font-semibold">Ready to start coloring?</span>
          </p>
          <a
            href="#pages"
            className="inline-block mt-3 px-8 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full font-semibold hover:scale-105 transition shadow-lg"
          >
            Explore Coloring Pages →
          </a>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default AboutSection;