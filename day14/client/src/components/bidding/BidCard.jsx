import { motion } from 'framer-motion';
import { User, Star, Clock, DollarSign, CheckCircle, XCircle } from 'lucide-react';

const BidCard = ({ bid, isOwner, onAccept, onReject, accepting }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-[#E4DFD1] p-5 hover:shadow-[0_4px_16px_-8px_rgba(20,37,26,0.12)] transition-all"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left - Provider Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#EFEADA] flex items-center justify-center font-semibold text-[#1F3D2B]">
              {bid.providerId?.userId?.name?.charAt(0) || 'P'}
            </div>
            <div>
              <h4 className="font-semibold text-[#1C1B18]">
                {bid.providerId?.userId?.name || 'Provider'}
              </h4>
              <p className="text-sm text-[#6B6558]">{bid.providerId?.serviceType}</p>
            </div>
            {bid.providerId?.verified && (
              <span className="text-xs text-[#2ECC71] font-medium bg-[#2ECC71]/10 px-2 py-0.5 rounded-full">✓ Verified</span>
            )}
          </div>

          {/* Bid Details */}
          <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-[#6B6558]">
            <span className="flex items-center gap-1.5">
              <DollarSign size={14} className="text-[#1F3D2B]" />
              <span className="font-semibold text-[#1F3D2B]">₹{bid.amount}</span>
            </span>
            {bid.estimatedTime && (
              <span className="flex items-center gap-1.5">
                <Clock size={14} /> {bid.estimatedTime}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock size={14} /> {new Date(bid.createdAt).toLocaleDateString()}
            </span>
            <span className={`text-xs font-medium capitalize ${
              bid.status === 'pending' ? 'text-[#F3B85E]' :
              bid.status === 'accepted' ? 'text-[#2ECC71]' :
              'text-[#E74C3C]'
            }`}>
              {bid.status}
            </span>
          </div>

          {bid.message && (
            <p className="text-sm text-[#6B6558] mt-2 line-clamp-2">"{bid.message}"</p>
          )}
        </div>

        {/* Right - Actions */}
        {isOwner && bid.status === 'pending' && (
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onAccept(bid._id)}
              disabled={accepting}
              className="px-4 py-2 bg-[#2ECC71] text-white rounded-lg text-sm font-semibold hover:bg-[#27AE60] transition-colors disabled:opacity-50 flex items-center gap-1.5"
            >
              <CheckCircle size={16} />
              {accepting ? 'Accepting...' : 'Accept'}
            </button>
            <button
              onClick={() => onReject(bid._id)}
              className="px-4 py-2 border border-[#E4DFD1] text-[#6B6558] rounded-lg text-sm font-semibold hover:bg-[#EFEADA] transition-colors flex items-center gap-1.5"
            >
              <XCircle size={16} />
              Decline
            </button>
          </div>
        )}

        {bid.status === 'accepted' && (
          <span className="text-sm font-semibold text-[#2ECC71] flex items-center gap-1.5">
            <CheckCircle size={16} /> Accepted
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default BidCard;