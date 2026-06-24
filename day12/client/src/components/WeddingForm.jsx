import { useState } from 'react';
import { motion } from 'framer-motion';
import { weddingService } from '../features/weddings/wedding.service';

export default function WeddingForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    venue: '',
    description: '',
    budget: { total: 0, spent: 0 },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Convert date string to Date object
      const weddingData = {
        ...formData,
        date: new Date(formData.date),
        budget: {
          total: parseFloat(formData.budget?.total) || 0,
          spent: 0,
        },
      };

      const result = await weddingService.create(weddingData);
      setFormData({ title: '', date: '', venue: '', description: '', budget: { total: 0, spent: 0 } });
      if (onSuccess) onSuccess(result);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create wedding');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-2xl shadow-lg max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-serif text-gray-800 mb-4">Plan Your Wedding</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Wedding Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Our Dream Wedding"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Wedding Date *
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Venue *
          </label>
          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            placeholder="e.g., Grand Palace, Mumbai"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Tell us about your dream wedding..."
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Total Budget (₹)
          </label>
          <input
            type="number"
            name="budget.total"
            value={formData.budget?.total || 0}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              budget: { ...prev.budget, total: parseFloat(e.target.value) || 0 }
            }))}
            placeholder="e.g., 500000"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          />
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-rose-600 text-white py-3 rounded-lg hover:bg-rose-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating...' : 'Create Wedding'}
        </button>
      </form>
    </motion.div>
  );
}