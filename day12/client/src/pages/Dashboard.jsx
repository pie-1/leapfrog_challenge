import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { weddingService } from '../features/weddings/wedding.service';
import WeddingForm from '../components/WeddingForm';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [weddings, setWeddings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    upcoming: 0,
    budgetTotal: 0,
  });

  const fetchWeddings = async () => {
    try {
      const data = await weddingService.getAll();
      setWeddings(data);
      
      // Calculate stats
      const now = new Date();
      const upcoming = data.filter(w => new Date(w.date) > now);
      const totalBudget = data.reduce((sum, w) => sum + (w.budget?.total || 0), 0);
      
      setStats({
        total: data.length,
        upcoming: upcoming.length,
        budgetTotal: totalBudget,
      });
    } catch (error) {
      console.error('Failed to fetch weddings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeddings();
  }, []);

  const handleWeddingCreated = (newWedding) => {
    setShowForm(false);
    fetchWeddings(); // Refresh the list
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-rose-600">Loading your weddings...</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto px-6 py-10"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-rose-700">
          Welcome, {currentUser?.displayName || 'Couple'}! 👋
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-rose-600 text-white px-6 py-2 rounded-full hover:bg-rose-700 transition shadow-lg shadow-rose-200"
        >
          {showForm ? 'Cancel' : '+ Plan New Wedding'}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-white rounded-xl shadow-md border-l-4 border-rose-500">
          <h3 className="text-gray-600">Total Weddings</h3>
          <p className="text-3xl font-bold text-rose-600">{stats.total}</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-md border-l-4 border-amber-500">
          <h3 className="text-gray-600">Upcoming</h3>
          <p className="text-3xl font-bold text-amber-600">{stats.upcoming}</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-md border-l-4 border-emerald-500">
          <h3 className="text-gray-600">Total Budget</h3>
          <p className="text-3xl font-bold text-emerald-600">₹{stats.budgetTotal.toLocaleString()}</p>
        </div>
      </div>

      {/* Wedding Form */}
      {showForm && (
        <div className="mb-8">
          <WeddingForm onSuccess={handleWeddingCreated} />
        </div>
      )}

      {/* Wedding List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {weddings.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            <p className="text-lg">No weddings planned yet.</p>
            <p className="text-sm">Click "Plan New Wedding" to get started!</p>
          </div>
        ) : (
          weddings.map((wedding) => (
            <motion.div
              key={wedding._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="p-6">
                <h3 className="text-xl font-serif font-semibold text-gray-800 mb-2">
                  {wedding.title}
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Date:</span>{' '}
                    {new Date(wedding.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                  <p>
                    <span className="font-medium">Venue:</span> {wedding.venue}
                  </p>
                  {wedding.budget?.total > 0 && (
                    <p>
                      <span className="font-medium">Budget:</span> ₹{wedding.budget.total.toLocaleString()}
                    </p>
                  )}
                </div>
                {wedding.description && (
                  <p className="mt-3 text-gray-500 text-sm line-clamp-2">
                    {wedding.description}
                  </p>
                )}
                <div className="mt-4 flex gap-2">
                  <button className="text-rose-600 text-sm hover:text-rose-700 font-medium">
                    View Details
                  </button>
                  <button className="text-gray-400 text-sm hover:text-gray-600">
                    Edit
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}