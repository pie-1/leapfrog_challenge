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
  { value: "0", label: "Weddings Planned" },
  { value: "0%", label: "Satisfied Couples" },
  { value: "0+", label: "Trusted Vendors" },
];

export default function Home() {
  return (
    <div>
      {/* Hero Section with Background Image */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Zoom Animation */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/wedding_img1.jpeg')`,
          }}
        />

        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

        {/* Decorative blur circles (optional, adds depth) */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-rose-300/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-300/20 rounded-full blur-3xl" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 max-w-4xl mx-auto text-center px-6"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white leading-tight drop-shadow-lg">
            Your Dream Wedding, <br />
            <span className="text-rose-200">Planned Perfectly</span>
          </h1>
          <p className="mt-4 text-lg text-gray-100/90 max-w-2xl mx-auto drop-shadow">
            From mehendi to mandap – manage every ritual, vendor, and guest in
            one beautiful, intelligent platform.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
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
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-6 py-16">
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition group"
            >
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition">
                <feature.icon className="w-6 h-6" />
              </div>
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
              <p className="text-3xl font-serif font-bold text-rose-700">
                {stat.value}
              </p>
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