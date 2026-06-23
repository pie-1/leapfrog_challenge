import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
        <p className="font-serif text-rose-700 text-lg">WeddingPlanner</p>
        <div className="flex space-x-6 mt-4 sm:mt-0">
          <Link to="/" className="hover:text-rose-600">Home</Link>
          <Link to="/about" className="hover:text-rose-600">About</Link>
          <Link to="/contact" className="hover:text-rose-600">Contact</Link>
          <Link to="/privacy" className="hover:text-rose-600">Privacy</Link>
        </div>
        <p className="mt-4 sm:mt-0">
          &copy; {new Date().getFullYear()} WeddingPlanner. All rights reserved.
        </p>
      </div>
    </footer>
  );
}