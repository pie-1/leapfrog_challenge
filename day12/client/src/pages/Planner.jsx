import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeftIcon, 
  CalendarIcon, 
  ClockIcon, 
  MapPinIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon as ClockIconOutline
} from '@heroicons/react/24/outline';
import { weddingService } from '../features/weddings/wedding.service';

export default function Planner() {
  const [weddings, setWeddings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWedding, setSelectedWedding] = useState(null);

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

  const getUpcomingEvents = (wedding) => {
    if (!wedding?.events) return [];
    const now = new Date();
    return wedding.events
      .filter(event => new Date(event.date) >= now)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 5);
  };

  const getEventStatus = (eventDate) => {
    const now = new Date();
    const event = new Date(eventDate);
    const diff = event - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days < 0) return { status: 'passed', label: 'Passed', icon: XCircleIcon, color: 'text-red-500' };
    if (days === 0) return { status: 'today', label: 'Today! 🎉', icon: ClockIconOutline, color: 'text-green-500' };
    if (days <= 7) return { status: 'soon', label: `${days} days away`, icon: ClockIcon, color: 'text-amber-500' };
    return { status: 'upcoming', label: `${days} days away`, icon: CalendarIcon, color: 'text-blue-500' };
  };

  const getDaysUntilWedding = (weddingDate) => {
    const now = new Date();
    const wedding = new Date(weddingDate);
    const diff = wedding - now;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-rose-600">Loading your wedding plans...</div>
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
          <CalendarIcon className="w-16 h-16 mx-auto text-rose-300 mb-4" />
          <h1 className="text-2xl font-serif text-gray-800">No weddings planned yet</h1>
          <p className="text-gray-500 mt-2">Plan your first wedding to see the timeline!</p>
          <Link to="/dashboard" className="inline-block mt-4 bg-rose-600 text-white px-6 py-2 rounded-full hover:bg-rose-700 transition">
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const upcomingEvents = selectedWedding ? getUpcomingEvents(selectedWedding) : [];
  const daysUntil = selectedWedding ? getDaysUntilWedding(selectedWedding.date) : 0;

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
          <h1 className="text-3xl font-serif text-gray-800">Wedding Planner</h1>
        </div>
        <div className="flex gap-3">
          {weddings.length > 1 && (
            <select
              value={selectedWedding?._id || ''}
              onChange={(e) => {
                const wedding = weddings.find(w => w._id === e.target.value);
                setSelectedWedding(wedding);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
            >
              {weddings.map(w => (
                <option key={w._id} value={w._id}>{w.title}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      {selectedWedding && (
        <>
          {/* Wedding Overview Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-rose-600 to-rose-700 text-white p-8 rounded-2xl shadow-lg mb-8"
          >
            <div className="flex flex-wrap justify-between items-start">
              <div>
                <h2 className="text-2xl font-serif">{selectedWedding.title}</h2>
                <p className="text-rose-100 mt-1">
                  {new Date(selectedWedding.date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
                <div className="flex items-center gap-2 mt-2 text-rose-100">
                  <MapPinIcon className="w-4 h-4" />
                  <span>{selectedWedding.venue}</span>
                </div>
              </div>
              <div className="text-center bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl">
                <p className="text-2xl font-bold">{daysUntil > 0 ? daysUntil : 0}</p>
                <p className="text-sm text-rose-100">Days to go!</p>
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Events Timeline */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-serif text-lg text-gray-800 mb-4">Event Timeline</h3>
              
              {selectedWedding.events && selectedWedding.events.length > 0 ? (
                <div className="space-y-4">
                  {selectedWedding.events
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .map((event, index) => {
                      const status = getEventStatus(event.date);
                      const StatusIcon = status.icon;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`flex items-start gap-4 p-4 rounded-xl border ${
                            status.status === 'passed' ? 'bg-gray-50 border-gray-100' :
                            status.status === 'today' ? 'bg-green-50 border-green-200' :
                            status.status === 'soon' ? 'bg-amber-50 border-amber-200' :
                            'bg-white border-gray-100'
                          }`}
                        >
                          <div className={`${status.color} mt-1`}>
                            <StatusIcon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap justify-between items-start">
                              <div>
                                <h4 className={`font-semibold ${
                                  status.status === 'passed' ? 'text-gray-500' : 'text-gray-800'
                                }`}>
                                  {event.name}
                                </h4>
                                {event.venue && (
                                  <p className="text-sm text-gray-500 flex items-center gap-1">
                                    <MapPinIcon className="w-3 h-3" />
                                    {event.venue}
                                  </p>
                                )}
                              </div>
                              <span className={`text-sm font-medium ${
                                status.status === 'passed' ? 'text-gray-400' :
                                status.status === 'today' ? 'text-green-600' :
                                status.status === 'soon' ? 'text-amber-600' :
                                'text-blue-600'
                              }`}>
                                {status.label}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-3 text-sm text-gray-500 mt-1">
                              <span className="flex items-center gap-1">
                                <CalendarIcon className="w-3 h-3" />
                                {new Date(event.date).toLocaleDateString('en-IN', {
                                  day: 'numeric',
                                  month: 'short',
                                })}
                              </span>
                              {event.time && (
                                <span className="flex items-center gap-1">
                                  <ClockIcon className="w-3 h-3" />
                                  {event.time}
                                </span>
                              )}
                            </div>
                            {event.description && (
                              <p className="text-sm text-gray-500 mt-1">{event.description}</p>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <CalendarIcon className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                  <p>No events scheduled yet</p>
                  <p className="text-sm">Add events to see your timeline!</p>
                </div>
              )}
            </div>

            {/* Sidebar - Summary & Upcoming */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-serif text-lg text-gray-800 mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Events</span>
                    <span className="font-bold text-rose-600">{selectedWedding.events?.length || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Upcoming Events</span>
                    <span className="font-bold text-amber-600">{upcomingEvents.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Guests</span>
                    <span className="font-bold text-amber-600">{selectedWedding.guests?.length || 0}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <span className="text-gray-600">Budget</span>
                    <span className="font-bold text-emerald-600">
                      ₹{selectedWedding.budget?.total?.toLocaleString() || 0}
                    </span>
                  </div>
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-serif text-lg text-gray-800 mb-4">Upcoming Events</h3>
                {upcomingEvents.length > 0 ? (
                  <div className="space-y-2">
                    {upcomingEvents.map((event, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition">
                        <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">{event.name}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(event.date).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                            })}
                          </p>
                        </div>
                        <span className="text-xs text-rose-600 font-medium">
                          {getEventStatus(event.date).label}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">No upcoming events</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}