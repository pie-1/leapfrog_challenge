import { motion } from 'framer-motion';
import { Search, MapPin, ShieldCheck, Star, Users, Wrench, Sparkles, Plug, Droplet, Paintbrush } from 'lucide-react';

const HeroSection = () => {
  const badges = [
    { icon: Wrench, label: 'Plumbing', pos: { left: '6%', top: '20%' } },
    { icon: Plug, label: 'Electrical', pos: { left: '82%', top: '16%' } },
    { icon: Sparkles, label: 'Cleaning', pos: { left: '10%', top: '70%' } },
    { icon: Paintbrush, label: 'Painting', pos: { left: '85%', top: '66%' } },
    { icon: Droplet, label: 'Repairs', pos: { left: '48%', top: '12%' } },
  ];

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden font-['Inter']">
      {/* Background image layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero_bg.jpeg"
          alt=""
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14251A] via-[#14251A]/60 to-[#14251A]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#14251A]/35 via-transparent to-[#14251A]/25" />
      </div>


      <div className="absolute inset-x-0 bottom-0 h-40 md:h-56 bg-gradient-to-b from-transparent to-white/10 z-[1] pointer-events-none" />

      {/* Ambient pulse line */}
      <svg
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-[1] w-full h-24 opacity-20 pointer-events-none"
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,50 L280,50 L310,15 L340,85 L365,50 L420,50 L450,25 L480,75 L505,50 L1200,50"
          fill="none"
          stroke="#E8A33D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop', repeatDelay: 1.2 }}
        />
      </svg>

      {/* Floating trade badges */}
      <div className="absolute inset-0 z-[2] pointer-events-none hidden md:block">
        {badges.map((badge, i) => {
          const Icon = badge.icon;
          return (
            <motion.div
              key={badge.label}
              className="absolute flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/85 text-xs font-medium"
              style={badge.pos}
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5 + i * 0.6, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
            >
              <Icon size={13} />
              {badge.label}
            </motion.div>
          );
        })}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pt-28 md:pt-32 pb-24 md:pb-32 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#F3B85E] text-xs font-semibold tracking-wide font-['IBM_Plex_Mono'] mb-8"
          >
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-[#E8A33D] opacity-75 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-[#E8A33D]" />
            </span>
            5,000+ PROS ONLINE NOW
          </motion.div>

          <motion.h1
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="text-4xl md:text-6xl font-bold text-white leading-[1.12] tracking-[-0.02em] font-['Space_Grotesk']"
          >
            Find trusted pros for<br className="hidden md:block" /> whatever's broken
          </motion.h1>

          <p className="mt-6 text-lg md:text-xl text-white/85 max-w-xl mx-auto leading-relaxed">
            Verified plumbers, electricians, and cleaners — booked in minutes, backed by real reviews.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-10 bg-[#F7F4EC] rounded-2xl shadow-2xl p-2.5 flex flex-col md:flex-row gap-1.5 md:gap-0"
          >
            <div className="flex-1 flex items-center gap-3 px-4 py-3.5 border-b md:border-b-0 md:border-r border-[#E4DFD1]">
              <Search className="text-[#8A8371] shrink-0" size={19} />
              <input
                type="text"
                placeholder="What service do you need?"
                className="w-full outline-none text-[#1C1B18] placeholder-[#8A8371] bg-transparent text-[15px]"
              />
            </div>
            <div className="flex-1 flex items-center gap-3 px-4 py-3.5">
              <MapPin className="text-[#8A8371] shrink-0" size={19} />
              <input
                type="text"
                placeholder="Enter your location"
                className="w-full outline-none text-[#1C1B18] placeholder-[#8A8371] bg-transparent text-[15px]"
              />
            </div>
            <button className="px-7 py-3.5 bg-[#1F3D2B] text-white rounded-xl font-semibold text-[15px] hover:bg-[#2F5940] transition-colors shrink-0">
              Search
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex flex-wrap justify-center items-center gap-x-7 gap-y-3 text-sm text-white/90"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#F3B85E]" />
              5,000+ verified professionals
            </div>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-white/30" />
            <div className="flex items-center gap-2">
              <Star size={16} className="text-[#F3B85E]" />
              4.8 average rating
            </div>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-white/30" />
            <div className="flex items-center gap-2">
              <Users size={16} className="text-[#F3B85E]" />
              100% satisfaction guarantee
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;