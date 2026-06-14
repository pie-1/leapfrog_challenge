import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Mountain, User, LogOut, Settings, Compass, Shield, FileText, Users } from "lucide-react";
import { useState, useEffect } from "react";
import FirebaseLogin from '../auth/FirebaseLogin';
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const response = await fetch(`http://localhost:5000/api/users/${currentUser.uid}`);
          const data = await response.json();
          setUserRole(data.role);
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const navLinks = [
    { name: "Home", path: "/", icon: <Mountain size={16} /> },
    { name: "Routes", path: "/routes", icon: <Compass size={16} /> },
    { name: "Fast Help", path: "/safety", icon: <Shield size={16} /> },
    { name: "Permits", path: "/permits", icon: <FileText size={16} /> },
    { name: "Profiles", path: "/profiles", icon: <Users size={16} /> },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-gradient-to-r from-gray-900/98 to-gray-800/98 backdrop-blur-md shadow-2xl" 
          : "bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-sm"
      } border-b border-white/10`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center shadow-lg"
            >
              <img 
                src="/images/trek_logo.jpg" 
                alt="TrekSarathi" 
                className="h-full w-full rounded-full object-cover"
              />
            </motion.div>
            <span className="text-white font-bold text-xl lg:text-2xl hidden sm:block">
              Trek<span className="text-green-500">Sarathi</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
              >
                {link.icon}
                <span className="font-medium">{link.name}</span>
              </Link>
            ))}
            
            <div className="ml-4">
              <FirebaseLogin />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden py-4 border-t border-white/10 space-y-2"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg transition"
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}
              <div className="pt-2">
                <FirebaseLogin />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;