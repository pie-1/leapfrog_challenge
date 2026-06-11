import { Mountain } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 bg-black/30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
        <div className="flex items-center gap-2 text-white font-bold text-xl">
          <Mountain />
          TrekSarathi
        </div>

        <div className="hidden md:flex gap-8 text-white">
          <a href="#">Home</a>
          <a href="#">Routes</a>
          <a href="#">Pricing</a>
          <a href="#">About</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;