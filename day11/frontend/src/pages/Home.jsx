import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import CategoryList from '../components/ColoringBook/CategoryList';
import PageCard from '../components/ColoringBook/PageCard';
import SearchBar from '../components/ColoringBook/SearchBar';
import { templates } from '../data/templates';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(Object.values(templates).map(t => t.category))];

  const filteredPages = Object.values(templates).filter(page => {
    const matchesSearch = page.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || page.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <Navbar />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-4 py-8"
      >
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
          >
            ✨ ColorMe ✨
          </motion.h1>
          <p className="text-gray-600 text-lg mt-4 font-light">
            Pick a page, pick a color, and bring it to life!
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Category Filter */}
        <CategoryList 
          categories={categories} 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory} 
        />

        {/* Pages Grid */}
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6"
        >
          {filteredPages.map((page, index) => (
            <motion.div
              key={page.id}
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: index * 0.05, type: 'spring' }}
              whileHover={{ scale: 1.03, rotate: 1 }}
            >
              <Link to={`/color/${page.id}`}>
                <PageCard page={page} />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {filteredPages.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-gray-500"
          >
            🎨 No coloring pages found. Try a different search!
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Home;