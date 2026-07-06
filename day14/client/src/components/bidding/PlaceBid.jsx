import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, X } from 'lucide-react';
import API from '../../utils/api';

const PlaceBid = ({ jobId, onBidPlaced, onCancel }) => {
  const [formData, setFormData] = useState({
    amount: '',
    estimatedTime: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await API.post('/bids', {
        jobId,
        amount: parseFloat(formData.amount),
        estimatedTime: formData.estimatedTime,
        message: formData.message,
      });
      onBidPlaced();
      onCancel();
    } catch (err) {
      console.error('Error placing bid:', err);
      setError(err.response?.data?.error || 'Failed to place bid');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl border border-[#E4DFD1] p-6 mb-6"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-[#1C1B18] font-['Space_Grotesk']">Place a Bid</h3>
        <button onClick={onCancel} className="text-[#6B6558] hover:text-[#1C1B18]">
          <X size={20} />
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600 mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#1C1B18] mb-1.5">
            Your Bid Amount (NPR) *
          </label>
          <input
            type="number"
            name="amount"
            placeholder="e.g., 1200"
            value={formData.amount}
            onChange={handleChange}
            required
            min="1"
            className="w-full px-4 py-3 rounded-xl border border-[#E4DFD1] bg-[#FBFAF6] text-[#1C1B18] focus:outline-none focus:border-[#1F3D2B] transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1C1B18] mb-1.5">
            Estimated Time *
          </label>
          <input
            type="text"
            name="estimatedTime"
            placeholder="e.g., 2 hours, 1 day"
            value={formData.estimatedTime}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-[#E4DFD1] bg-[#FBFAF6] text-[#1C1B18] focus:outline-none focus:border-[#1F3D2B] transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1C1B18] mb-1.5">Message</label>
          <textarea
            name="message"
            placeholder="Why should the customer choose you?"
            rows="3"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-[#E4DFD1] bg-[#FBFAF6] text-[#1C1B18] focus:outline-none focus:border-[#1F3D2B] transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#1F3D2B] text-white rounded-xl font-semibold hover:bg-[#2F5940] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Send size={18} />
          {loading ? 'Placing Bid...' : 'Place Bid'}
        </button>
      </form>
    </motion.div>
  );
};

export default PlaceBid;