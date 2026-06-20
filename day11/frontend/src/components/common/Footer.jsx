import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { MdMail } from 'react-icons/md';


const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="text-2xl font-bold">
              🎨 ColorMe
            </Link>
            <p className="text-gray-400 text-sm mt-2">
              Where imagination comes to life!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/upload" className="hover:text-white transition">Upload PDF</Link></li>
              <li><Link to="/#pages" className="hover:text-white transition">Coloring Pages</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/?category=Animals" className="hover:text-white transition">Animals</Link></li>
              <li><Link to="/?category=Nature" className="hover:text-white transition">Nature</Link></li>
              <li><Link to="/?category=Cartoon" className="hover:text-white transition">Cartoon</Link></li>
              <li><Link to="/?category=Numbers" className="hover:text-white transition">Numbers</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <p className="text-sm text-gray-400 mb-3">
              Get new coloring pages weekly!
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-full bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 text-sm"
              />
              <button className="px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full font-semibold hover:scale-105 transition text-sm">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © 2026 ColorMe. Made with ❤️ for little artists.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition"><FaFacebook size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition"><FaTwitter size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition"><FaInstagram size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition"><FaYoutube size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition"><MdMail size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;