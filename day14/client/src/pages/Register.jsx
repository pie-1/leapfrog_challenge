import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Phone, Briefcase, Wrench, MapPin, Clock, DollarSign, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import API from '../utils/api';

const Register = () => {
  const [step, setStep] = useState(1); // 1: Basic info, 2: Role selection, 3: Provider details
  const [role, setRole] = useState('customer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [location, setLocation] = useState({ lat: null, lng: null, address: '' });
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    // Provider specific
    serviceType: '',
    specialization: '',
    experience: '',
    description: '',
    hourlyRate: '',
    tools: '',
    certifications: '',
    availability: {
      monday: { start: '09:00', end: '17:00' },
      tuesday: { start: '09:00', end: '17:00' },
      wednesday: { start: '09:00', end: '17:00' },
      thursday: { start: '09:00', end: '17:00' },
      friday: { start: '09:00', end: '17:00' },
      saturday: { start: '09:00', end: '17:00' },
      sunday: { start: '09:00', end: '17:00' },
    },
  });

  const serviceTypes = ['Plumbing', 'Electrician', 'Cleaning', 'Cooking', 'Carpenter', 'Painting', 'Labour', 'Driver'];

  // Get user's location
  const getLocation = () => {
    setIsGettingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          
          // Reverse geocode to get address (optional)
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            setLocation(prev => ({
              ...prev,
              address: data.display_name || `${latitude}, ${longitude}`,
            }));
          } catch (err) {
            setLocation(prev => ({
              ...prev,
              address: `${latitude}, ${longitude}`,
            }));
          }
          setIsGettingLocation(false);
        },
        (err) => {
          console.error('Location error:', err);
          setIsGettingLocation(false);
          setError('Unable to get location. Please enter your address manually.');
        },
        { enableHighAccuracy: true }
      );
    } else {
      setIsGettingLocation(false);
      setError('Geolocation is not supported by your browser.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvailabilityChange = (day, field, value) => {
    setFormData({
      ...formData,
      availability: {
        ...formData.availability,
        [day]: {
          ...formData.availability[day],
          [field]: value,
        },
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Step 1: Register user
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: role,
        address: location.address || formData.address,
        location: {
          lat: location.lat,
          lng: location.lng,
        },
      };

      const response = await register(userData);

      // Step 2: If provider, register as provider
      if (role === 'provider') {
        const providerData = {
          serviceType: formData.serviceType,
          specialization: formData.specialization,
          experience: parseInt(formData.experience),
          description: formData.description,
          about: formData.description,
          hourlyRate: parseInt(formData.hourlyRate),
          tools: formData.tools.split(',').map(t => t.trim()).filter(Boolean),
          certifications: formData.certifications.split(',').map(c => c.trim()).filter(Boolean),
          availability: formData.availability,
          location: {
            lat: location.lat,
            lng: location.lng,
            address: location.address || formData.address,
          },
        };

        await API.post('/providers/register', providerData);
      }

      navigate('/');
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step === 1) {
      // Validate basic info
      if (!formData.name || !formData.email || !formData.password || !formData.phone) {
        setError('Please fill in all required fields');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-[#FBFAF6] font-['Inter']">
      <Navbar />

      <div className="pt-28 pb-16 max-w-2xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl border border-[#E4DFD1] p-8 shadow-sm"
        >
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                    step >= s
                      ? 'bg-[#1F3D2B] text-white'
                      : 'bg-[#E4DFD1] text-[#6B6558]'
                  }`}
                >
                  {step > s ? <CheckCircle size={18} /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-16 h-0.5 mx-2 ${
                      step > s ? 'bg-[#1F3D2B]' : 'bg-[#E4DFD1]'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#1C1B18] font-['Space_Grotesk']">
              {step === 1 && 'Create Account'}
              {step === 2 && 'Choose Your Role'}
              {step === 3 && role === 'provider' ? 'Provider Details' : 'Almost Done!'}
            </h1>
            <p className="text-[#6B6558] mt-1 text-sm">
              {step === 1 && 'Start your journey with ServicePulse'}
              {step === 2 && 'Are you looking for work or hiring?'}
              {step === 3 && role === 'provider' ? 'Tell us about your services' : 'Complete your profile'}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#1C1B18] mb-1.5">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8371]" size={18} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#E4DFD1] bg-[#FBFAF6] text-[#1C1B18] focus:outline-none focus:border-[#1F3D2B] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1C1B18] mb-1.5">Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8371]" size={18} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#E4DFD1] bg-[#FBFAF6] text-[#1C1B18] focus:outline-none focus:border-[#1F3D2B] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1C1B18] mb-1.5">Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8371]" size={18} />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={6}
                      placeholder="••••••••"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#E4DFD1] bg-[#FBFAF6] text-[#1C1B18] focus:outline-none focus:border-[#1F3D2B] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1C1B18] mb-1.5">Phone *</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8371]" size={18} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+977-98XXXXXXXX"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#E4DFD1] bg-[#FBFAF6] text-[#1C1B18] focus:outline-none focus:border-[#1F3D2B] transition-colors"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-[#1C1B18] mb-1.5">Location</label>
                  <div className="flex gap-3">
                    <div className="flex-1 relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8371]" size={18} />
                      <input
                        type="text"
                        name="address"
                        placeholder="Enter your address"
                        value={location.address || formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#E4DFD1] bg-[#FBFAF6] text-[#1C1B18] focus:outline-none focus:border-[#1F3D2B] transition-colors"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={getLocation}
                      disabled={isGettingLocation}
                      className="px-4 py-3 bg-[#1F3D2B] text-white rounded-xl hover:bg-[#2F5940] transition-colors disabled:opacity-50 whitespace-nowrap"
                    >
                      {isGettingLocation ? 'Loading...' : '📍 Detect'}
                    </button>
                  </div>
                  {location.lat && location.lng && (
                    <p className="text-xs text-[#2ECC71] mt-1">
                      ✅ Location detected: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Role Selection */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setRole('customer')}
                    className={`p-6 rounded-2xl border-2 transition-all ${
                      role === 'customer'
                        ? 'border-[#1F3D2B] bg-[#1F3D2B]/5'
                        : 'border-[#E4DFD1] hover:border-[#1F3D2B]'
                    }`}
                  >
                    <Briefcase size={32} className="mx-auto text-[#1F3D2B]" />
                    <h3 className="font-semibold text-[#1C1B18] mt-3">Customer</h3>
                    <p className="text-sm text-[#6B6558]">Find and hire professionals</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('provider')}
                    className={`p-6 rounded-2xl border-2 transition-all ${
                      role === 'provider'
                        ? 'border-[#1F3D2B] bg-[#1F3D2B]/5'
                        : 'border-[#E4DFD1] hover:border-[#1F3D2B]'
                    }`}
                  >
                    <Wrench size={32} className="mx-auto text-[#1F3D2B]" />
                    <h3 className="font-semibold text-[#1C1B18] mt-3">Service Provider</h3>
                    <p className="text-sm text-[#6B6558]">Offer your services and earn</p>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Provider Details */}
            {step === 3 && role === 'provider' && (
              <div className="space-y-4">
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

                <div>
                  <label className="block text-sm font-medium text-[#1C1B18] mb-1.5">Specialization *</label>
                  <input
                    type="text"
                    name="specialization"
                    placeholder="e.g., Pipe Installation, Wiring"
                    value={formData.specialization}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[#E4DFD1] bg-[#FBFAF6] text-[#1C1B18] focus:outline-none focus:border-[#1F3D2B] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1C1B18] mb-1.5">Experience (years) *</label>
                    <input
                      type="number"
                      name="experience"
                      placeholder="5"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                      min="0"
                      className="w-full px-4 py-3 rounded-xl border border-[#E4DFD1] bg-[#FBFAF6] text-[#1C1B18] focus:outline-none focus:border-[#1F3D2B] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1C1B18] mb-1.5">Hourly Rate (NPR) *</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8371]" size={18} />
                      <input
                        type="number"
                        name="hourlyRate"
                        placeholder="800"
                        value={formData.hourlyRate}
                        onChange={handleChange}
                        required
                        min="0"
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#E4DFD1] bg-[#FBFAF6] text-[#1C1B18] focus:outline-none focus:border-[#1F3D2B] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1C1B18] mb-1.5">Description</label>
                  <textarea
                    name="description"
                    placeholder="Describe your services..."
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#E4DFD1] bg-[#FBFAF6] text-[#1C1B18] focus:outline-none focus:border-[#1F3D2B] transition-colors resize-none"
                  />
                </div>

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

                {/* Availability */}
                <div>
                  <label className="block text-sm font-medium text-[#1C1B18] mb-2">Working Hours</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                      <div key={day} className="flex items-center gap-2 text-sm">
                        <span className="w-16 capitalize text-[#6B6558]">{day.slice(0, 3)}</span>
                        <input
                          type="time"
                          value={formData.availability[day].start}
                          onChange={(e) => handleAvailabilityChange(day, 'start', e.target.value)}
                          className="w-20 px-2 py-1 rounded border border-[#E4DFD1] bg-[#FBFAF6] text-[#1C1B18] text-sm"
                        />
                        <span className="text-[#6B6558]">-</span>
                        <input
                          type="time"
                          value={formData.availability[day].end}
                          onChange={(e) => handleAvailabilityChange(day, 'end', e.target.value)}
                          className="w-20 px-2 py-1 rounded border border-[#E4DFD1] bg-[#FBFAF6] text-[#1C1B18] text-sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Customer Final */}
            {step === 3 && role === 'customer' && (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-xl font-bold text-[#1C1B18]">Almost there!</h3>
                <p className="text-[#6B6558] mt-2">
                  You're just one click away from finding the best professionals.
                </p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 mt-6">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 py-3 border border-[#E4DFD1] rounded-xl font-semibold text-[#6B6558] hover:bg-[#EFEADA] transition-colors"
                >
                  Back
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex-1 py-3 bg-[#1F3D2B] text-white rounded-xl font-semibold hover:bg-[#2F5940] transition-colors"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 bg-[#E8A33D] text-[#14251A] rounded-xl font-semibold hover:bg-[#D68F24] transition-colors disabled:opacity-50"
                >
                  {loading ? 'Creating account...' : 'Create Account'}
                </button>
              )}
            </div>
          </form>

          <p className="text-center text-[#6B6558] text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-[#E8A33D] font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;