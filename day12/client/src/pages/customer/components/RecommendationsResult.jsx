import { motion } from 'framer-motion';

export default function RecommendationsResult({ recommendations }) {
  if (!recommendations) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🌟</span>
        <h2 className="font-serif text-lg text-gray-800">AI Recommendations</h2>
        <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
          Grok AI
        </span>
      </div>

      {recommendations.summary && (
        <p className="text-sm text-gray-600 mb-4">{recommendations.summary}</p>
      )}

      {recommendations.recommendations && recommendations.recommendations.length > 0 ? (
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
          {recommendations.recommendations.map((vendor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">
                    {vendor.vendorName || vendor.name || 'Vendor'}
                  </h4>
                  <p className="text-sm text-gray-500">{vendor.category || 'Unknown category'}</p>
                  {vendor.matchScore && (
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full"
                          style={{ width: `${vendor.matchScore}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-rose-600">{vendor.matchScore}%</span>
                    </div>
                  )}
                  {vendor.estimatedPrice && (
                    <span className="text-sm font-medium text-emerald-600">
                      ₹{vendor.estimatedPrice.toLocaleString()}
                    </span>
                  )}
                  {vendor.reasoning && (
                    <p className="text-sm text-gray-500 mt-1">{vendor.reasoning}</p>
                  )}
                  {vendor.whyItWorks && (
                    <p className="text-xs text-gray-400 mt-1">✨ {vendor.whyItWorks}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">No recommendations available</p>
      )}

      {recommendations.budgetAdvice && (
        <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-100">
          <p className="text-sm text-amber-700 font-medium">💡 Budget Advice:</p>
          <p className="text-sm text-amber-600">{recommendations.budgetAdvice}</p>
        </div>
      )}
    </motion.div>
  );
}