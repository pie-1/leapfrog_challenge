export default function BudgetForm({ preferences, onChange, onOptimizeBudget, loading }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Total Budget (₹)</label>
        <input
          type="number"
          name="budget"
          value={preferences.budget}
          onChange={onChange}
          placeholder="e.g., 800000"
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
          placeholder="e.g., 250"
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
        onClick={onOptimizeBudget}
        disabled={loading}
        className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition disabled:opacity-50 font-medium"
      >
        💰 Optimize My Budget
      </button>
    </div>
  );
}