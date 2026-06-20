import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Menu, X, User, Upload, Home } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${searchQuery}`);
      setIsOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Upload', path: '/upload', icon: <Upload size={18} /> },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-lg py-2'
          : 'bg-white/80 backdrop-blur-md py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.05 }}
              className="text-2xl md:text-3xl"
            >
              🎨
            </motion.div>
             <span className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
                ColorMe
              </span>
          </Link>

          {/* Desktop Search - Centered */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search coloring pages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-full border border-gray-200 focus:border-pink-400 focus:outline-none bg-gray-50/80 text-gray-700 placeholder-gray-400 text-sm transition"
              />
            </div>
          </form>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="flex items-center gap-2 px-3 lg:px-4 py-2 text-gray-600 hover:text-pink-500 rounded-xl hover:bg-pink-50 transition-all duration-200 text-sm font-medium"
              >
                {link.icon}
                <span className="hidden lg:inline">{link.name}</span>
              </Link>
            ))}
            <Link
              to="/profile"
              className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center text-white hover:scale-105 transition shadow-md shrink-0"
            >
              <User size={16} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-gray-100"
          >
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-full border border-gray-200 focus:border-pink-400 focus:outline-none bg-gray-50/80 text-gray-700 text-sm"
                />
              </div>
            </form>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded-xl transition"
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded-xl transition"
            >
              <User size={18} />
              Profile
            </Link>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;