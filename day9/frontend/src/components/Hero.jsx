import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative h-screen overflow-hidden">
      <video
        autoPlay
        muted
        loop
        className="absolute w-full h-full object-cover"
      >
    <source src="/videos/nepal_trek.mp4" type="video/mp4" />
    </video>

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4">
        <motion.h1
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-bold"
        >
          Discover Nepal's Hidden Trails
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 max-w-2xl text-lg"
        >
          AI Powered Trek Planner for Adventurers
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          className="mt-8 bg-green-500 px-8 py-4 rounded-full"
        >
          Start Planning
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;