import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogIn, Activity, Briefcase, Clock, FileText, LogOut, LayoutDashboard, MapPin } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { to: '/providers', label: 'Find Services', icon: Briefcase },
    { to: '/post-job', label: 'Post Job', icon: FileText },
    { to: '/near-me', label: 'Near Me', icon: MapPin },
    { to: '/my-history', label: 'My History', icon: Clock },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F7F4EC]/95 backdrop-blur-xl border-b border-[#E4DFD1]/60 shadow-sm font-['Inter']">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 shrink-0 group"
          >
            <div className="relative w-9 h-9 rounded-xl bg-[#1F3D2B] flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105">
              <Activity className="w-5 h-5 text-[#F7F4EC]" strokeWidth={2.5} />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#E8A33D]">
                <span className="absolute inset-0 rounded-full bg-[#E8A33D] animate-ping" />
              </span>
            </div>
            <span className="text-xl font-semibold tracking-tight text-[#1C1B18] font-['Space_Grotesk']">
              Service<span className="text-[#D68F24]">Pulse</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {/* Main Nav Links */}
            <div className="flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium text-[#6B6558] hover:text-[#1F3D2B] hover:bg-[#EFEADA]/70 transition-all duration-200"
                  >
                    <Icon size={16} className="shrink-0" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Divider */}
            <div className="w-px h-7 bg-[#E4DFD1] mx-3" />

            {/* Provider Specific Links */}
            {user?.role === 'provider' && (
              <>
                <Link
                  to="/provider/dashboard"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium text-[#6B6558] hover:text-[#1F3D2B] hover:bg-[#EFEADA]/70 transition-all duration-200"
                >
                  <LayoutDashboard size={16} className="shrink-0" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/provider/jobs"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium text-[#6B6558] hover:text-[#1F3D2B] hover:bg-[#EFEADA]/70 transition-all duration-200"
                >
                  <Briefcase size={16} className="shrink-0" />
                  <span>Available Jobs</span>
                </Link>
                <div className="w-px h-7 bg-[#E4DFD1] mx-1" />
              </>
            )}

            {/* Auth Section */}
            {user ? (
              <div className="flex items-center gap-3 ml-1">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#EFEADA]/50">
                  <div className="w-7 h-7 rounded-full bg-[#1F3D2B] flex items-center justify-center text-[#F7F4EC] text-xs font-semibold">
                    {user.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <span className="text-sm font-medium text-[#1C1B18] hidden lg:inline">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium text-[#6B6558] hover:text-[#E74C3C] hover:bg-[#EFEADA]/70 transition-all duration-200"
                >
                  <LogOut size={16} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-1">
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-[#6B6558] hover:text-[#1F3D2B] hover:bg-[#EFEADA]/70 transition-all duration-200"
                >
                  <LogIn size={16} />
                  <span>Log in</span>
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 bg-[#E8A33D] text-[#14251A] rounded-xl text-sm font-semibold hover:bg-[#D68F24] transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                >
                  Sign up free
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2.5 -mr-2.5 rounded-xl hover:bg-[#EAE5D6] transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} className="text-[#1C1B18]" /> : <Menu size={22} className="text-[#1C1B18]" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden border-t border-[#E4DFD1]/60"
            >
              <div className="py-3 flex flex-col gap-0.5">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-3.5 py-3.5 rounded-xl text-[#6B6558] hover:text-[#1F3D2B] hover:bg-[#EFEADA]/70 transition-colors duration-200 text-[15px] font-medium"
                    >
                      <Icon size={18} className="shrink-0" />
                      {link.label}
                    </Link>
                  );
                })}

                {/* Provider Links in Mobile */}
                {user?.role === 'provider' && (
                  <>
                    <Link
                      to="/provider/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-3.5 py-3.5 rounded-xl text-[#6B6558] hover:text-[#1F3D2B] hover:bg-[#EFEADA]/70 transition-colors duration-200 text-[15px] font-medium"
                    >
                      <LayoutDashboard size={18} className="shrink-0" />
                      Dashboard
                    </Link>
                    <Link
                      to="/provider/jobs"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-3.5 py-3.5 rounded-xl text-[#6B6558] hover:text-[#1F3D2B] hover:bg-[#EFEADA]/70 transition-colors duration-200 text-[15px] font-medium"
                    >
                      <Briefcase size={18} className="shrink-0" />
                      Available Jobs
                    </Link>
                  </>
                )}

                {/* Divider */}
                <div className="my-2 border-t border-[#E4DFD1]/60" />

                {user ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-3 px-3.5 py-3.5 rounded-xl text-[#E74C3C] hover:bg-[#EFEADA]/70 transition-colors duration-200 text-[15px] font-medium w-full text-left"
                  >
                    <LogOut size={18} className="shrink-0" />
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-3.5 py-3.5 rounded-xl text-[#6B6558] hover:text-[#1F3D2B] hover:bg-[#EFEADA]/70 transition-colors duration-200 text-[15px] font-medium"
                    >
                      <LogIn size={18} className="shrink-0" />
                      Log in
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="mt-1 px-4 py-3.5 bg-[#E8A33D] text-[#14251A] rounded-xl text-center font-semibold hover:bg-[#D68F24] transition-colors duration-200"
                    >
                      Sign up free
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;