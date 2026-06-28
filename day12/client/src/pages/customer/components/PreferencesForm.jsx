export default function PreferencesForm({ preferences, onChange, onGetRecommendations, loading }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Budget (₹)</label>
        <input
          type="number"
          name="budget"
          value={preferences.budget}
          onChange={onChange}
          placeholder="e.g., 500000"
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
          placeholder="e.g., Mumbai, Delhi"
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
        <label className="block text-sm font-medium text-gray-700 mb-1">Wedding Style</label>
        <select
          name="style"
          value={preferences.style}
          onChange={onChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
        >
          <option value="">Select style</option>
          <option value="Traditional">Traditional</option>
          <option value="Modern">Modern</option>
          <option value="Fusion">Fusion</option>
          <option value="Destination">Destination</option>
          <option value="Intimate">Intimate</option>
          <option value="Luxury">Luxury</option>
          <option value="Budget">Budget</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Vendor Category</label>
        <select
          name="category"
          value={preferences.category}
          onChange={onChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
        >
          <option value="All">All Categories</option>
          <option value="Venue">Venue</option>
          <option value="Hotel">Hotel</option>
          <option value="Photographer">Photographer</option>
          <option value="Catering">Catering</option>
          <option value="Decorations">Decorations</option>
          <option value="Music">Music</option>
          <option value="Attire">Attire</option>
          <option value="Makeup">Makeup</option>
          <option value="Event Planner">Event Planner</option>
        </select>
      </div>

      <button
        onClick={onGetRecommendations}
        disabled={loading}
        className="w-full bg-gradient-to-r from-rose-600 to-rose-700 text-white py-3 rounded-lg hover:from-rose-700 hover:to-rose-800 transition disabled:opacity-50 font-medium"
      >
        🤖 Get AI Recommendations
      </button>
    </div>
  );
}