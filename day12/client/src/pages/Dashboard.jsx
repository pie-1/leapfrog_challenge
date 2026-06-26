import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CalendarIcon, 
  PencilIcon, 
  TrashIcon,
  EyeIcon,
  UserGroupIcon 
} from '@heroicons/react/24/outline';
import { weddingService } from '../features/weddings/wedding.service';
import WeddingForm from '../components/WeddingForm';
import WeddingSkeleton from '../components/WeddingSkeleton';

// Animated number component for stats
function AnimatedNumber({ value, suffix = '' }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 30;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  return <>{displayValue}{suffix}</>;
}

export default function Dashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [weddings, setWeddings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingWedding, setEditingWedding] = useState(null);
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
    setEditingWedding(null);
    fetchWeddings();
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await weddingService.delete(id);
        fetchWeddings();
      } catch (error) {
        console.error('Failed to delete wedding:', error);
        alert('Failed to delete wedding. Please try again.');
      }
    }
  };

  const handleEdit = (wedding) => {
    setEditingWedding(wedding);
    setShowForm(true);
    document.getElementById('wedding-form')?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  };

  const handleCancelEdit = () => {
    setEditingWedding(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <WeddingSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto px-6 py-10"
    >
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <h1 className="text-3xl font-serif text-rose-700">
          Welcome, {currentUser?.displayName || 'Couple'}! 👋
        </h1>
        <button
          onClick={() => {
            if (showForm && !editingWedding) {
              setShowForm(false);
            } else {
              setEditingWedding(null);
              setShowForm(!showForm);
            }
          }}
          className="bg-rose-600 text-white px-6 py-2 rounded-full hover:bg-rose-700 transition shadow-lg shadow-rose-200"
        >
          {showForm ? 'Cancel' : '+ Plan New Wedding'}
        </button>
      </div>

      {/* Stats with animated numbers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="p-6 bg-white rounded-xl shadow-md border-l-4 border-rose-500"
        >
          <h3 className="text-gray-600">Total Weddings</h3>
          <p className="text-3xl font-bold text-rose-600">
            <AnimatedNumber value={stats.total} />
          </p>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="p-6 bg-white rounded-xl shadow-md border-l-4 border-amber-500"
        >
          <h3 className="text-gray-600">Upcoming</h3>
          <p className="text-3xl font-bold text-amber-600">
            <AnimatedNumber value={stats.upcoming} />
          </p>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="p-6 bg-white rounded-xl shadow-md border-l-4 border-emerald-500"
        >
          <h3 className="text-gray-600">Total Budget</h3>
          <p className="text-3xl font-bold text-emerald-600">
            ₹<AnimatedNumber value={stats.budgetTotal} />
          </p>
        </motion.div>
      </div>

      {/* Wedding Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div 
            id="wedding-form"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <WeddingForm 
              onSuccess={handleWeddingCreated}
              editingWedding={editingWedding}
              onCancel={handleCancelEdit}
            />
          </motion.div>
        )}
      </AnimatePresence>

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
                
                {/* ✅ Event count badge */}
                {wedding.events && wedding.events.length > 0 && (
                  <div className="mt-2 flex items-center gap-1 text-xs text-rose-600">
                    <CalendarIcon className="w-3 h-3" />
                    <span>{wedding.events.length} event{wedding.events.length > 1 ? 's' : ''} planned</span>
                  </div>
                )}

                {/* ✅ Guest count badge */}
                {wedding.guests && wedding.guests.length > 0 && (
                  <div className="mt-1 flex items-center gap-1 text-xs text-amber-600">
                    <UserGroupIcon className="w-3 h-3" />
                    <span>{wedding.guests.length} guest{wedding.guests.length > 1 ? 's' : ''} invited</span>
                  </div>
                )}

                {/* Action buttons */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    to={`/wedding/${wedding._id}`}
                    className="inline-flex items-center text-rose-600 text-sm hover:text-rose-700 font-medium transition"
                  >
                    <EyeIcon className="w-4 h-4 mr-1" />
                    View Details
                  </Link>
                  <button
                    onClick={() => handleEdit(wedding)}
                    className="inline-flex items-center text-gray-500 text-sm hover:text-gray-700 transition"
                  >
                    <PencilIcon className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(wedding._id, wedding.title)}
                    className="inline-flex items-center text-red-400 text-sm hover:text-red-600 transition"
                  >
                    <TrashIcon className="w-4 h-4 mr-1" />
                    Delete
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