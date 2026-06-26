import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeftIcon, 
  PencilIcon, 
  TrashIcon, 
  PlusIcon,
  CalendarIcon,
  MapPinIcon,
  CurrencyRupeeIcon,
  ClockIcon,
  UserGroupIcon,
  EnvelopeIcon,
  PhoneIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon as ClockIconOutline,
} from '@heroicons/react/24/outline';
import { weddingService } from '../features/weddings/wedding.service';
import EventForm from '../components/EventForm';
import GuestForm from '../components/GuestForm'; // ✅ NEW

export default function WeddingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [wedding, setWedding] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showGuestForm, setShowGuestForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [editingGuest, setEditingGuest] = useState(null);
  const [editingGuestIndex, setEditingGuestIndex] = useState(null);

  useEffect(() => {
    fetchWedding();
  }, [id]);

  const fetchWedding = async () => {
    try {
      const data = await weddingService.getById(id);
      setWedding(data);
      setEditForm(data);
    } catch (error) {
      console.error('Failed to fetch wedding:', error);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this wedding?')) {
      try {
        await weddingService.delete(id);
        navigate('/dashboard');
      } catch (error) {
        console.error('Failed to delete wedding:', error);
      }
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const updated = await weddingService.update(id, editForm);
      setWedding(updated);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update wedding:', error);
    }
  };

  // Event handlers
  const handleAddEvent = async (eventData) => {
    try {
      const updated = await weddingService.addEvent(id, eventData);
      setWedding(updated);
      setShowEventForm(false);
    } catch (error) {
      console.error('Failed to add event:', error);
    }
  };

  const handleRemoveEvent = async (index) => {
    if (window.confirm('Remove this event?')) {
      try {
        const updated = await weddingService.removeEvent(id, index);
        setWedding(updated);
      } catch (error) {
        console.error('Failed to remove event:', error);
      }
    }
  };

  // ✅ Guest handlers
  const handleAddGuest = async (guestData) => {
    try {
      const updated = await weddingService.addGuest(id, guestData);
      setWedding(updated);
      setShowGuestForm(false);
    } catch (error) {
      console.error('Failed to add guest:', error);
    }
  };

  const handleUpdateGuest = async (index, guestData) => {
    try {
      const updated = await weddingService.updateGuest(id, index, guestData);
      setWedding(updated);
      setEditingGuest(null);
      setEditingGuestIndex(null);
      setShowGuestForm(false);
    } catch (error) {
      console.error('Failed to update guest:', error);
    }
  };

  const handleRemoveGuest = async (index) => {
    if (window.confirm('Remove this guest?')) {
      try {
        const updated = await weddingService.removeGuest(id, index);
        setWedding(updated);
      } catch (error) {
        console.error('Failed to remove guest:', error);
      }
    }
  };

  const handleEditGuest = (index) => {
    setEditingGuest(wedding.guests[index]);
    setEditingGuestIndex(index);
    setShowGuestForm(true);
  };

  const getRsvpBadge = (status) => {
    const configs = {
      confirmed: { color: 'bg-green-100 text-green-800', icon: CheckCircleIcon },
      declined: { color: 'bg-red-100 text-red-800', icon: XCircleIcon },
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: ClockIconOutline },
    };
    const config = configs[status] || configs.pending;
    const Icon = config.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-rose-600">Loading wedding details...</div>
      </div>
    );
  }

  if (!wedding) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">Wedding not found</p>
        <Link to="/dashboard" className="text-rose-600 hover:underline">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto px-6 py-10"
    >
      {/* Header - same as before */}
      <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
        <div>
          <Link
            to="/dashboard"
            className="inline-flex items-center text-gray-500 hover:text-rose-600 transition mb-2"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-serif text-gray-800">
            {wedding.title}
          </h1>
          <p className="text-gray-500">
            {new Date(wedding.date).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="inline-flex items-center px-4 py-2 bg-rose-100 text-rose-700 rounded-lg hover:bg-rose-200 transition"
          >
            <PencilIcon className="w-4 h-4 mr-2" />
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="inline-flex items-center px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
          >
            <TrashIcon className="w-4 h-4 mr-2" />
            Delete
          </button>
        </div>
      </div>

      {/* Edit Form - same as before */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white p-6 rounded-2xl shadow-lg mb-8 overflow-hidden"
          >
            <form onSubmit={handleEdit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Wedding Title *
                  </label>
                  <input
                    type="text"
                    value={editForm.title || ''}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={editForm.date ? new Date(editForm.date).toISOString().split('T')[0] : ''}
                    onChange={(e) => setEditForm({ ...editForm, date: new Date(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Venue *
                  </label>
                  <input
                    type="text"
                    value={editForm.venue || ''}
                    onChange={(e) => setEditForm({ ...editForm, venue: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Budget (₹)
                  </label>
                  <input
                    type="number"
                    value={editForm.budget?.total || 0}
                    onChange={(e) => setEditForm({ 
                      ...editForm, 
                      budget: { ...editForm.budget, total: parseFloat(e.target.value) || 0 } 
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={editForm.description || ''}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  rows="2"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-rose-600 text-white px-6 py-2 rounded-lg hover:bg-rose-700 transition"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wedding Info Cards - same as before */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 text-rose-600 mb-2">
            <CalendarIcon className="w-5 h-5" />
            <span className="font-medium">Date</span>
          </div>
          <p className="text-gray-800">
            {new Date(wedding.date).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 text-rose-600 mb-2">
            <MapPinIcon className="w-5 h-5" />
            <span className="font-medium">Venue</span>
          </div>
          <p className="text-gray-800">{wedding.venue}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 text-rose-600 mb-2">
            <CurrencyRupeeIcon className="w-5 h-5" />
            <span className="font-medium">Budget</span>
          </div>
          <p className="text-gray-800">
            ₹{wedding.budget?.total?.toLocaleString() || 0}
            {wedding.budget?.spent > 0 && (
              <span className="text-sm text-gray-500 ml-2">
                (₹{wedding.budget.spent.toLocaleString()} spent)
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Description - same as before */}
      {wedding.description && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <h3 className="font-serif text-lg text-gray-800 mb-2">About</h3>
          <p className="text-gray-600">{wedding.description}</p>
        </div>
      )}

      {/* Events Section - same as before */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-serif text-lg text-gray-800">Events</h3>
          <button
            onClick={() => setShowEventForm(!showEventForm)}
            className="inline-flex items-center px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition text-sm"
          >
            <PlusIcon className="w-4 h-4 mr-1" />
            Add Event
          </button>
        </div>

        <AnimatePresence>
          {showEventForm && (
            <div className="mb-4">
              <EventForm
                onAdd={handleAddEvent}
                onCancel={() => setShowEventForm(false)}
              />
            </div>
          )}
        </AnimatePresence>

        {wedding.events && wedding.events.length > 0 ? (
          <div className="space-y-3">
            {wedding.events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:shadow-sm transition"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{event.name}</h4>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-500 mt-1">
                      {event.date && (
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="w-3 h-3" />
                          {new Date(event.date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                          })}
                        </span>
                      )}
                      {event.time && (
                        <span className="flex items-center gap-1">
                          <ClockIcon className="w-3 h-3" />
                          {event.time}
                        </span>
                      )}
                      {event.venue && (
                        <span className="flex items-center gap-1">
                          <MapPinIcon className="w-3 h-3" />
                          {event.venue}
                        </span>
                      )}
                    </div>
                    {event.description && (
                      <p className="text-sm text-gray-500 mt-1">{event.description}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleRemoveEvent(index)}
                    className="text-red-400 hover:text-red-600 transition"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">No events added yet.</p>
            <p className="text-xs">Add events like Mehendi, Sangeet, or Reception!</p>
          </div>
        )}
      </div>

      {/* ✅ GUESTS SECTION */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-lg text-gray-800">Guests</h3>
            {wedding.guests && wedding.guests.length > 0 && (
              <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-xs font-medium">
                {wedding.guests.length}
              </span>
            )}
          </div>
          <button
            onClick={() => {
              setEditingGuest(null);
              setEditingGuestIndex(null);
              setShowGuestForm(!showGuestForm);
            }}
            className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition text-sm"
          >
            <PlusIcon className="w-4 h-4 mr-1" />
            Add Guest
          </button>
        </div>

        <AnimatePresence>
          {showGuestForm && (
            <div className="mb-4">
              <GuestForm
                onAdd={handleAddGuest}
                onUpdate={handleUpdateGuest}
                onCancel={() => {
                  setShowGuestForm(false);
                  setEditingGuest(null);
                  setEditingGuestIndex(null);
                }}
                editingGuest={editingGuest}
                editingIndex={editingGuestIndex}
              />
            </div>
          )}
        </AnimatePresence>

        {wedding.guests && wedding.guests.length > 0 ? (
          <div className="space-y-3">
            {wedding.guests.map((guest, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:shadow-sm transition"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-semibold text-gray-800">{guest.name}</h4>
                      {getRsvpBadge(guest.rsvp || 'pending')}
                      {guest.plusOne && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                          +1
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-500 mt-1">
                      {guest.email && (
                        <span className="flex items-center gap-1">
                          <EnvelopeIcon className="w-3 h-3" />
                          {guest.email}
                        </span>
                      )}
                      {guest.phone && (
                        <span className="flex items-center gap-1">
                          <PhoneIcon className="w-3 h-3" />
                          {guest.phone}
                        </span>
                      )}
                      {guest.dietary && guest.dietary !== 'none' && (
                        <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">
                          {guest.dietary}
                        </span>
                      )}
                    </div>
                    {guest.note && (
                      <p className="text-sm text-gray-400 mt-1">{guest.note}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditGuest(index)}
                      className="text-gray-400 hover:text-gray-600 transition"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleRemoveGuest(index)}
                      className="text-red-400 hover:text-red-600 transition"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <UserGroupIcon className="w-12 h-12 mx-auto text-gray-300 mb-2" />
            <p className="text-sm">No guests added yet.</p>
            <p className="text-xs">Add your wedding guests with their RSVP status!</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}