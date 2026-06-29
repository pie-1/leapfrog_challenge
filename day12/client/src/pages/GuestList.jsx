import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  UserGroupIcon,
  EnvelopeIcon,
  PhoneIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { weddingService } from '../features/weddings/wedding.service';
import GuestForm from '../components/GuestForm';

function getRsvpBadge(status) {
  const configs = {
    confirmed: { color: 'bg-green-100 text-green-800', icon: CheckCircleIcon },
    declined: { color: 'bg-red-100 text-red-800', icon: XCircleIcon },
    pending: { color: 'bg-yellow-100 text-yellow-800', icon: ClockIcon },
  };
  const config = configs[status] || configs.pending;
  const Icon = config.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
      <Icon className="w-3 h-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default function GuestList() {
  const [allGuests, setAllGuests] = useState([]);
  const [weddings, setWeddings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRsvp, setFilterRsvp] = useState('all');
  const [showGuestForm, setShowGuestForm] = useState(false);
  const [selectedWeddingId, setSelectedWeddingId] = useState('');

  const fetchAllGuests = async () => {
    try {
      setLoading(true);
      const weddingsData = await weddingService.getAll();
      setWeddings(weddingsData);
      
      const guests = weddingsData.flatMap(wedding => 
        (wedding.guests || []).map(guest => ({
          ...guest,
          weddingId: wedding._id,
          weddingTitle: wedding.title,
          weddingDate: wedding.date,
        }))
      );
      setAllGuests(guests);
      
      if (weddingsData.length > 0 && !selectedWeddingId) {
        setSelectedWeddingId(weddingsData[0]._id);
      }
    } catch (error) {
      console.error('Failed to fetch guests:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllGuests();
  }, []);

  const handleAddGuest = async (guestData) => {
    try {
      await weddingService.addGuest(selectedWeddingId, guestData);
      await fetchAllGuests(); // Refresh the list
      setShowGuestForm(false);
      alert('Guest added successfully! 🎉');
    } catch (error) {
      console.error('Failed to add guest:', error);
      alert('Failed to add guest. Please try again.');
    }
  };

  const filteredGuests = allGuests.filter(guest => {
    const matchName = guest.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRsvp = filterRsvp === 'all' || guest.rsvp === filterRsvp;
    return matchName && matchRsvp;
  });

  const stats = {
    total: allGuests.length,
    confirmed: allGuests.filter(g => g.rsvp === 'confirmed').length,
    pending: allGuests.filter(g => g.rsvp === 'pending').length,
    declined: allGuests.filter(g => g.rsvp === 'declined').length,
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-rose-600">Loading guests...</div>
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
        <div>
          <Link
            to="/dashboard"
            className="inline-flex items-center text-gray-500 hover:text-rose-600 transition mb-2"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-serif text-gray-800">Guest List</h1>
          <p className="text-gray-500">
            {stats.total} guests invited across all weddings
          </p>
        </div>
        <div className="flex gap-3">
          {weddings.length > 0 && (
            <button
              onClick={() => setShowGuestForm(true)}
              className="bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700 transition shadow-lg shadow-amber-200 flex items-center gap-2"
            >
              <PlusIcon className="w-4 h-4" />
              Add Guest
            </button>
          )}
          <Link
            to="/dashboard"
            className="bg-rose-600 text-white px-6 py-2 rounded-full hover:bg-rose-700 transition shadow-lg shadow-rose-200"
          >
            + Plan Wedding
          </Link>
        </div>
      </div>

      {/* Add Guest Form */}
      {showGuestForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <label className="text-sm font-medium text-gray-700">
                Select Wedding:
              </label>
              <select
                value={selectedWeddingId}
                onChange={(e) => setSelectedWeddingId(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              >
                {weddings.map(w => (
                  <option key={w._id} value={w._id}>{w.title}</option>
                ))}
              </select>
            </div>
            <GuestForm
              onAdd={handleAddGuest}
              onCancel={() => setShowGuestForm(false)}
            />
          </div>
        </motion.div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
          <p className="text-sm text-gray-500">Total Guests</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
          <p className="text-sm text-gray-500">Confirmed</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          <p className="text-sm text-gray-500">Pending</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-2xl font-bold text-red-600">{stats.declined}</p>
          <p className="text-sm text-gray-500">Declined</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search guests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
          </div>
        </div>
        <select
          value={filterRsvp}
          onChange={(e) => setFilterRsvp(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
        >
          <option value="all">All RSVPs</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="declined">Declined</option>
        </select>
      </div>

      {/* Guest List */}
      {filteredGuests.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-white rounded-2xl border border-gray-100">
          <UserGroupIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-lg">No guests found</p>
          <p className="text-sm">
            {allGuests.length === 0 
              ? 'Start by adding guests to your weddings!' 
              : 'Try adjusting your search or filters'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGuests.map((guest, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.02 }}
              className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{guest.name}</h4>
                  <Link
                    to={`/wedding/${guest.weddingId}`}
                    className="text-xs text-rose-600 hover:underline"
                  >
                    {guest.weddingTitle}
                  </Link>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {guest.email && (
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <EnvelopeIcon className="w-3 h-3" />
                        {guest.email}
                      </span>
                    )}
                    {guest.phone && (
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <PhoneIcon className="w-3 h-3" />
                        {guest.phone}
                      </span>
                    )}
                  </div>
                  {guest.dietary && guest.dietary !== 'none' && (
                    <span className="mt-1 inline-block text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {guest.dietary}
                    </span>
                  )}
                  {guest.plusOne && (
                    <span className="mt-1 inline-block text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full ml-1">
                      +1
                    </span>
                  )}
                  {guest.note && (
                    <p className="mt-1 text-xs text-gray-400">{guest.note}</p>
                  )}
                </div>
                <div className="ml-2">
                  {getRsvpBadge(guest.rsvp)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}