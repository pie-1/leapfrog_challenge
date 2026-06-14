import { Link } from "react-router-dom";
import {
  Menu,
  X,
  Mountain,
  Compass,
  Shield,
  FileText,
  Users,
} from "lucide-react";
import { useState, useEffect } from "react";
import FirebaseLogin from "../auth/FirebaseLogin";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {
        setUser(currentUser);

        if (currentUser) {
          try {
            const response = await fetch(
              `http://localhost:5000/api/users/${currentUser.uid}`
            );

            const data = await response.json();
            setUserRole(data.role);
          } catch (error) {
            console.error(
              "Error fetching user role:",
              error
            );
          }
        }
      }
    );

    return () => unsubscribe();
  }, []);

  const navLinks = [
    {
      name: "Home",
      path: "/",
      icon: <Mountain size={16} />,
    },
    {
      name: "Routes",
      path: "/routes",
      icon: <Compass size={16} />,
    },
    {
      name: "Help",
      path: "/safety",
      icon: <Shield size={16} />,
    },
    {
      name: "Permits",
      path: "/permits",
      icon: <FileText size={16} />,
    },
    {
      name: "Profiles",
      path: "/profiles",
      icon: <Users size={16} />,
    },
  ];

  return (
<motion.nav
  initial={{ y: -100 }}
  animate={{ y: 0 }}
  transition={{ duration: 0.4 }}
  className={`fixed top-0 left-0 right-0 z-50 border-b border-white/10 transition-all duration-300 ${
    scrolled
      ? "bg-gray-950/90 backdrop-blur-xl shadow-lg"
      : "bg-gray-950/70 backdrop-blur-md"
  }`}
>
  <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
    
    {/* Desktop */}
    <div className="hidden lg:grid grid-cols-[auto_1fr_auto] items-center h-[76px]">

      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-3"
      >
        <img
          src="/images/trek_logo.jpg"
          alt="TrekSarathi"
          className="h-11 w-11 rounded-full object-cover"
        />

        <span className="text-2xl font-bold text-white">
          Trek
          <span className="text-green-500">
            Sarathi
          </span>
        </span>
      </Link>

      {/* Center Nav */}
      <div className="flex justify-center">
        <div className="flex items-center gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="
                flex items-center gap-3
                px-4 py-2.5
                rounded-xl
                text-sm font-medium
                text-gray-300
                hover:text-white
                hover:bg-white/10
                transition-all
              "
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Login */}
      <div className="flex justify-end">
        <FirebaseLogin />
      </div>
    </div>

    {/* Mobile Header */}
    <div className="flex lg:hidden items-center justify-between h-[72px]">

      <Link
        to="/"
        className="flex items-center gap-3"
      >
        <img
          src="/images/trek_logo.jpg"
          alt="TrekSarathi"
          className="h-10 w-10 rounded-full object-cover"
        />

        <span className="font-bold text-xl text-white">
          Trek
          <span className="text-green-500">
            Sarathi
          </span>
        </span>
      </Link>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-white rounded-lg hover:bg-white/10"
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
          className="lg:hidden py-4 border-t border-white/10"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="
                flex items-center gap-3
                px-4 py-3
                rounded-lg
                text-gray-300
                hover:text-white
                hover:bg-white/10
              "
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}

          <div className="mt-3 pt-3 border-t border-white/10">
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