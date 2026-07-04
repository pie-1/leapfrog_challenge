import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Wrench, Zap, Sparkles, ChefHat, HardHat, Hammer, Paintbrush, Car, ArrowRight } from 'lucide-react';

const categories = [
  { id: 'plumber', icon: Wrench, name: 'Plumbers', count: '120+' },
  { id: 'electrician', icon: Zap, name: 'Electricians', count: '95+' },
  { id: 'cleaner', icon: Sparkles, name: 'Cleaners', count: '150+' },
  { id: 'cook', icon: ChefHat, name: 'Cooks', count: '80+' },
  { id: 'labour', icon: HardHat, name: 'Labourers', count: '200+' },
  { id: 'carpenter', icon: Hammer, name: 'Carpenters', count: '60+' },
  { id: 'painter', icon: Paintbrush, name: 'Painters', count: '70+' },
  { id: 'driver', icon: Car, name: 'Drivers', count: '110+' },
];

const CategoryGrid = () => {
  return (
    <section className="py-24 md:py-28 bg-white font-['Inter']">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <div className="text-center sm:text-left">
            <span className="inline-block text-xs font-semibold tracking-[0.15em] text-[#D68F24] font-['IBM_Plex_Mono'] mb-3">
              BROWSE BY TRADE
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C1B18] font-['Space_Grotesk'] tracking-tight">
              Every kind of help, in one place
            </h2>
            <p className="mt-3 text-[#6B6558] text-base md:text-lg max-w-md">
              Pick a category to see verified pros near you, ranked by rating.
            </p>
          </div>
          <Link
            to="/providers"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[#1F3D2B] hover:text-[#2F5940] transition-colors whitespace-nowrap group"
          >
            View all services
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <Link to={`/providers?category=${category.id}`} className="group block">
                  <div className="relative bg-[#FBFAF6] border border-[#E4DFD1] rounded-2xl p-6 h-full transition-all duration-200 hover:border-[#1F3D2B]/25 hover:shadow-[0_8px_24px_-8px_rgba(20,37,26,0.15)] hover:-translate-y-1">
                    <div className="w-12 h-12 rounded-xl bg-[#EFEADA] group-hover:bg-[#1F3D2B] flex items-center justify-center transition-colors duration-200">
                      <Icon
                        size={22}
                        strokeWidth={1.8}
                        className="text-[#1F3D2B] group-hover:text-[#F7F4EC] transition-colors duration-200"
                      />
                    </div>
                    <h3 className="font-semibold text-[15px] text-[#1C1B18] font-['Space_Grotesk'] mt-4">
                      {category.name}
                    </h3>
                    <p className="text-[13px] text-[#D68F24] font-['IBM_Plex_Mono'] font-medium mt-1">
                      {category.count} available
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile-only "view all" since the desktop one sits in the header row */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/providers"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1F3D2B] group"
          >
            View all services
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;