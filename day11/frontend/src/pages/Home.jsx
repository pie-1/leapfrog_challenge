import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import FeaturedPages from '../components/home/FeaturedPages';
import AboutSection from '../components/home/AboutSection';
import { getAllTemplates } from '../data/templates';

const Home = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const templates = getAllTemplates();
    // Add source to each template if not present
    const withSource = templates.map(t => ({
      ...t,
      source: t.source || 'image'
    }));
    setPages(withSource);
    setLoading(false);
  }, []);

  // Filter pages
  const filteredPages = pages.filter(page => {
    // Search filter
    const matchesSearch = !searchQuery || 
      page.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.category?.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Source filter
    const matchesFilter = filter === 'all' || 
      (filter === 'image' && page.source === 'image') ||
      (filter === 'pdf' && (page.source === 'pdf' || page.source === 'uploaded'));
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-pink/10 via-pastel-yellow/10 to-pastel-sky/10">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      
      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              filter === 'all'
                ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg'
                : 'bg-white/80 text-gray-600 hover:bg-white'
            }`}
          >
            All ({pages.length})
          </button>
          <button
            onClick={() => setFilter('image')}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              filter === 'image'
                ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg'
                : 'bg-white/80 text-gray-600 hover:bg-white'
            }`}
          >
            🖼️ Images ({pages.filter(p => p.source === 'image').length})
          </button>
          <button
            onClick={() => setFilter('pdf')}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              filter === 'pdf'
                ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg'
                : 'bg-white/80 text-gray-600 hover:bg-white'
            }`}
          >
            📄 PDFs ({pages.filter(p => p.source === 'pdf' || p.source === 'uploaded').length})
          </button>
        </div>
      </div>

      <FeaturedPages pages={filteredPages} loading={loading} />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Home;