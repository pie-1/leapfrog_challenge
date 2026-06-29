import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

const categories = [
  'Venue',
  'Catering',
  'Photography',
  'Videography',
  'Decorations',
  'Music',
  'Attire',
  'Transport',
  'Accommodation',
  'Gifts',
  'Invitations',
  'Other',
];

export default function BudgetForm({ onAdd, onCancel, editingExpense }) {
  const [expenseData, setExpenseData] = useState({
    description: '',
    amount: 0,
    category: 'Other',
    date: '',
    paid: false,
    note: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingExpense) {
      setExpenseData({
        description: editingExpense.description || '',
        amount: editingExpense.amount || 0,
        category: editingExpense.category || 'Other',
        date: editingExpense.date || '',
        paid: editingExpense.paid || false,
        note: editingExpense.note || '',
      });
    }
  }, [editingExpense]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setExpenseData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!expenseData.description || expenseData.amount <= 0) {
      alert('Please enter a description and valid amount');
      return;
    }
    setLoading(true);
    try {
      await onAdd(expenseData);
      if (!editingExpense) {
        setExpenseData({
          description: '',
          amount: 0,
          category: 'Other',
          date: '',
          paid: false,
          note: '',
        });
      }
    } catch (error) {
      console.error('Failed to save expense:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-emerald-50/70 p-6 rounded-2xl border border-emerald-100"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-serif text-gray-800">
          {editingExpense ? 'Edit Expense' : 'Add Expense'}
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
              Description *
            </label>
            <input
              type="text"
              name="description"
              value={expenseData.description}
              onChange={handleChange}
              placeholder="e.g., Catering deposit"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount (₹) *
            </label>
            <input
              type="number"
              name="amount"
              value={expenseData.amount}
              onChange={handleChange}
              placeholder="50000"
              min="0"
              step="1000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={expenseData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={expenseData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Note
          </label>
          <textarea
            name="note"
            value={expenseData.note}
            onChange={handleChange}
            rows="2"
            placeholder="Additional details..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="paid"
            checked={expenseData.paid}
            onChange={handleChange}
            className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
          />
          <label className="text-sm text-gray-700">Already paid</label>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition disabled:opacity-50"
          >
            {loading ? 'Saving...' : editingExpense ? 'Update Expense' : 'Add Expense'}
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