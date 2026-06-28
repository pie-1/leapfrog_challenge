import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingService } from '../features/weddings/wedding.service';
import LoadingSpinner from '../components/LoadingSpinner';
import WeddingHeader from '../components/wedding/WeddingHeader';
import WeddingInfo from '../components/wedding/WeddingInfo';
import WeddingEditForm from '../components/wedding/WeddingEditForm';
import EventList from '../components/wedding/EventList';
import GuestList from '../components/wedding/GuestList';
import BudgetTracker from '../components/wedding/BudgetTracker';

export default function WeddingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [wedding, setWedding] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [showEventForm, setShowEventForm] = useState(false);
  const [showGuestForm, setShowGuestForm] = useState(false);
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

  // Guest handlers
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

  if (loading) return <LoadingSpinner message="Loading wedding details..." />;
  if (!wedding) return <div className="text-center py-16">Wedding not found</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto px-6 py-10"
    >
      <WeddingHeader 
        wedding={wedding} 
        onEdit={() => setIsEditing(true)} 
        onDelete={handleDelete} 
      />

      <AnimatePresence>
        {isEditing && (
          <WeddingEditForm
            editForm={editForm}
            setEditForm={setEditForm}
            onSave={handleEdit}
            onCancel={() => setIsEditing(false)}
          />
        )}
      </AnimatePresence>

      <WeddingInfo wedding={wedding} />

      <EventList
        events={wedding.events}
        onAdd={handleAddEvent}
        onRemove={handleRemoveEvent}
        showForm={showEventForm}
        setShowForm={setShowEventForm}
      />

      <BudgetTracker wedding={wedding} weddingId={id} setWedding={setWedding} />

      <GuestList
        guests={wedding.guests}
        onAdd={handleAddGuest}
        onUpdate={handleUpdateGuest}
        onRemove={handleRemoveGuest}
        onEdit={handleEditGuest}
        showForm={showGuestForm}
        setShowForm={setShowGuestForm}
        editingGuest={editingGuest}
        editingGuestIndex={editingGuestIndex}
      />
    </motion.div>
  );
}