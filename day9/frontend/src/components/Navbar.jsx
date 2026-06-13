import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/", color: "hover:text-green-400" },
    { name: "Routes", path: "/routes", color: "hover:text-green-400" },
    { name: "Fast Help", path: "/safety", color: "hover:text-red-400" },
    { name: "Permits", path: "/permits", color: "hover:text-blue-400" },
    { name: "Guides", path: "/guides", color: "hover:text-yellow-400" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="/images/trek_logo.jpg" 
              alt="TrekSarathi" 
              className="h-10 w-10 rounded-full object-cover border-2 border-green-500 group-hover:scale-105 transition"
            />
            <span className="text-white font-bold text-xl hidden sm:block">
              Trek<span className="text-green-500">Sarathi</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-gray-300 ${link.color} transition-colors font-medium`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Login Button */}
            <Link
              to="/login"
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-5 py-2 rounded-full hover:from-green-700 hover:to-green-800 transition shadow-lg"
            >
              Login / Signup
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block py-3 text-gray-300 ${link.color} transition-colors`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block mt-3 bg-gradient-to-r from-green-600 to-green-700 text-white text-center px-5 py-2 rounded-full"
            >
              Login / Signup
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;