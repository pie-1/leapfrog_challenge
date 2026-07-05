import { Link } from 'react-router-dom';
import { Star, MapPin, ShieldCheck, Clock } from 'lucide-react';

const ProviderCard = ({ provider }) => {
  // Safe access with fallbacks
  const providerName = provider?.userId?.name || provider?.name || 'Unknown Provider';
  const providerService = provider?.serviceType || provider?.service || 'Service Provider';
  const providerRating = provider?.rating || 0;
  const providerReviews = provider?.totalReviews || 0;
  const providerExperience = provider?.experience || 0;
  const providerLocation = provider?.userId?.address || provider?.location?.address || 'Location not set';
  const providerDistance = provider?.distance || 'N/A';
  const providerHourlyRate = provider?.hourlyRate || 0;
  const providerVerified = provider?.verified || false;
  const providerAvailability = provider?.availability === true ? 'Available Today' : 'Check Availability';
  const providerId = provider?._id || provider?.id;

  const getAvailabilityColor = (status) => {
    if (status === 'Available Today') return 'text-[#2ECC71]';
    if (status === 'Tomorrow') return 'text-[#F3B85E]';
    return 'text-[#6B6558]';
  };

  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return '?';
    return name.charAt(0).toUpperCase();
  };

  return (
    <Link to={`/provider/${providerId}`} className="group block">
      <div className="bg-white rounded-2xl border border-[#E4DFD1] p-6 transition-all duration-200 hover:shadow-[0_8px_24px_-8px_rgba(20,37,26,0.15)] hover:-translate-y-1">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#EFEADA] flex items-center justify-center text-2xl font-bold text-[#1F3D2B]">
              {getInitials(providerName)}
            </div>
            <div>
              <h3 className="font-semibold text-[#1C1B18] font-['Space_Grotesk']">
                {providerName}
              </h3>
              <p className="text-sm text-[#6B6558]">{providerService}</p>
            </div>
          </div>
          {providerVerified && (
            <ShieldCheck size={18} className="text-[#E8A33D] shrink-0" />
          )}
        </div>

        {/* Rating & Experience */}
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-1.5">
            <Star size={15} className="text-[#F3B85E] fill-[#F3B85E]" />
            <span className="font-semibold text-[#1C1B18]">{providerRating.toFixed(1)}</span>
            <span className="text-sm text-[#6B6558]">({providerReviews})</span>
          </div>
          <span className="text-sm text-[#6B6558]">• {providerExperience} yrs exp</span>
        </div>

        {/* Location & Rate */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1.5 text-sm text-[#6B6558]">
            <MapPin size={15} />
            {providerLocation} • {providerDistance}
          </div>
          <span className="font-semibold text-[#1F3D2B]">
            ₹{providerHourlyRate}
            <span className="text-sm text-[#6B6558] font-normal">/hr</span>
          </span>
        </div>

        {/* Availability */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#E4DFD1]">
          <div className={`flex items-center gap-1.5 text-sm font-medium ${getAvailabilityColor(providerAvailability)}`}>
            <Clock size={14} />
            {providerAvailability}
          </div>
          <button className="px-4 py-2 bg-[#1F3D2B] text-white rounded-lg text-sm font-semibold hover:bg-[#2F5940] transition-colors">
            Book Now
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProviderCard;
