export default function TimelineForm({ preferences, onChange, onGenerateTimeline, loading }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Wedding Date</label>
        <input
          type="date"
          name="weddingDate"
          value={preferences.weddingDate || ''}
          onChange={onChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
        <input
          type="number"
          name="guests"
          value={preferences.guests}
          onChange={onChange}
          placeholder="e.g., 200"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <input
          type="text"
          name="location"
          value={preferences.location}
          onChange={onChange}
          placeholder="e.g., Mumbai"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
        />
      </div>
      <button
        onClick={onGenerateTimeline}
        disabled={loading}
        className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 rounded-lg hover:from-amber-700 hover:to-amber-800 transition disabled:opacity-50 font-medium"
      >
        📅 Generate Timeline
      </button>
    </div>
  );
}