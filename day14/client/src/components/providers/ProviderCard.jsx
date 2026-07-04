import { Link } from 'react-router-dom';
import { Star, MapPin, ShieldCheck, Clock } from 'lucide-react';

const ProviderCard = ({ provider }) => {
  const getAvailabilityColor = (status) => {
    if (status === 'Available Today') return 'text-[#2ECC71]';
    if (status === 'Tomorrow') return 'text-[#F3B85E]';
    return 'text-[#E74C3C]';
  };

  return (
    <Link to={`/provider/${provider.id}`} className="group block">
      <div className="bg-white rounded-2xl border border-[#E4DFD1] p-6 transition-all duration-200 hover:shadow-[0_8px_24px_-8px_rgba(20,37,26,0.15)] hover:-translate-y-1">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#EFEADA] flex items-center justify-center text-2xl font-bold text-[#1F3D2B]">
              {provider.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold text-[#1C1B18] font-['Space_Grotesk']">
                {provider.name}
              </h3>
              <p className="text-sm text-[#6B6558]">{provider.service}</p>
            </div>
          </div>
          {provider.verified && (
            <ShieldCheck size={18} className="text-[#E8A33D] shrink-0" />
          )}
        </div>

        {/* Rating & Experience */}
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-1.5">
            <Star size={15} className="text-[#F3B85E] fill-[#F3B85E]" />
            <span className="font-semibold text-[#1C1B18]">{provider.rating}</span>
            <span className="text-sm text-[#6B6558]">({provider.reviews})</span>
          </div>
          <span className="text-sm text-[#6B6558]">• {provider.experience} yrs exp</span>
        </div>

        {/* Location & Rate */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1.5 text-sm text-[#6B6558]">
            <MapPin size={15} />
            {provider.location} • {provider.distance}
          </div>
          <span className="font-semibold text-[#1F3D2B]">
            ₹{provider.hourlyRate}
            <span className="text-sm text-[#6B6558] font-normal">/hr</span>
          </span>
        </div>

        {/* Availability */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#E4DFD1]">
          <div className={`flex items-center gap-1.5 text-sm font-medium ${getAvailabilityColor(provider.availability)}`}>
            <Clock size={14} />
            {provider.availability}
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