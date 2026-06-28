import { motion } from 'framer-motion';

export default function BudgetChart({ total, spent, expenses = [] }) {
  const percentage = total > 0 ? Math.min((spent / total) * 100, 100) : 0;
  const remaining = Math.max(total - spent, 0);

  // Group expenses by category
  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  const categoryColors = {
    Venue: 'bg-purple-500',
    Catering: 'bg-orange-500',
    Photography: 'bg-blue-500',
    Videography: 'bg-indigo-500',
    Decorations: 'bg-pink-500',
    Music: 'bg-yellow-500',
    Attire: 'bg-red-500',
    Transport: 'bg-cyan-500',
    Accommodation: 'bg-teal-500',
    Gifts: 'bg-rose-500',
    Invitations: 'bg-amber-500',
    Other: 'bg-gray-500',
  };

  const sortedCategories = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a);

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">Budget Progress</span>
          <span className="font-medium text-gray-800">
            ₹{spent.toLocaleString()} / ₹{total.toLocaleString()}
          </span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={`h-full rounded-full transition-all ${
              percentage > 90 ? 'bg-red-500' :
              percentage > 70 ? 'bg-yellow-500' :
              'bg-emerald-500'
            }`}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0%</span>
          <span>{percentage.toFixed(0)}%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Remaining Budget */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-emerald-50 p-4 rounded-xl text-center">
          <p className="text-sm text-gray-600">Remaining</p>
          <p className="text-2xl font-bold text-emerald-600">
            ₹{remaining.toLocaleString()}
          </p>
        </div>
        <div className="bg-rose-50 p-4 rounded-xl text-center">
          <p className="text-sm text-gray-600">Spent</p>
          <p className="text-2xl font-bold text-rose-600">
            ₹{spent.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Category Breakdown */}
      {sortedCategories.length > 0 && (
        <div>
          <h4 className="font-medium text-gray-700 mb-3">Spending by Category</h4>
          <div className="space-y-2">
            {sortedCategories.map(([category, amount]) => {
              const catPercentage = total > 0 ? (amount / total) * 100 : 0;
              const color = categoryColors[category] || 'bg-gray-500';
              return (
                <div key={category}>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{category}</span>
                    <span className="font-medium text-gray-800">
                      ₹{amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(catPercentage, 100)}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className={`h-full rounded-full ${color}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}