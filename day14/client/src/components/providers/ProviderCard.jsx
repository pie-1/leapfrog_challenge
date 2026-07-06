import { Link, useNavigate } from 'react-router-dom';
import { Star, MapPin, ShieldCheck, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import API from '../../utils/api';

const ProviderCard = ({ provider }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const providerName = provider?.userId?.name || provider?.name || 'Unknown Provider';
  const providerService = provider?.serviceType || provider?.service || 'Service Provider';
  const providerRating = provider?.rating || 0;
  const providerReviews = provider?.totalReviews || 0;
  const providerExperience = provider?.experience || 0;
  const providerLocation = provider?.userId?.address || provider?.location?.address || 'Location not set';
  const providerHourlyRate = provider?.hourlyRate || 0;
  const providerVerified = provider?.verified || false;
  const providerId = provider?._id || provider?.id;

  const getInitials = (name) => {
    if (!name) return '?';
    return name.charAt(0).toUpperCase();
  };

  const handleBookNow = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const bookingData = {
        serviceType: providerService,
        date: new Date().toISOString().split('T')[0],
        time: '09:00',
        address: providerLocation,
        description: `Booking with ${providerName} for ${providerService}`,
        totalAmount: providerHourlyRate * 2,
        providerId: providerId,
      };

      const response = await API.post('/bookings', bookingData);
      if (response.data.success) {
        alert('✅ Booking created successfully!');
        navigate('/my-history');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking. Please try again.');
    }
  };

  const handleViewProfile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/provider/${providerId}`);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E4DFD1] p-6 transition-all duration-200 hover:shadow-[0_8px_24px_-8px_rgba(20,37,26,0.15)] hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#EFEADA] flex items-center justify-center text-2xl font-bold text-[#1F3D2B]">
            {getInitials(providerName)}
          </div>
          <div>
            <h3 className="font-semibold text-[#1C1B18] font-['Space_Grotesk']">{providerName}</h3>
            <p className="text-sm text-[#6B6558]">{providerService}</p>
          </div>
        </div>
        {providerVerified && <ShieldCheck size={18} className="text-[#E8A33D] shrink-0" />}
      </div>

      <div className="flex items-center gap-4 mt-3">
        <div className="flex items-center gap-1.5">
          <Star size={15} className="text-[#F3B85E] fill-[#F3B85E]" />
          <span className="font-semibold text-[#1C1B18]">{providerRating.toFixed(1)}</span>
          <span className="text-sm text-[#6B6558]">({providerReviews})</span>
        </div>
        <span className="text-sm text-[#6B6558]">• {providerExperience} yrs exp</span>
      </div>

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-1.5 text-sm text-[#6B6558]">
          <MapPin size={15} /> {providerLocation}
        </div>
        <span className="font-semibold text-[#1F3D2B]">₹{providerHourlyRate}<span className="text-sm text-[#6B6558] font-normal">/hr</span></span>
      </div>

      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[#E4DFD1]">
        <button
          onClick={handleBookNow}
          className="flex-1 px-4 py-2 bg-[#1F3D2B] text-white rounded-lg text-sm font-semibold hover:bg-[#2F5940] transition-colors"
        >
          Book Now
        </button>
        <button
          onClick={handleViewProfile}
          className="px-4 py-2 border border-[#E4DFD1] text-[#6B6558] rounded-lg text-sm font-semibold hover:bg-[#EFEADA] transition-colors"
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default ProviderCard;