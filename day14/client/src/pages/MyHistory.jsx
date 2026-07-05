import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle, XCircle, Calendar, Eye, RefreshCw, Star, AlertCircle } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import API from '../utils/api';
import { useAuth } from '../context/AuthContext';

const MyHistory = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await API.get('/bookings/my-bookings');
      setBookings(response.data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('Failed to load bookings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (filter === 'all') return true;
    return b.status === filter;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return { label: 'Completed', color: 'text-[#2ECC71] bg-[#2ECC71]/10', icon: CheckCircle };
      case 'cancelled':
        return { label: 'Cancelled', color: 'text-[#E74C3C] bg-[#E74C3C]/10', icon: XCircle };
      case 'pending':
        return { label: 'Pending', color: 'text-[#F3B85E] bg-[#F3B85E]/10', icon: Clock };
      case 'accepted':
        return { label: 'Accepted', color: 'text-[#3498DB] bg-[#3498DB]/10', icon: Clock };
      case 'in-progress':
        return { label: 'In Progress', color: 'text-[#9B59B6] bg-[#9B59B6]/10', icon: Clock };
      default:
        return { label: status, color: 'text-[#6B6558] bg-[#6B6558]/10', icon: Clock };
    }
  };

  // Calculate summary
  const totalSpent = bookings
    .filter(b => b.status === 'completed')
    .reduce((sum, b) => sum + (b.totalAmount || 0), 0);

  const completedCount = bookings.filter(b => b.status === 'completed').length;
  const pendingCount = bookings.filter(b => b.status === 'pending' || b.status === 'accepted').length;
  const avgRating = bookings
    .filter(b => b.rating)
    .reduce((sum, b) => sum + b.rating, 0) / (bookings.filter(b => b.rating).length || 1);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBFAF6] font-['Inter']">
        <Navbar />
        <div className="pt-32 flex justify-center items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#E8A33D]" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFAF6] font-['Inter']">
      <Navbar />

      <div className="pt-28 pb-16 max-w-5xl mx-auto px-6 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#1C1B18] font-['Space_Grotesk'] tracking-tight">
                My History
              </h1>
              <p className="text-[#6B6558] mt-1">
                {bookings.length} bookings total
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-[#6B6558] font-medium">Filter:</span>
              <div className="flex gap-1.5 flex-wrap">
                {['all', 'pending', 'accepted', 'in-progress', 'completed', 'cancelled'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors capitalize ${
                      filter === f
                        ? 'bg-[#1F3D2B] text-white'
                        : 'bg-white border border-[#E4DFD1] text-[#6B6558] hover:border-[#1F3D2B]'
                    }`}
                  >
                    {f === 'in-progress' ? 'In Progress' : f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3 text-red-600">
              <AlertCircle size={20} />
              <span>{error}</span>
              <button onClick={fetchBookings} className="ml-auto text-sm font-medium hover:underline">
                Retry
              </button>
            </div>
          )}

          {/* Bookings List */}
          {filteredBookings.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-[#E4DFD1]">
              <div className="text-4xl mb-4">📋</div>
              <p className="text-[#6B6558]">
                {filter !== 'all' ? `No ${filter} bookings found` : 'No bookings yet'}
              </p>
              <Link to="/providers" className="inline-block mt-4 text-[#E8A33D] hover:underline">
                Find a service →
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((booking) => {
                const StatusBadge = getStatusBadge(booking.status);
                return (
                  <motion.div
                    key={booking._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl border border-[#E4DFD1] p-6 hover:shadow-[0_4px_16px_-8px_rgba(20,37,26,0.12)] transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      {/* Left */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="font-semibold text-[#1C1B18] text-lg">
                            {booking.serviceType || booking.service}
                          </h3>
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${StatusBadge.color}`}>
                            <StatusBadge.icon size={12} />
                            {StatusBadge.label}
                          </span>
                        </div>
                        <p className="text-[#6B6558] text-sm mt-1">
                          {booking.providerId?.userId?.name || booking.providerName || 'Provider'} • {booking.address}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-[#6B6558]">
                          <span className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            {new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock size={14} />
                            {booking.time}
                          </span>
                          {booking.totalAmount && (
                            <span className="font-semibold text-[#1F3D2B]">
                              ₹{booking.totalAmount}
                            </span>
                          )}
                          {booking.rating && (
                            <span className="flex items-center gap-1 text-[#F3B85E]">
                              <Star size={14} className="fill-[#F3B85E]" />
                              {booking.rating}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button className="px-4 py-2 text-sm font-medium text-[#1F3D2B] border border-[#E4DFD1] rounded-lg hover:bg-[#EFEADA] transition-colors flex items-center gap-1.5">
                          <Eye size={15} /> Details
                        </button>
                        {booking.status === 'completed' && (
                          <button className="px-4 py-2 text-sm font-medium bg-[#1F3D2B] text-white rounded-lg hover:bg-[#2F5940] transition-colors flex items-center gap-1.5">
                            <RefreshCw size={15} /> Re-book
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Payment Summary */}
          {bookings.length > 0 && (
            <div className="mt-8 bg-white rounded-2xl border border-[#E4DFD1] p-6">
              <h3 className="font-semibold text-[#1C1B18] mb-3">Payment Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-[#6B6558] font-['IBM_Plex_Mono'] uppercase tracking-wider">Total Spent</p>
                  <p className="text-2xl font-bold text-[#1F3D2B] font-['Space_Grotesk']">₹{totalSpent}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6B6558] font-['IBM_Plex_Mono'] uppercase tracking-wider">Completed</p>
                  <p className="text-2xl font-bold text-[#2ECC71] font-['Space_Grotesk']">{completedCount}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6B6558] font-['IBM_Plex_Mono'] uppercase tracking-wider">Pending</p>
                  <p className="text-2xl font-bold text-[#F3B85E] font-['Space_Grotesk']">{pendingCount}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6B6558] font-['IBM_Plex_Mono'] uppercase tracking-wider">Avg. Rating</p>
                  <p className="text-2xl font-bold text-[#E8A33D] font-['Space_Grotesk']">{avgRating.toFixed(1)} ★</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default MyHistory;