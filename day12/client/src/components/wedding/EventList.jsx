import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, TrashIcon, CalendarIcon, ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';
import EventForm from '../EventForm';
import EmptyState from '../EmptyState';

export default function EventList({ events, onAdd, onRemove, showForm, setShowForm }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-serif text-lg text-gray-800">Events</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition text-sm"
        >
          <PlusIcon className="w-4 h-4 mr-1" />
          Add Event
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <div className="mb-4">
            <EventForm onAdd={onAdd} onCancel={() => setShowForm(false)} />
          </div>
        )}
      </AnimatePresence>

      {events && events.length > 0 ? (
        <div className="space-y-3">
          {events.map((event, index) => (
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
                  onClick={() => onRemove(index)}
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
          title="No events added yet."
          message="Add events like Mehendi, Sangeet, or Reception!"
        />
      )}
    </div>
  );
}