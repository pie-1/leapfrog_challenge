import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import PageCard from '../components/home/PageCard';
import { getAllTemplates } from '../data/templates';

const Gallery = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const [backendRes] = await Promise.all([
          fetch('http://localhost:5000/api/pages'),
        ]);
        let backendPages = [];
        if (backendRes.ok) {
          backendPages = await backendRes.json();
          backendPages = backendPages.map(p => ({ ...p, source: 'uploaded' }));
        }
        const localTemplates = getAllTemplates();
        const allPages = [...localTemplates, ...backendPages];
        setPages(allPages);
      } catch (error) {
        console.error('Error fetching pages:', error);
        const localTemplates = getAllTemplates();
        setPages(localTemplates);
      } finally {
        setLoading(false);
      }
    };
    fetchPages();
  }, []);

  const filteredPages = pages.filter(page => {
    if (filter === 'all') return true;
    if (filter === 'image') return page.source === 'image' || !page.source;
    if (filter === 'pdf') return page.source === 'uploaded' || page.isPDF === true;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-pink/10 via-pastel-yellow/10 to-pastel-sky/10">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800">🖼️ Gallery</h1>
          <p className="text-gray-500 mt-2">All coloring pages in one place</p>
        </motion.div>

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
            🖼️ Images
          </button>
          <button
            onClick={() => setFilter('pdf')}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              filter === 'pdf'
                ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg'
                : 'bg-white/80 text-gray-600 hover:bg-white'
            }`}
          >
            📄 PDFs
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400 mx-auto"></div>
          </div>
        ) : filteredPages.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📄</div>
            <p className="text-gray-500">No pages found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPages.map((page, index) => (
              <motion.div
                key={page._id || page.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <PageCard page={page} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Gallery;