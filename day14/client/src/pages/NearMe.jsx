import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search, Loader, Filter } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import LocationMap from '../components/map/LocationMap';
import { useGeolocation } from '../hooks/useGeolocation';
import API from '../utils/api';

const NearMe = () => {
  const { location, loading: locationLoading, error: locationError } = useGeolocation();
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const categories = ['all', 'plumbing', 'electrician', 'cleaning', 'cooking', 'carpenter', 'painting', 'labour', 'driver'];

  useEffect(() => {
    if (location) {
      fetchNearbyProviders();
    }
  }, [location, selectedCategory]);

  const fetchNearbyProviders = async () => {
    try {
      setLoading(true);
      const params = {
        lat: location.lat,
        lng: location.lng,
        limit: 20,
      };
      if (selectedCategory !== 'all') params.category = selectedCategory;

      const response = await API.get('/providers/nearby', { params });
      setProviders(response.data || []);
    } catch (error) {
      console.error('Error fetching nearby providers:', error);
      setProviders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleProviderSelect = (provider) => {
    navigate(`/provider/${provider._id}`);
  };

  // Filter providers by search term
  const filteredProviders = providers.filter(provider => {
    const name = provider.userId?.name?.toLowerCase() || '';
    const service = provider.serviceType?.toLowerCase() || '';
    const search = searchTerm.toLowerCase();
    return name.includes(search) || service.includes(search);
  });

  if (locationLoading) {
    return (
      <div className="min-h-screen bg-[#FBFAF6]">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <Loader size={40} className="animate-spin text-[#E8A33D] mx-auto" />
            <p className="text-[#6B6558] mt-4">Getting your location...</p>
          </div>
        </div>
      </div>
    );
  }

  if (locationError) {
    return (
      <div className="min-h-screen bg-[#FBFAF6]">
        <Navbar />
        <div className="pt-32 text-center max-w-md mx-auto px-4">
          <div className="text-5xl mb-4">📍</div>
          <h2 className="text-xl font-bold text-[#1C1B18]">Location Access Required</h2>
          <p className="text-[#6B6558] mt-2">Please enable location access to see providers near you.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-[#E8A33D] text-[#14251A] rounded-xl font-semibold"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#1C1B18] font-['Space_Grotesk'] tracking-tight">
                Near Me
              </h1>
              <p className="text-[#6B6558] mt-1">
                {location && `Showing providers near your location`}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-[#E8A33D]" />
              <span className="text-sm text-[#6B6558]">
                {filteredProviders.length} providers nearby
              </span>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8371]" size={18} />
            <input
              type="text"
              placeholder="Search by name or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#E4DFD1] bg-white text-[#1C1B18] focus:outline-none focus:border-[#1F3D2B] transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
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

          {/* Map */}
          <LocationMap
            userLocation={location}
            providers={filteredProviders}
            onProviderSelect={handleProviderSelect}
          />

          {/* Provider List Below Map */}
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader size={24} className="animate-spin text-[#E8A33D]" />
            </div>
          ) : filteredProviders.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-2xl border border-[#E4DFD1] mt-6">
              <p className="text-[#6B6558]">No providers found nearby</p>
              {searchTerm && (
                <p className="text-sm text-[#6B6558] mt-1">Try adjusting your search</p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {filteredProviders.map((provider) => (
                <div
                  key={provider._id}
                  onClick={() => handleProviderSelect(provider)}
                  className="bg-white rounded-xl border border-[#E4DFD1] p-4 cursor-pointer hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#EFEADA] flex items-center justify-center font-bold text-[#1F3D2B]">
                      {provider.userId?.name?.charAt(0) || 'P'}
                    </div>
                    <div>
                      <p className="font-semibold text-[#1C1B18]">{provider.userId?.name || 'Provider'}</p>
                      <p className="text-sm text-[#6B6558]">{provider.serviceType}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-sm">
                    <span className="text-[#6B6558]">₹{provider.hourlyRate}/hr</span>
                    <span className={`text-xs ${provider.verified ? 'text-[#2ECC71]' : 'text-[#6B6558]'}`}>
                      {provider.verified ? '✓ Verified' : 'Unverified'}
                    </span>
                  </div>
                  {provider.distance && (
                    <div className="text-xs text-[#6B6558] mt-1">
                      📍 {provider.distance} km away
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default NearMe;