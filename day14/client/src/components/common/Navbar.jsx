import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogIn, Activity, Briefcase, Clock, FileText, LogOut } from 'lucide-react';
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
    { to: '/my-history', label: 'My History', icon: Clock },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F7F4EC]/90 backdrop-blur-lg border-b border-[#E4DFD1] font-['Inter']">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="relative w-9 h-9 rounded-xl bg-[#1F3D2B] flex items-center justify-center shrink-0">
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
          <div className="hidden md:flex items-center">
            <div className="flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-[#6B6558] hover:text-[#1F3D2B] hover:bg-[#EFEADA] transition-colors"
                  >
                    <Icon size={16} />
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="w-px h-6 bg-[#E4DFD1] mx-5" />

            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-[#1C1B18] font-medium">
                  👋 {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-[#6B6558] hover:text-[#E74C3C] hover:bg-[#EFEADA] transition-colors"
                >
                  <LogOut size={17} /> Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-[#6B6558] hover:text-[#1F3D2B] hover:bg-[#EFEADA] transition-colors"
                >
                  <LogIn size={17} /> Log in
                </Link>
                <Link
                  to="/register"
                  className="ml-1 px-5 py-2.5 bg-[#E8A33D] text-[#14251A] rounded-full text-sm font-semibold hover:bg-[#D68F24] transition-colors"
                >
                  Sign up free
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2.5 -mr-2.5 rounded-lg hover:bg-[#EAE5D6] transition-colors"
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
              className="md:hidden overflow-hidden border-t border-[#E4DFD1]"
            >
              <div className="py-3 flex flex-col gap-0.5">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="flex items-center gap-2.5 px-3 py-3 rounded-lg text-[#6B6558] hover:text-[#1F3D2B] hover:bg-[#EFEADA] transition-colors text-[15px] font-medium"
                    >
                      <Icon size={17} />
                      {link.label}
                    </Link>
                  );
                })}
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2.5 px-3 py-3 rounded-lg text-[#E74C3C] hover:bg-[#EFEADA] transition-colors text-[15px] font-medium"
                  >
                    <LogOut size={17} /> Logout
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-3 py-3 rounded-lg text-[#6B6558] hover:text-[#1F3D2B] hover:bg-[#EFEADA] transition-colors text-[15px] font-medium"
                    >
                      Log in
                    </Link>
                    <Link
                      to="/register"
                      className="mt-2 px-4 py-3 bg-[#E8A33D] text-[#14251A] rounded-full text-center font-semibold hover:bg-[#D68F24] transition-colors"
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