import { motion } from 'framer-motion';

const SectionWrapper = ({ children, className = '' }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-100px' }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

export default SectionWrapper;