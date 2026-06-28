import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeftIcon, 
  CurrencyRupeeIcon,
  PlusIcon,
  TrashIcon,
  PencilIcon
} from '@heroicons/react/24/outline';
import { weddingService } from '../features/weddings/wedding.service';
import BudgetForm from '../components/BudgetForm';
import BudgetChart from '../components/BudgetChart';
import EmptyState from '../components/EmptyState';

const categories = [
  'Venue', 'Catering', 'Photography', 'Videography', 
  'Decorations', 'Music', 'Attire', 'Transport', 
  'Accommodation', 'Gifts', 'Invitations', 'Other'
];

export default function Budget() {
  const [weddings, setWeddings] = useState([]);
  const [selectedWedding, setSelectedWedding] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    fetchWeddings();
  }, []);

  const fetchWeddings = async () => {
    try {
      const data = await weddingService.getAll();
      setWeddings(data);
      if (data.length > 0) {
        setSelectedWedding(data[0]);
      }
    } catch (error) {
      console.error('Failed to fetch weddings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expenseData) => {
    try {
      const updated = await weddingService.addExpense(selectedWedding._id, expenseData);
      setSelectedWedding(updated);
      setShowForm(false);
      // Refresh wedding list
      const data = await weddingService.getAll();
      setWeddings(data);
    } catch (error) {
      console.error('Failed to add expense:', error);
    }
  };

  const handleRemoveExpense = async (index) => {
    if (window.confirm('Remove this expense?')) {
      try {
        const updated = await weddingService.removeExpense(selectedWedding._id, index);
        setSelectedWedding(updated);
        const data = await weddingService.getAll();
        setWeddings(data);
      } catch (error) {
        console.error('Failed to remove expense:', error);
      }
    }
  };

  const getCategoryTotal = (category) => {
    if (!selectedWedding?.budget?.expenses) return 0;
    return selectedWedding.budget.expenses
      .filter(e => e.category === category)
      .reduce((sum, e) => sum + e.amount, 0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-rose-600">Loading budget data...</div>
      </div>
    );
  }

  if (weddings.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-10">
        <Link to="/dashboard" className="inline-flex items-center text-gray-500 hover:text-rose-600 transition mb-4">
          <ArrowLeftIcon className="w-4 h-4 mr-1" />
          Back to Dashboard
        </Link>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <CurrencyRupeeIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h1 className="text-2xl font-serif text-gray-800">No weddings yet</h1>
          <p className="text-gray-500 mt-2">Plan your wedding to start tracking budget!</p>
        </div>
      </div>
    );
  }

  const totalBudget = selectedWedding?.budget?.total || 0;
  const totalSpent = selectedWedding?.budget?.spent || 0;
  const remaining = totalBudget - totalSpent;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto px-6 py-10"
    >
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div>
          <Link to="/dashboard" className="inline-flex items-center text-gray-500 hover:text-rose-600 transition mb-2">
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-serif text-gray-800">Budget Tracker</h1>
        </div>
        <div className="flex gap-3">
          {weddings.length > 1 && (
            <select
              value={selectedWedding?._id || ''}
              onChange={(e) => {
                const wedding = weddings.find(w => w._id === e.target.value);
                setSelectedWedding(wedding);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            >
              {weddings.map(w => (
                <option key={w._id} value={w._id}>{w.title}</option>
              ))}
            </select>
          )}
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition flex items-center gap-2"
          >
            <PlusIcon className="w-4 h-4" />
            Add Expense
          </button>
        </div>
      </div>

      {selectedWedding && (
        <>
          {/* Budget Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500">Total Budget</p>
              <p className="text-2xl font-bold text-emerald-600">₹{totalBudget.toLocaleString()}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500">Total Spent</p>
              <p className="text-2xl font-bold text-rose-600">₹{totalSpent.toLocaleString()}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500">Remaining</p>
              <p className={`text-2xl font-bold ${remaining >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                ₹{remaining.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Budget Chart */}
          {totalBudget > 0 && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
              <BudgetChart
                total={totalBudget}
                spent={totalSpent}
                expenses={selectedWedding.budget?.expenses || []}
              />
            </div>
          )}

          {/* Expenses List */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif text-lg text-gray-800">Expenses</h3>
              <span className="text-sm text-gray-500">
                {selectedWedding.budget?.expenses?.length || 0} entries
              </span>
            </div>

            {showForm && (
              <div className="mb-6">
                <BudgetForm 
                  onAdd={handleAddExpense} 
                  onCancel={() => setShowForm(false)} 
                />
              </div>
            )}

            {selectedWedding.budget?.expenses && selectedWedding.budget.expenses.length > 0 ? (
              <div className="space-y-3">
                {selectedWedding.budget.expenses.map((expense, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                  >
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
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
                      {expense.note && (
                        <p className="text-sm text-gray-500 mt-1">{expense.note}</p>
                      )}
                      {expense.date && (
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(expense.date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-gray-800">
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
                title="No expenses yet"
                message="Start tracking your wedding spending!"
              />
            )}
          </div>
        </>
      )}
    </motion.div>
  );
}