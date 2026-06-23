import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

const navLinks = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Planner", path: "/planner" },
  { name: "Vendors", path: "/vendors" },
  { name: "Guest List", path: "/guests" },
];

export default function Navbar() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
    setIsOpen(false);
  };

  const handleNavClick = () => setIsOpen(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-serif font-bold text-rose-700 tracking-wide"
          >
            WeddingPlanner
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {currentUser ? (
              <>
                {/* Dropdown for Planner features */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-1 text-gray-700 hover:text-rose-600 transition"
                  >
                    <span>Services</span>
                    <ChevronDownIcon className="w-4 h-4" />
                  </button>
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2"
                      >
                        <Link
                          to="/planner"
                          className="block px-4 py-2 text-sm hover:bg-rose-50 hover:text-rose-600"
                        >
                          Wedding Timeline
                        </Link>
                        <Link
                          to="/budget"
                          className="block px-4 py-2 text-sm hover:bg-rose-50 hover:text-rose-600"
                        >
                          Budget Tracker
                        </Link>
                        <Link
                          to="/checklist"
                          className="block px-4 py-2 text-sm hover:bg-rose-50 hover:text-rose-600"
                        >
                          Personalized Checklist
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-gray-700 hover:text-rose-600 transition"
                  >
                    {link.name}
                  </Link>
                ))}

                <button
                  onClick={handleLogout}
                  className="bg-rose-600 text-white px-4 py-2 rounded-full text-sm hover:bg-rose-700 transition shadow-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-rose-600">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-rose-600 text-white px-4 py-2 rounded-full hover:bg-rose-700 transition shadow-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-rose-600"
            >
              {isOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (slide-down) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3"
          >
            {currentUser ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={handleNavClick}
                  className="block text-gray-700 hover:text-rose-600"
                >
                  Dashboard
                </Link>
                <Link
                  to="/planner"
                  onClick={handleNavClick}
                  className="block text-gray-700 hover:text-rose-600"
                >
                  Planner
                </Link>
                <Link
                  to="/vendors"
                  onClick={handleNavClick}
                  className="block text-gray-700 hover:text-rose-600"
                >
                  Vendors
                </Link>
                <Link
                  to="/guests"
                  onClick={handleNavClick}
                  className="block text-gray-700 hover:text-rose-600"
                >
                  Guest List
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-rose-600 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={handleNavClick}
                  className="block text-gray-700 hover:text-rose-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={handleNavClick}
                  className="block bg-rose-600 text-white px-4 py-2 rounded-full text-center hover:bg-rose-700 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}