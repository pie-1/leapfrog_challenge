import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  User,
  LogIn,
  Activity,
  Briefcase,
  Clock,
  FileText,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn] = useState(false);

  const navLinks = [
    { to: "/providers", label: "Find Services", icon: Briefcase },
    { to: "/post-job", label: "Post Job", icon: FileText },
    { to: "/my-history", label: "My History", icon: Clock },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F7F4EC]/90 backdrop-blur-lg border-b border-[#E4DFD1]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="relative w-10 h-10 rounded-xl bg-[#1F3D2B] flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" strokeWidth={2.5} />

              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#E8A33D]">
                <span className="absolute inset-0 rounded-full bg-[#E8A33D] animate-ping" />
              </span>
            </div>

            <span className="text-2xl font-bold tracking-tight">
              Service<span className="text-[#D68F24]">Pulse</span>
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center flex-1">
            {/* Center Links */}
            <div className="flex-1 flex justify-center">
              <div className="flex items-center gap-10">
                {navLinks.map((link) => {
                  const Icon = link.icon;

                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="flex items-center gap-2 text-[15px] font-medium text-[#6B6558] hover:text-[#1F3D2B] transition"
                    >
                      <Icon size={17} />
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3 shrink-0">
              {isLoggedIn ? (
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#6B6558] hover:text-[#1F3D2B]"
                >
                  <User size={17} />
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#6B6558] hover:text-[#1F3D2B]"
                  >
                    <LogIn size={17} />
                    Log in
                  </Link>

                  <Link
                    to="/register"
                    className="px-6 py-2.5 rounded-full bg-[#E8A33D] text-[#14251A] font-semibold hover:bg-[#D68F24] transition"
                  >
                    Sign up free
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden ml-auto p-2 rounded-lg hover:bg-[#EFEADA]"
          >
            {isOpen ? (
              <X size={24} className="text-[#1C1B18]" />
            ) : (
              <Menu size={24} className="text-[#1C1B18]" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden border-t border-[#E4DFD1]"
            >
              <div className="py-4 space-y-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;

                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#EFEADA] text-[#6B6558]"
                    >
                      <Icon size={18} />
                      {link.label}
                    </Link>
                  );
                })}

                <div className="border-t border-[#E4DFD1] pt-3 mt-3">
                  <Link
                    to="/login"
                    className="block px-4 py-3 rounded-lg hover:bg-[#EFEADA]"
                  >
                    Log in
                  </Link>

                  <Link
                    to="/register"
                    className="block mt-2 mx-4 text-center py-3 rounded-full bg-[#E8A33D] font-semibold text-[#14251A]"
                  >
                    Sign up free
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;