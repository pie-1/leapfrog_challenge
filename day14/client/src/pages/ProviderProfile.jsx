import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, ShieldCheck, Clock, Calendar, Phone, Mail, ThumbsUp, MessageCircle, Briefcase, Wrench } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import API from '../utils/api';

const ProviderProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await API.get(`/providers/${id}`);
        setProvider(response.data);
      } catch (err) {
        console.error('Error fetching provider:', err);
        setError('Provider not found or unable to load');
        if (err.response?.status === 404) {
          setTimeout(() => navigate('/providers'), 2000);
        }
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchProvider();
    }
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBFAF6]">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#E8A33D]" />
        </div>
      </div>
    );
  }

  if (error || !provider) {
    return (
      <div className="min-h-screen bg-[#FBFAF6]">
        <Navbar />
        <div className="pt-32 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-[#6B6558]">{error || 'Professional not found'}</p>
          <Link to="/providers" className="text-[#E8A33D] hover:underline">Back to search</Link>
        </div>
      </div>
    );
  }

  // Safe access with fallbacks
  const providerName = provider?.userId?.name || provider?.name || 'Unknown Provider';
  const providerService = provider?.serviceType || provider?.service || 'Service Provider';
  const providerRating = provider?.rating || 0;
  const providerReviews = provider?.totalReviews || 0;
  const providerExperience = provider?.experience || 0;
  const providerLocation = provider?.userId?.address || provider?.location?.address || 'Location not set';
  const providerHourlyRate = provider?.hourlyRate || 0;
  const providerVerified = provider?.verified || false;
  const providerAvailability = provider?.availability === true ? 'Available Today' : 'Check Availability';
  const providerDescription = provider?.description || provider?.about || 'No description available';
  const providerSkills = provider?.tools || provider?.skills || [];
  const providerPhone = provider?.userId?.phone || provider?.phone || 'N/A';
  const providerEmail = provider?.userId?.email || provider?.email || 'N/A';

  return (
    <div className="min-h-screen bg-[#FBFAF6] font-['Inter']">
      <Navbar />

      <div className="pt-28 pb-16 max-w-5xl mx-auto px-6 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link to="/providers" className="text-sm text-[#6B6558] hover:text-[#1F3D2B] transition-colors">
            ← Back to professionals
          </Link>

          {/* Profile Header */}
          <div className="bg-white rounded-2xl border border-[#E4DFD1] p-6 md:p-8 mt-4">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-[#EFEADA] flex items-center justify-center text-3xl font-bold text-[#1F3D2B]">
                    {providerName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-[#1C1B18] font-['Space_Grotesk']">
                      {providerName}
                    </h1>
                    <div className="flex items-center gap-3 mt-1">
                      <p className="text-[#6B6558]">{providerService}</p>
                      {providerVerified && (
                        <span className="flex items-center gap-1 text-xs font-medium text-[#E8A33D]">
                          <ShieldCheck size={14} /> Verified
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-4">
                  <div className="flex items-center gap-1.5">
                    <Star size={18} className="text-[#F3B85E] fill-[#F3B85E]" />
                    <span className="font-semibold">{providerRating.toFixed(1)}</span>
                    <span className="text-sm text-[#6B6558]">({providerReviews} reviews)</span>
                  </div>
                  <span className="text-sm text-[#6B6558]">• {providerExperience} years experience</span>
                </div>

                <div className="flex items-center gap-4 mt-4">
                  <span className={`flex items-center gap-1.5 text-sm font-medium ${
                    providerAvailability === 'Available Today' ? 'text-[#2ECC71]' : 'text-[#F3B85E]'
                  }`}>
                    <Clock size={15} /> {providerAvailability}
                  </span>
                  <span className="text-sm text-[#6B6558]">• ₹{providerHourlyRate}/hr</span>
                </div>

                <div className="flex flex-wrap gap-3 mt-5">
                  <button className="px-6 py-2.5 bg-[#1F3D2B] text-white rounded-xl font-semibold hover:bg-[#2F5940] transition-colors">
                    Book Now
                  </button>
                  <button className="px-6 py-2.5 border border-[#E4DFD1] rounded-xl font-semibold text-[#1C1B18] hover:bg-[#EFEADA] transition-colors flex items-center gap-2">
                    <MessageCircle size={18} /> Message
                  </button>
                  {providerPhone !== 'N/A' && (
                    <a href={`tel:${providerPhone}`} className="px-6 py-2.5 border border-[#E4DFD1] rounded-xl font-semibold text-[#1C1B18] hover:bg-[#EFEADA] transition-colors flex items-center gap-2">
                      <Phone size={18} /> Call
                    </a>
                  )}
                </div>
              </div>

              <div className="md:text-right shrink-0">
                <div className="text-3xl font-bold text-[#1F3D2B] font-['Space_Grotesk']">
                  ₹{providerHourlyRate}
                </div>
                <p className="text-sm text-[#6B6558]">per hour</p>
                <p className="flex items-center justify-center md:justify-end gap-1 text-sm text-[#6B6558] mt-2">
                  <MapPin size={15} /> {providerLocation}
                </p>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="md:col-span-2 bg-white rounded-2xl border border-[#E4DFD1] p-6">
              <h2 className="font-semibold text-[#1C1B18] mb-3">About</h2>
              <p className="text-[#6B6558] leading-relaxed">{providerDescription}</p>

              {providerSkills.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold text-[#1C1B18] text-sm mb-2">Tools & Equipment</h3>
                  <div className="flex flex-wrap gap-2">
                    {providerSkills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-[#EFEADA] rounded-full text-sm text-[#1F3D2B]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-[#E4DFD1] p-6">
              <h2 className="font-semibold text-[#1C1B18] mb-3">Contact</h2>
              <div className="space-y-3 text-sm">
                {providerPhone !== 'N/A' && (
                  <div className="flex items-center gap-3 text-[#6B6558]">
                    <Phone size={16} className="text-[#1F3D2B]" />
                    <a href={`tel:${providerPhone}`} className="hover:text-[#1F3D2B] transition-colors">
                      {providerPhone}
                    </a>
                  </div>
                )}
                {providerEmail !== 'N/A' && (
                  <div className="flex items-center gap-3 text-[#6B6558]">
                    <Mail size={16} className="text-[#1F3D2B]" />
                    <a href={`mailto:${providerEmail}`} className="hover:text-[#1F3D2B] transition-colors">
                      {providerEmail}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-3 text-[#6B6558]">
                  <MapPin size={16} className="text-[#1F3D2B]" />
                  <span>{providerLocation}</span>
                </div>
              </div>

              <button className="w-full mt-4 py-2.5 bg-[#E8A33D] text-[#14251A] rounded-xl font-semibold hover:bg-[#D68F24] transition-colors">
                Request Quote
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default ProviderProfile;