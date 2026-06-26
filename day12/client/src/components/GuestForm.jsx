import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function GuestForm({ onAdd, onUpdate, onCancel, editingGuest, editingIndex }) {
  const [guestData, setGuestData] = useState({
    name: '',
    email: '',
    phone: '',
    rsvp: 'pending',
    dietary: 'none',
    plusOne: false,
    note: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingGuest) {
      setGuestData(editingGuest);
    }
  }, [editingGuest]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGuestData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingGuest && editingIndex !== undefined) {
        await onUpdate(editingIndex, guestData);
      } else {
        await onAdd(guestData);
      }
      setGuestData({ name: '', email: '', phone: '', rsvp: 'pending', dietary: 'none', plusOne: false, note: '' });
    } catch (error) {
      console.error('Failed to save guest:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-amber-50/70 p-6 rounded-2xl border border-amber-100"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-serif text-gray-800">
          {editingGuest ? 'Edit Guest' : 'Add New Guest'}
        </h3>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 transition"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Guest Name *
            </label>
            <input
              type="text"
              name="name"
              value={guestData.name}
              onChange={handleChange}
              placeholder="Full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={guestData.email}
              onChange={handleChange}
              placeholder="guest@email.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={guestData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              RSVP Status
            </label>
            <select
              name="rsvp"
              value={guestData.rsvp}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="declined">Declined</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dietary Preference
            </label>
            <select
              name="dietary"
              value={guestData.dietary}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="none">None</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="gluten-free">Gluten Free</option>
              <option value="halal">Halal</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="flex items-center pt-6">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                name="plusOne"
                checked={guestData.plusOne}
                onChange={handleChange}
                className="w-4 h-4 text-amber-600 focus:ring-amber-500"
              />
              Bring a Plus One
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Note
          </label>
          <textarea
            name="note"
            value={guestData.note}
            onChange={handleChange}
            rows="2"
            placeholder="Special notes about this guest..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition disabled:opacity-50"
          >
            {loading ? 'Saving...' : editingGuest ? 'Update Guest' : 'Add Guest'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
}