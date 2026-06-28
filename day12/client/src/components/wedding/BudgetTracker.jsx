import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, TrashIcon, CurrencyRupeeIcon } from '@heroicons/react/24/outline';
import { weddingService } from '../../features/weddings/wedding.service';
import BudgetForm from '../BudgetForm';
import BudgetChart from '../BudgetChart';
import EmptyState from '../EmptyState';

export default function BudgetTracker({ wedding, weddingId, setWedding }) {
  const [showForm, setShowForm] = useState(false);

  const handleAddExpense = async (expenseData) => {
    try {
      const updated = await weddingService.addExpense(weddingId, expenseData);
      setWedding(updated);
      setShowForm(false);
    } catch (error) {
      console.error('Failed to add expense:', error);
    }
  };

  const handleRemoveExpense = async (index) => {
    if (window.confirm('Remove this expense?')) {
      try {
        const updated = await weddingService.removeExpense(weddingId, index);
        setWedding(updated);
      } catch (error) {
        console.error('Failed to remove expense:', error);
      }
    }
  };

  const hasExpenses = wedding.budget?.expenses && wedding.budget.expenses.length > 0;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <CurrencyRupeeIcon className="w-5 h-5 text-emerald-600" />
          <h3 className="font-serif text-lg text-gray-800">Budget</h3>
          {hasExpenses && (
            <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-medium">
              {wedding.budget.expenses.length}
            </span>
          )}
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition text-sm"
        >
          <PlusIcon className="w-4 h-4 mr-1" />
          Add Expense
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <div className="mb-6">
            <BudgetForm onAdd={handleAddExpense} onCancel={() => setShowForm(false)} />
          </div>
        )}
      </AnimatePresence>

      {wedding.budget?.total > 0 && (
        <div className="mb-6">
          <BudgetChart
            total={wedding.budget.total}
            spent={wedding.budget.spent || 0}
            expenses={wedding.budget.expenses || []}
          />
        </div>
      )}

      {hasExpenses ? (
        <div className="space-y-2">
          {wedding.budget.expenses.map((expense, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-sm transition"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-800">{expense.description}</span>
                  <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                    {expense.category}
                  </span>
                  {expense.paid && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      Paid
                    </span>
                  )}
                </div>
                {expense.note && <p className="text-xs text-gray-400">{expense.note}</p>}
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-800">
                  ₹{expense.amount.toLocaleString()}
                </span>
                <button
                  onClick={() => handleRemoveExpense(index)}
                  className="text-red-400 hover:text-red-600 transition"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={CurrencyRupeeIcon}
          title="No expenses added yet."
          message="Track your wedding spending here!"
        />
      )}
    </div>
  );
}