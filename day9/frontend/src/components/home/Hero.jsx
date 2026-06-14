import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const scrollToForm = () => {
    const form = document.getElementById("trekker-form");
    if (form) {
      form.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute w-full h-full object-cover"
      >
        <source src="/videos/nepal_trek.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>

      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm mb-4">
            🏔️ Nepal Best Trekking Platform
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold max-w-5xl"
        >
          Discover Nepal's
          <span className="text-green-500"> Hidden Trails</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-6 max-w-2xl text-lg md:text-xl text-gray-200"
        >
          Trek planner helping adventurers find perfect routes, 
          connect with local guides, and explore safely
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={scrollToForm}
            className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 px-8 py-4 rounded-full text-lg font-semibold shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            Start Planning
            <ArrowRight className="group-hover:translate-x-1 transition" size={20} />
          </button>
          <a
            href="/routes"
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 px-8 py-4 rounded-full text-lg font-semibold transition border border-white/20"
          >
            Explore Routes
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-2 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;