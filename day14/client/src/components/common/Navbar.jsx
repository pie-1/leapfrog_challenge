import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, User, LogIn, Activity, Briefcase, Clock,
  FileText, LogOut, LayoutDashboard, MapPin, ChevronDown,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

 
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const navLinks = [
    { to: '/providers', label: 'Find Services', icon: Briefcase },
    { to: '/post-job', label: 'Post Job', icon: FileText },
    { to: '/near-me', label: 'Near Me', icon: MapPin },
    { to: '/my-history', label: 'My History', icon: Clock },
  ];

  const accountLinks =
    user?.role === 'provider'
      ? [
          { to: '/provider/dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { to: '/provider/jobs', label: 'Available Jobs', icon: Briefcase },
        ]
      : [];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F7F4EC]/95 backdrop-blur-xl border-b border-[#E4DFD1] shadow-sm font-['Inter']">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">

        <div className="grid grid-cols-[auto_1fr_auto] items-center h-20 gap-4">
          
          <Link to="/" className="flex items-center gap-2.5 shrink-0 justify-self-start group">
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


          <div className="hidden md:flex items-center justify-self-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  title={link.label}
                  className="flex items-center gap-2 px-3 lg:px-3.5 py-2 rounded-xl text-sm font-medium text-[#6B6558] hover:text-[#1F3D2B] hover:bg-[#EFEADA] transition-colors duration-200"
                >
                  <Icon size={16} className="shrink-0" />
                  <span className="hidden lg:inline">{link.label}</span>
                </Link>
              );
            })}
          </div>


          <div className="hidden md:flex items-center gap-2 justify-self-end">
            {user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-[#EFEADA] hover:bg-[#E4DFC7] transition-colors duration-200"
                >
                  <div className="w-7 h-7 rounded-full bg-[#1F3D2B] flex items-center justify-center text-[#F7F4EC] text-xs font-semibold shrink-0">
                    {user.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <span className="text-sm font-medium text-[#1C1B18] max-w-[100px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown
                    size={15}
                    className={`text-[#6B6558] transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#E4DFD1] py-2 overflow-hidden origin-top-right"
                    >
                      {user.role === 'provider' && accountLinks.length > 0 && (
                        <>
                          <div className="px-4 pt-1 pb-2 text-[11px] font-semibold tracking-wide text-[#8A8371] font-['IBM_Plex_Mono']">
                            PROVIDER
                          </div>
                          {accountLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                              <Link
                                key={link.to}
                                to={link.to}
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-[#1C1B18] hover:bg-[#F7F4EC] transition-colors"
                              >
                                <Icon size={16} className="text-[#6B6558]" />
                                {link.label}
                              </Link>
                            );
                          })}
                          <div className="my-1.5 border-t border-[#E4DFD1]" />
                        </>
                      )}
                      <button
                        onClick={() => {
                          handleLogout();
                          setMenuOpen(false);
                        }}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-[#C0392B] hover:bg-[#FBEAE7] transition-colors w-full text-left"
                      >
                        <LogOut size={16} />
                        Log out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium text-[#6B6558] hover:text-[#1F3D2B] hover:bg-[#EFEADA] transition-colors duration-200"
                >
                  <LogIn size={16} /> Log in
                </Link>
                <Link
                  to="/register"
                  className="ml-1 px-5 py-2.5 bg-[#E8A33D] text-[#14251A] rounded-xl text-sm font-semibold hover:bg-[#D68F24] transition-all duration-200 hover:scale-[1.03] shadow-sm hover:shadow-md"
                >
                  Sign up free
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2.5 -mr-2.5 rounded-xl hover:bg-[#EAE5D6] transition-colors duration-200 justify-self-end"
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
                {user && (
                  <div className="flex items-center gap-3 px-3.5 py-3 mb-1 rounded-xl bg-[#EFEADA]">
                    <div className="w-9 h-9 rounded-full bg-[#1F3D2B] flex items-center justify-center text-[#F7F4EC] text-sm font-semibold shrink-0">
                      {user.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#1C1B18] truncate">{user.name}</p>
                      {user.role === 'provider' && (
                        <p className="text-xs text-[#8A8371] font-['IBM_Plex_Mono']">PROVIDER</p>
                      )}
                    </div>
                  </div>
                )}

                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-3.5 py-3.5 rounded-xl text-[#6B6558] hover:text-[#1F3D2B] hover:bg-[#EFEADA] transition-colors duration-200 text-[15px] font-medium"
                    >
                      <Icon size={18} className="shrink-0" />
                      {link.label}
                    </Link>
                  );
                })}

                {accountLinks.length > 0 && (
                  <>
                    <div className="my-2 border-t border-[#E4DFD1]" />
                    <div className="px-3.5 pb-1 text-[11px] font-semibold tracking-wide text-[#8A8371] font-['IBM_Plex_Mono']">
                      PROVIDER
                    </div>
                    {accountLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.to}
                          to={link.to}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-3 px-3.5 py-3.5 rounded-xl text-[#6B6558] hover:text-[#1F3D2B] hover:bg-[#EFEADA] transition-colors duration-200 text-[15px] font-medium"
                        >
                          <Icon size={18} className="shrink-0" />
                          {link.label}
                        </Link>
                      );
                    })}
                  </>
                )}

                <div className="my-2 border-t border-[#E4DFD1]" />

                {user ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-3 px-3.5 py-3.5 rounded-xl text-[#C0392B] hover:bg-[#FBEAE7] transition-colors duration-200 text-[15px] font-medium w-full text-left"
                  >
                    <LogOut size={18} className="shrink-0" />
                    Log out
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-3.5 py-3.5 rounded-xl text-[#6B6558] hover:text-[#1F3D2B] hover:bg-[#EFEADA] transition-colors duration-200 text-[15px] font-medium"
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