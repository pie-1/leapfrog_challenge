import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeftIcon, 
  BuildingOfficeIcon,
  PlusIcon,
  TrashIcon,
  PencilIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { weddingService } from '../features/weddings/wedding.service';

const vendorCategories = [
  'Venue', 'Catering', 'Photography', 'Videography', 
  'Decorations', 'Music', 'Attire', 'Transport', 
  'Accommodation', 'Mehendi', 'Makeup', 'Other'
];

export default function Vendors() {
  const [weddings, setWeddings] = useState([]);
  const [selectedWedding, setSelectedWedding] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingVendor, setEditingVendor] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Other',
    phone: '',
    email: '',
    address: '',
    website: '',
    notes: '',
    rating: 0,
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const vendors = [...(selectedWedding.vendors || [])];
      if (editingIndex !== null) {
        vendors[editingIndex] = formData;
      } else {
        vendors.push(formData);
      }
      
      const updated = await weddingService.update(selectedWedding._id, {
        ...selectedWedding,
        vendors,
      });
      
      setSelectedWedding(updated);
      setShowForm(false);
      setEditingIndex(null);
      setFormData({
        name: '', category: 'Other', phone: '', email: '',
        address: '', website: '', notes: '', rating: 0,
      });
      
      // Refresh weddings list
      const data = await weddingService.getAll();
      setWeddings(data);
    } catch (error) {
      console.error('Failed to save vendor:', error);
    }
  };

  const handleDelete = async (index) => {
    if (window.confirm('Remove this vendor?')) {
      try {
        const vendors = selectedWedding.vendors.filter((_, i) => i !== index);
        const updated = await weddingService.update(selectedWedding._id, {
          ...selectedWedding,
          vendors,
        });
        setSelectedWedding(updated);
        const data = await weddingService.getAll();
        setWeddings(data);
      } catch (error) {
        console.error('Failed to delete vendor:', error);
      }
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData(selectedWedding.vendors[index]);
    setShowForm(true);
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Venue': return '🏛️';
      case 'Catering': return '🍽️';
      case 'Photography': return '📸';
      case 'Videography': return '🎥';
      case 'Decorations': return '🎨';
      case 'Music': return '🎵';
      case 'Attire': return '👔';
      case 'Transport': return '🚗';
      case 'Accommodation': return '🏨';
      case 'Mehendi': return '🌿';
      case 'Makeup': return '💄';
      default: return '📋';
    }
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-rose-600">Loading vendors...</div>
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
          <BuildingOfficeIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h1 className="text-2xl font-serif text-gray-800">No weddings yet</h1>
          <p className="text-gray-500 mt-2">Plan your wedding to start managing vendors!</p>
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
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div>
          <Link to="/dashboard" className="inline-flex items-center text-gray-500 hover:text-rose-600 transition mb-2">
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-serif text-gray-800">Vendor Management</h1>
        </div>
        <div className="flex gap-3">
          {weddings.length > 1 && (
            <select
              value={selectedWedding?._id || ''}
              onChange={(e) => {
                const wedding = weddings.find(w => w._id === e.target.value);
                setSelectedWedding(wedding);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {weddings.map(w => (
                <option key={w._id} value={w._id}>{w.title}</option>
              ))}
            </select>
          )}
          <button
            onClick={() => {
              setEditingIndex(null);
              setFormData({ name: '', category: 'Other', phone: '', email: '', address: '', website: '', notes: '', rating: 0 });
              setShowForm(!showForm);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            <PlusIcon className="w-4 h-4" />
            Add Vendor
          </button>
        </div>
      </div>

      {selectedWedding && (
        <>
          {/* Vendor Form */}
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8"
            >
              <h3 className="font-serif text-lg text-gray-800 mb-4">
                {editingIndex !== null ? 'Edit Vendor' : 'Add New Vendor'}
              </h3>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vendor Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {vendorCategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className={`text-2xl transition ${star <= formData.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2 flex gap-3">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    {editingIndex !== null ? 'Update Vendor' : 'Add Vendor'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingIndex(null);
                    }}
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Vendor List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedWedding.vendors && selectedWedding.vendors.length > 0 ? (
              selectedWedding.vendors.map((vendor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{getCategoryIcon(vendor.category)}</span>
                      <div>
                        <h4 className="font-semibold text-gray-800">{vendor.name}</h4>
                        <span className="text-xs text-gray-500">{vendor.category}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(index)}
                        className="text-gray-400 hover:text-gray-600 transition"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-gray-400 hover:text-red-600 transition"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {vendor.rating > 0 && (
                    <div className="mt-2 text-sm">{renderStars(vendor.rating)}</div>
                  )}

                  <div className="mt-3 space-y-1 text-sm text-gray-500">
                    {vendor.phone && (
                      <p className="flex items-center gap-1"><PhoneIcon className="w-4 h-4" /> {vendor.phone}</p>
                    )}
                    {vendor.email && (
                      <p className="flex items-center gap-1"><EnvelopeIcon className="w-4 h-4" /> {vendor.email}</p>
                    )}
                    {vendor.address && (
                      <p className="flex items-center gap-1"><MapPinIcon className="w-4 h-4" /> {vendor.address}</p>
                    )}
                    {vendor.website && (
                      <p className="flex items-center gap-1 text-blue-600">
                        <a href={vendor.website} target="_blank" rel="noopener noreferrer">
                          Visit Website
                        </a>
                      </p>
                    )}
                  </div>

                  {vendor.notes && (
                    <p className="mt-2 text-xs text-gray-400">{vendor.notes}</p>
                  )}
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500">
                <BuildingOfficeIcon className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                <p>No vendors added yet</p>
                <p className="text-sm">Add your wedding vendors here!</p>
              </div>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
}