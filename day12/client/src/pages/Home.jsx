import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CalendarIcon,
  UserGroupIcon,
  CurrencyRupeeIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    icon: CalendarIcon,
    title: "Smart Timeline",
    desc: "Auto-generated schedule for all rituals – Mehendi to Reception.",
  },
  {
    icon: UserGroupIcon,
    title: "Guest Manager",
    desc: "Track RSVPs, dietary needs, and seating arrangements effortlessly.",
  },
  {
    icon: CurrencyRupeeIcon,
    title: "Budget Tracker",
    desc: "Real‑time expense tracking with category-wise breakdowns.",
  },
  {
    icon: SparklesIcon,
    title: "AI Recommendations",
    desc: "Get vendor & decor suggestions tailored to your style & budget.",
  },
];

const stats = [
  { value: "10K+", label: "Weddings Planned" },
  { value: "98%", label: "Satisfied Couples" },
  { value: "500+", label: "Trusted Vendors" },
];

// Floating decorative elements
const floatingElements = [
  { emoji: "💍", x: "10%", y: "20%", delay: 0 },
  { emoji: "🌸", x: "85%", y: "15%", delay: 0.5 },
  { emoji: "✨", x: "5%", y: "70%", delay: 1 },
  { emoji: "🎵", x: "90%", y: "75%", delay: 1.5 },
];

// Text reveal variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Icon animations
const iconVariants = {
  float: {
    y: [0, -8, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const floatElement = (delay) => ({
  initial: { y: 0, opacity: 0 },
  animate: {
    y: [0, -20, 0],
    opacity: [0, 1, 1, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut",
    },
  },
});

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        
        {/* BACKGROUND IMAGE - Method 1: Using img tag (most reliable) */}
            <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url('/images/wedding_img2.jpg')`,
                backgroundColor: '#2d1b1b', // Fallback color
            }}
            />

        {/* Dark overlay - lighter to show image clearly */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/50 to-transparent" />

        {/* Floating decorative elements */}
        {floatingElements.map((el, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl md:text-4xl pointer-events-none select-none z-10"
            style={{ left: el.x, top: el.y }}
            variants={floatElement(el.delay)}
            initial="initial"
            animate="animate"
          >
            {el.emoji}
          </motion.div>
        ))}

        {/* Main content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-20 max-w-4xl mx-auto text-center px-6"
        >
          <motion.h1
            variants={containerVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white leading-tight drop-shadow-lg"
          >
            {["Your", "Dream", "Wedding,", "Planned", "Perfectly"].map(
              (word, idx) => (
                <motion.span
                  key={idx}
                  variants={wordVariants}
                  className="inline-block mr-2"
                >
                  {word}
                </motion.span>
              )
            )}
          </motion.h1>

          <motion.p
            variants={wordVariants}
            className="mt-4 text-lg text-gray-100/95 max-w-2xl mx-auto drop-shadow"
          >
            From mehendi to mandap – manage every ritual, vendor, and guest in
            one beautiful, intelligent platform.
          </motion.p>

          <motion.div
            variants={wordVariants}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/register"
              className="bg-rose-600 text-white px-8 py-3 rounded-full hover:bg-rose-700 transition shadow-lg shadow-rose-500/30"
            >
              Start Planning Free
            </Link>
            <Link
              to="/login"
              className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-full border border-white/30 hover:bg-white/30 transition"
            >
              Sign In
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-6 py-16 mt-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-serif text-gray-800">
            Everything You Need, <span className="text-rose-600">One Place</span>
          </h2>
          <p className="text-gray-500 mt-2">
            Smart tools designed for the modern Indian wedding.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition group"
            >
              <motion.div
                variants={iconVariants}
                animate="float"
                whileHover={{ scale: 1.15, rotate: 10 }}
                className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition"
              >
                <feature.icon className="w-6 h-6" />
              </motion.div>
              <h3 className="mt-4 font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-rose-50 py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.p
                whileHover={{ scale: 1.05 }}
                className="text-3xl font-serif font-bold text-rose-700"
              >
                {stat.value}
              </motion.p>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-rose-600 to-rose-700 text-white p-10 rounded-3xl shadow-xl"
        >
          <h2 className="text-3xl font-serif">Ready to Plan Your Wedding?</h2>
          <p className="mt-2 text-rose-100">
            Join thousands of happy couples who planned their dream wedding with
            us.
          </p>
          <Link
            to="/register"
            className="inline-block mt-6 bg-white text-rose-600 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition shadow-lg"
          >
            Get Started Free
          </Link>
        </motion.div>
      </section>
    </div>
  );
}