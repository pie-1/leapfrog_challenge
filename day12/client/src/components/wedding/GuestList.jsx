import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, TrashIcon, PencilIcon, EnvelopeIcon, PhoneIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import GuestForm from '../GuestForm';
import EmptyState from '../EmptyState';

function getRsvpBadge(status) {
  const configs = {
    confirmed: { color: 'bg-green-100 text-green-800', icon: '✓' },
    declined: { color: 'bg-red-100 text-red-800', icon: '✗' },
    pending: { color: 'bg-yellow-100 text-yellow-800', icon: '⌛' },
  };
  const config = configs[status] || configs.pending;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
      {config.icon}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default function GuestList({ 
  guests, 
  onAdd, 
  onUpdate, 
  onRemove, 
  onEdit,
  showForm, 
  setShowForm,
  editingGuest,
  editingGuestIndex,
}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-serif text-lg text-gray-800">Guests</h3>
          {guests && guests.length > 0 && (
            <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-xs font-medium">
              {guests.length}
            </span>
          )}
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition text-sm"
        >
          <PlusIcon className="w-4 h-4 mr-1" />
          Add Guest
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <div className="mb-4">
            <GuestForm
              onAdd={onAdd}
              onUpdate={onUpdate}
              onCancel={() => setShowForm(false)}
              editingGuest={editingGuest}
              editingIndex={editingGuestIndex}
            />
          </div>
        )}
      </AnimatePresence>

      {guests && guests.length > 0 ? (
        <div className="space-y-3">
          {guests.map((guest, index) => (
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
                    onClick={() => onEdit(index)}
                    className="text-gray-400 hover:text-gray-600 transition"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRemove(index)}
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
        <EmptyState
          icon={UserGroupIcon}
          title="No guests added yet."
          message="Add your wedding guests with their RSVP status!"
        />
      )}
    </div>
  );
}