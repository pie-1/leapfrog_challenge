import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const ProviderRegistration = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    serviceType: '',
    specialization: '',
    experience: '',
    description: '',
    about: '',
    hourlyRate: '',
    tools: '',
    certifications: '',
  });

  const serviceTypes = ['Plumbing', 'Electrician', 'Cleaning', 'Cooking', 'Carpenter', 'Painting', 'Labour', 'Driver'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const providerData = {
        ...formData,
        experience: parseInt(formData.experience),
        hourlyRate: parseInt(formData.hourlyRate),
        tools: formData.tools.split(',').map(t => t.trim()).filter(Boolean),
        certifications: formData.certifications.split(',').map(c => c.trim()).filter(Boolean),
      };

      await API.post('/providers/register', providerData);
      navigate('/providers');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFAF6] font-['Inter']">
      <Navbar />

      <div className="pt-32 pb-16 max-w-2xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl border border-[#E4DFD1] p-8 shadow-sm"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#1C1B18] font-['Space_Grotesk']">Register as Provider</h1>
            <p className="text-[#6B6558] mt-1 text-sm">Fill in your details to start getting jobs</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Service Type */}
            <div>
              <label className="block text-sm font-medium text-[#1C1B18] mb-1.5">Service Type *</label>
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-[#E4DFD1] bg-[#FBFAF6] text-[#1C1B18] focus:outline-none focus:border-[#1F3D2B] transition-colors"
              >
                <option value="">Select a service</option>
                {serviceTypes.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Specialization */}
            <div>
              <label className="block text-sm font-medium text-[#1C1B18] mb-1.5">Specialization *</label>
              <input
                type="text"
                name="specialization"
                placeholder="e.g., Pipe Installation, Wiring, Deep Cleaning"
                value={formData.specialization}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-[#E4DFD1] bg-[#FBFAF6] text-[#1C1B18] focus:outline-none focus:border-[#1F3D2B] transition-colors"
              />
            </div>

            {/* Experience & Rate */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1C1B18] mb-1.5">Years of Experience *</label>
                <input
                  type="number"
                  name="experience"
                  placeholder="e.g., 5"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-3 rounded-xl border border-[#E4DFD1] bg-[#FBFAF6] text-[#1C1B18] focus:outline-none focus:border-[#1F3D2B] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1C1B18] mb-1.5">Hourly Rate (NPR) *</label>
                <input
                  type="number"
                  name="hourlyRate"
                  placeholder="e.g.,NPR 800"
                  value={formData.hourlyRate}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-3 rounded-xl border border-[#E4DFD1] bg-[#FBFAF6] text-[#1C1B18] focus:outline-none focus:border-[#1F3D2B] transition-colors"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-[#1C1B18] mb-1.5">Description</label>
              <textarea
                name="description"
                placeholder="Brief description of your services..."
                rows="3"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-[#E4DFD1] bg-[#FBFAF6] text-[#1C1B18] focus:outline-none focus:border-[#1F3D2B] transition-colors resize-none"
              />
            </div>

            {/* About */}
            <div>
              <label className="block text-sm font-medium text-[#1C1B18] mb-1.5">About You</label>
              <textarea
                name="about"
                placeholder="Tell customers about yourself..."
                rows="2"
                value={formData.about}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-[#E4DFD1] bg-[#FBFAF6] text-[#1C1B18] focus:outline-none focus:border-[#1F3D2B] transition-colors resize-none"
              />
            </div>

            {/* Tools & Certifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1C1B18] mb-1.5">Tools (comma separated)</label>
                <input
                  type="text"
                  name="tools"
                  placeholder="e.g., Welding machine, Drill"
                  value={formData.tools}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#E4DFD1] bg-[#FBFAF6] text-[#1C1B18] focus:outline-none focus:border-[#1F3D2B] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1C1B18] mb-1.5">Certifications</label>
                <input
                  type="text"
                  name="certifications"
                  placeholder="e.g., OSHA certified"
                  value={formData.certifications}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#E4DFD1] bg-[#FBFAF6] text-[#1C1B18] focus:outline-none focus:border-[#1F3D2B] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#1F3D2B] text-white rounded-xl font-semibold hover:bg-[#2F5940] transition-colors disabled:opacity-50"
            >
              {loading ? 'Registering...' : 'Register as Provider'}
            </button>
          </form>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default ProviderRegistration;