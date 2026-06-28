import { motion } from 'framer-motion';

export default function BudgetOptimizationResult({ budgetOptimization, totalBudget }) {
  if (!budgetOptimization) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">💰</span>
        <h2 className="font-serif text-lg text-gray-800">Budget Optimization</h2>
        <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
          AI Powered
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-emerald-50 p-3 rounded-xl">
          <p className="text-sm text-gray-500">Total Budget</p>
          <p className="text-xl font-bold text-emerald-600">
            ₹{totalBudget?.toLocaleString()}
          </p>
        </div>
        <div className="bg-rose-50 p-3 rounded-xl">
          <p className="text-sm text-gray-500">Estimated Total</p>
          <p className="text-xl font-bold text-rose-600">
            ₹{budgetOptimization.totalEstimated?.toLocaleString()}
          </p>
        </div>
      </div>

      {budgetOptimization.allocation && (
        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          <p className="font-medium text-gray-700">Recommended Allocation:</p>
          {Object.entries(budgetOptimization.allocation).map(([category, amount]) => (
            <div key={category} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">{category}</span>
              <span className="font-medium text-gray-800">₹{amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      )}

      {budgetOptimization.savingsTips && budgetOptimization.savingsTips.length > 0 && (
        <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-100">
          <p className="text-sm text-amber-700 font-medium mb-1">💡 Savings Tips:</p>
          <ul className="text-xs text-amber-600 space-y-1">
            {budgetOptimization.savingsTips.map((tip, i) => (
              <li key={i}>• {tip}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-3 grid grid-cols-2 gap-2">
        {budgetOptimization.splurgeRecommendations && (
          <div className="p-2 bg-purple-50 rounded-lg border border-purple-100">
            <p className="text-xs text-purple-700 font-medium">Splurge On:</p>
            <p className="text-xs text-purple-600">{budgetOptimization.splurgeRecommendations.join(', ')}</p>
          </div>
        )}
        {budgetOptimization.saveRecommendations && (
          <div className="p-2 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-xs text-blue-700 font-medium">Save On:</p>
            <p className="text-xs text-blue-600">{budgetOptimization.saveRecommendations.join(', ')}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}