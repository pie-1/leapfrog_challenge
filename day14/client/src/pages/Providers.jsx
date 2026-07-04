import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, ShieldCheck, Filter, X } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ProviderCard from '../components/providers/ProviderCard';

const Providers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with API call
  useEffect(() => {
    const mockProviders = [
      {
        id: 1,
        name: 'Rajesh Sharma',
        service: 'Plumbing',
        rating: 4.9,
        reviews: 127,
        experience: 12,
        hourlyRate: 800,
        verified: true,
        location: 'Kathmandu',
        image: '/images/avatar-placeholder.jpg',
        availability: 'Available Today',
        distance: '1.2 km',
      },
      {
        id: 2,
        name: 'Sita Gurung',
        service: 'Electrician',
        rating: 4.8,
        reviews: 89,
        experience: 8,
        hourlyRate: 750,
        verified: true,
        location: 'Lalitpur',
        image: '/images/avatar-placeholder.jpg',
        availability: 'Tomorrow',
        distance: '2.5 km',
      },
      {
        id: 3,
        name: 'Kumar Tamang',
        service: 'Cleaning',
        rating: 4.7,
        reviews: 156,
        experience: 6,
        hourlyRate: 600,
        verified: true,
        location: 'Bhaktapur',
        image: '/images/avatar-placeholder.jpg',
        availability: 'Available Today',
        distance: '3.8 km',
      },
      {
        id: 4,
        name: 'Maya Rai',
        service: 'Cooking',
        rating: 4.9,
        reviews: 203,
        experience: 10,
        hourlyRate: 900,
        verified: true,
        location: 'Kathmandu',
        image: '/images/avatar-placeholder.jpg',
        availability: 'Booked',
        distance: '0.8 km',
      },
      {
        id: 5,
        name: 'Hari Shrestha',
        service: 'Carpenter',
        rating: 4.6,
        reviews: 67,
        experience: 15,
        hourlyRate: 700,
        verified: true,
        location: 'Lalitpur',
        image: '/images/avatar-placeholder.jpg',
        availability: 'Available Today',
        distance: '4.2 km',
      },
      {
        id: 6,
        name: 'Gita Poudel',
        service: 'Painting',
        rating: 4.8,
        reviews: 94,
        experience: 7,
        hourlyRate: 650,
        verified: false,
        location: 'Kathmandu',
        image: '/images/avatar-placeholder.jpg',
        availability: 'Tomorrow',
        distance: '1.8 km',
      },
    ];
    setProviders(mockProviders);
    setLoading(false);
  }, []);

  const categories = ['all', 'plumbing', 'electrician', 'cleaning', 'cooking', 'carpenter', 'painting', 'labour', 'driver'];

  const filteredProviders = providers.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.service.toLowerCase() === selectedCategory;
    const matchesLocation = location ? p.location.toLowerCase().includes(location.toLowerCase()) : true;
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-[#FBFAF6] font-['Inter']">
      <Navbar />

      <div className="pt-28 pb-16 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#1C1B18] font-['Space_Grotesk'] tracking-tight">
            Find the right pro
          </h1>
          <p className="text-[#6B6558] mt-2">
            {filteredProviders.length} professionals available near you
          </p>
        </motion.div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
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
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-5 py-3 bg-[#1F3D2B] text-white rounded-xl font-semibold text-sm hover:bg-[#2F5940] transition-colors flex items-center gap-2 shrink-0"
          >
            <Filter size={18} />
            Filters
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#1F3D2B] text-white'
                  : 'bg-white border border-[#E4DFD1] text-[#6B6558] hover:border-[#1F3D2B]'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#E8A33D]" />
          </div>
        ) : filteredProviders.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#6B6558]">No professionals found matching your criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map((provider, index) => (
              <motion.div
                key={provider.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProviderCard provider={provider} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Providers;