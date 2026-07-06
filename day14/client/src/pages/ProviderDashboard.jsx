import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Users, CheckCircle, XCircle, AlertCircle, Briefcase } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import API from '../utils/api';
import { useAuth } from '../context/AuthContext';

const ProviderDashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    accepted: 0,
    inProgress: 0,
    completed: 0,
    cancelled: 0,
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await API.get('/bookings/provider-bookings');
      setBookings(response.data);
      calculateStats(response.data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('Failed to load bookings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const total = data.length;
    const pending = data.filter(b => b.status === 'pending').length;
    const accepted = data.filter(b => b.status === 'accepted').length;
    const inProgress = data.filter(b => b.status === 'in-progress').length;
    const completed = data.filter(b => b.status === 'completed').length;
    const cancelled = data.filter(b => b.status === 'cancelled').length;
    setStats({ total, pending, accepted, inProgress, completed, cancelled });
  };

  const updateStatus = async (bookingId, newStatus) => {
    try {
      await API.put(`/bookings/${bookingId}/status`, { status: newStatus });
      fetchBookings(); // Refresh
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update booking status');
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (filter === 'all') return true;
    return b.status === filter;
  });

  const getStatusBadge = (status) => {
    const styles = {
      pending: { label: 'Pending', color: 'text-[#F3B85E] bg-[#F3B85E]/10' },
      accepted: { label: 'Accepted', color: 'text-[#3498DB] bg-[#3498DB]/10' },
      'in-progress': { label: 'In Progress', color: 'text-[#9B59B6] bg-[#9B59B6]/10' },
      completed: { label: 'Completed', color: 'text-[#2ECC71] bg-[#2ECC71]/10' },
      cancelled: { label: 'Cancelled', color: 'text-[#E74C3C] bg-[#E74C3C]/10' },
    };
    return styles[status] || styles.pending;
  };

  const getStatusActions = (booking) => {
    if (booking.status === 'pending') {
      return (
        <div className="flex gap-2">
          <button
            onClick={() => updateStatus(booking._id, 'accepted')}
            className="px-3 py-1.5 bg-[#2ECC71] text-white rounded-lg text-xs font-medium hover:bg-[#27AE60] transition-colors"
          >
            Accept
          </button>
          <button
            onClick={() => updateStatus(booking._id, 'cancelled')}
            className="px-3 py-1.5 bg-[#E74C3C] text-white rounded-lg text-xs font-medium hover:bg-[#C0392B] transition-colors"
          >
            Decline
          </button>
        </div>
      );
    }
    if (booking.status === 'accepted') {
      return (
        <button
          onClick={() => updateStatus(booking._id, 'in-progress')}
          className="px-3 py-1.5 bg-[#3498DB] text-white rounded-lg text-xs font-medium hover:bg-[#2980B9] transition-colors"
        >
          Start Work
        </button>
      );
    }
    if (booking.status === 'in-progress') {
      return (
        <button
          onClick={() => updateStatus(booking._id, 'completed')}
          className="px-3 py-1.5 bg-[#2ECC71] text-white rounded-lg text-xs font-medium hover:bg-[#27AE60] transition-colors"
        >
          Mark Complete
        </button>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBFAF6]">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#E8A33D]" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFAF6] font-['Inter']">
      <Navbar />

      <div className="pt-28 pb-16 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#1C1B18] font-['Space_Grotesk'] tracking-tight">
                Provider Dashboard
              </h1>
              <p className="text-[#6B6558] mt-1">
                Manage your bookings and services
              </p>
            </div>
            <Link
              to="/providers"
              className="px-4 py-2 bg-[#1F3D2B] text-white rounded-xl text-sm font-semibold hover:bg-[#2F5940] transition-colors"
            >
              View Public Profile
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-[#E4DFD1] p-4">
              <p className="text-xs text-[#6B6558] font-['IBM_Plex_Mono'] uppercase tracking-wider">Total</p>
              <p className="text-2xl font-bold text-[#1F3D2B] font-['Space_Grotesk']">{stats.total}</p>
            </div>
            <div className="bg-white rounded-xl border border-[#E4DFD1] p-4">
              <p className="text-xs text-[#6B6558] font-['IBM_Plex_Mono'] uppercase tracking-wider">Pending</p>
              <p className="text-2xl font-bold text-[#F3B85E] font-['Space_Grotesk']">{stats.pending}</p>
            </div>
            <div className="bg-white rounded-xl border border-[#E4DFD1] p-4">
              <p className="text-xs text-[#6B6558] font-['IBM_Plex_Mono'] uppercase tracking-wider">In Progress</p>
              <p className="text-2xl font-bold text-[#3498DB] font-['Space_Grotesk']">{stats.inProgress}</p>
            </div>
            <div className="bg-white rounded-xl border border-[#E4DFD1] p-4">
              <p className="text-xs text-[#6B6558] font-['IBM_Plex_Mono'] uppercase tracking-wider">Completed</p>
              <p className="text-2xl font-bold text-[#2ECC71] font-['Space_Grotesk']">{stats.completed}</p>
            </div>
            <div className="bg-white rounded-xl border border-[#E4DFD1] p-4">
              <p className="text-xs text-[#6B6558] font-['IBM_Plex_Mono'] uppercase tracking-wider">Cancelled</p>
              <p className="text-2xl font-bold text-[#E74C3C] font-['Space_Grotesk']">{stats.cancelled}</p>
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

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {['all', 'pending', 'accepted', 'in-progress', 'completed', 'cancelled'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                  filter === f
                    ? 'bg-[#1F3D2B] text-white'
                    : 'bg-white border border-[#E4DFD1] text-[#6B6558] hover:border-[#1F3D2B]'
                }`}
              >
                {f === 'in-progress' ? 'In Progress' : f}
              </button>
            ))}
          </div>

          {/* Bookings List */}
          {filteredBookings.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-[#E4DFD1]">
              <Briefcase size={48} className="mx-auto text-[#6B6558] opacity-50" />
              <p className="text-[#6B6558] mt-4">
                {filter !== 'all' ? `No ${filter} bookings` : 'No bookings yet'}
              </p>
              <p className="text-sm text-[#6B6558]">Bookings will appear here when customers request your services</p>
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
                          <h3 className="font-semibold text-[#1C1B18]">
                            {booking.serviceType}
                          </h3>
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${StatusBadge.color}`}>
                            {StatusBadge.label}
                          </span>
                        </div>
                        <p className="text-[#6B6558] text-sm mt-1">
                          Customer: {booking.customerId?.name || 'Unknown'} • {booking.address}
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
                          {booking.totalAmount > 0 && (
                            <span className="font-semibold text-[#1F3D2B]">₹{booking.totalAmount}</span>
                          )}
                        </div>
                        {booking.description && (
                          <p className="text-sm text-[#6B6558] mt-2 line-clamp-2">{booking.description}</p>
                        )}
                      </div>

                      {/* Right Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        {getStatusActions(booking)}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default ProviderDashboard;