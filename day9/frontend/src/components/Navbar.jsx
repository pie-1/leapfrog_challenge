import { Link } from "react-router-dom";
import { Mountain } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 bg-black/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="flex items-center gap-2 text-white text-xl font-bold"
        >
          <Mountain />
          TrekSarathi
        </Link>

        <div className="flex gap-8 text-white">

          <Link
            to="/"
            className="hover:text-green-400"
          >
            Home
          </Link>

          <Link
            to="/routes"
            className="hover:text-green-400"
          >
            Routes
          </Link>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;