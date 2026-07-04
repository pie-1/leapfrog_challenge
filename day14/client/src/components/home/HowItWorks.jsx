import { motion } from 'framer-motion';
import { Search, CalendarCheck, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    icon: Search,
    number: '01',
    title: 'Search',
    description: 'Tell us what you need — we match you with vetted pros nearby, ranked by rating and availability.',
  },
  {
    icon: CalendarCheck,
    number: '02',
    title: 'Book',
    description: 'Pick a time that works for you. Confirm in a couple of taps, no phone calls required.',
  },
  {
    icon: CheckCircle2,
    number: '03',
    title: 'Relax',
    description: 'Your pro shows up, gets it done, and you pay through the app once you\'re satisfied.',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 md:py-28 bg-[#F7F4EC] font-['Inter']">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="text-center max-w-xl mx-auto mb-20">
          <span className="inline-block text-xs font-semibold tracking-[0.15em] text-[#D68F24] font-['IBM_Plex_Mono'] mb-3">
            THE PROCESS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1C1B18] font-['Space_Grotesk'] tracking-tight">
            How it works
          </h2>
          <p className="mt-3 text-[#6B6558] text-base md:text-lg">
            Three steps between "I need help" and "it's handled."
          </p>
        </div>

        <div className="relative grid md:grid-cols-3 gap-14 md:gap-8">
          {/* Connecting line — desktop only, echoes the pulse-line motif from the hero */}
          <div className="hidden md:block absolute top-9 left-[16.5%] right-[16.5%] h-px">
            <svg className="w-full h-px overflow-visible" preserveAspectRatio="none">
              <line
                x1="0" y1="0" x2="100%" y2="0"
                stroke="#D9D2BE"
                strokeWidth="1.5"
                strokeDasharray="1 8"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="relative text-center px-2"
              >
                <div className="relative w-[72px] h-[72px] mx-auto mb-6">
                  <div className="w-full h-full rounded-full bg-[#1F3D2B] flex items-center justify-center relative z-10 ring-8 ring-[#F7F4EC]">
                    <Icon className="w-7 h-7 text-[#F7F4EC]" strokeWidth={1.8} />
                  </div>
                  <span className="absolute -bottom-2 -right-1 z-20 w-7 h-7 rounded-full bg-[#E8A33D] text-[#14251A] text-[11px] font-bold font-['IBM_Plex_Mono'] flex items-center justify-center ring-4 ring-[#F7F4EC]">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-[#1C1B18] font-['Space_Grotesk'] mb-2.5">
                  {step.title}
                </h3>
                <p className="text-[#6B6558] text-[15px] leading-relaxed max-w-[260px] mx-auto">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;