import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, MapPin, Filter, X, AlertCircle, Star } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ProviderCard from '../components/providers/ProviderCard';
import API from '../utils/api';

const Providers = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('rating');

  const categories = ['all', 'plumbing', 'electrician', 'cleaning', 'cooking', 'carpenter', 'painting', 'labour', 'driver'];

  useEffect(() => {
    fetchProviders();
  }, [selectedCategory, sortBy]);

  const fetchProviders = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = {};
      if (selectedCategory !== 'all') params.category = selectedCategory;
      if (sortBy) params.sort = sortBy;

      const response = await API.get('/providers', { params });
      setProviders(response.data);
    } catch (err) {
      console.error('Error fetching providers:', err);
      setError('Failed to load providers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredProviders = providers.filter((p) => {
    const matchesSearch = p.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.serviceType?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = location ? p.userId?.address?.toLowerCase().includes(location.toLowerCase()) : true;
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-[#FBFAF6] font-['Inter']">
      <Navbar />

      <div className="pt-28 pb-16 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#1C1B18] font-['Space_Grotesk'] tracking-tight">
                Find the right pro
              </h1>
              <p className="text-[#6B6558] mt-2">
                {filteredProviders.length} professionals available
              </p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 bg-white border border-[#E4DFD1] rounded-xl text-sm text-[#1C1B18] focus:outline-none focus:border-[#1F3D2B] transition-colors"
              >
                <option value="rating">Sort by Rating</option>
                <option value="experience">Sort by Experience</option>
                <option value="hourlyRate">Sort by Price (Low to High)</option>
              </select>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-5 py-2.5 bg-[#1F3D2B] text-white rounded-xl font-semibold text-sm hover:bg-[#2F5940] transition-colors flex items-center gap-2"
              >
                <Filter size={18} />
                Filters
              </button>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 bg-white rounded-xl border border-[#E4DFD1] flex items-center gap-3 px-4 py-3">
              <Search className="text-[#8A8371]" size={19} />
              <input
                type="text"
                placeholder="Search by name or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full outline-none text-[#1C1B18] placeholder-[#8A8371] bg-transparent text-[15px]"
              />
            </div>
            <div className="flex-1 bg-white rounded-xl border border-[#E4DFD1] flex items-center gap-3 px-4 py-3">
              <MapPin className="text-[#8A8371]" size={19} />
              <input
                type="text"
                placeholder="Enter your location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full outline-none text-[#1C1B18] placeholder-[#8A8371] bg-transparent text-[15px]"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                  selectedCategory === cat
                    ? 'bg-[#1F3D2B] text-white'
                    : 'bg-white border border-[#E4DFD1] text-[#6B6558] hover:border-[#1F3D2B]'
                }`}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3 text-red-600">
              <AlertCircle size={20} />
              <span>{error}</span>
              <button onClick={fetchProviders} className="ml-auto text-sm font-medium hover:underline">
                Retry
              </button>
            </div>
          )}

          {/* Results Grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#E8A33D]" />
            </div>
          ) : filteredProviders.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-[#E4DFD1]">
              <div className="text-4xl mb-4">🔍</div>
              <p className="text-[#6B6558]">No professionals found matching your criteria</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setLocation('');
                  setSelectedCategory('all');
                }}
                className="mt-4 text-[#E8A33D] hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProviders.map((provider, index) => (
                <motion.div
                  key={provider._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProviderCard provider={provider} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Providers;