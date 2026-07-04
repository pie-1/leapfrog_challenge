import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Send, MapPin, Calendar, DollarSign, Briefcase, AlertCircle } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const PostJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    service: '',
    location: '',
    date: '',
    time: '',
    budget: '',
    description: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const services = ['Plumbing', 'Electrician', 'Cleaning', 'Cooking', 'Carpenter', 'Painting', 'Labour', 'Driver'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // API call would go here
    setTimeout(() => {
      navigate('/providers');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#FBFAF6] font-['Inter']">
      <Navbar />

      <div className="pt-28 pb-16 max-w-3xl mx-auto px-6 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-semibold tracking-[0.15em] text-[#D68F24] font-['IBM_Plex_Mono'] mb-3">
              POST A JOB
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1C1B18] font-['Space_Grotesk'] tracking-tight">
              Describe what you need
            </h1>
            <p className="mt-2 text-[#6B6558]">
              Pros will bid on your job. Choose the best offer.
            </p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl border border-[#E4DFD1] p-8 text-center"
            >
              <div className="text-5xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-[#1C1B18] font-['Space_Grotesk']">Job Posted!</h2>
              <p className="text-[#6B6558] mt-2">Pros will start bidding shortly.</p>
              <p className="text-sm text-[#6B6558] mt-1">Redirecting to find services...</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#E4DFD1] p-6 md:p-8 space-y-5">
              {/* Service Type */}
              <div>
                <label className="block text-sm font-semibold text-[#1C1B18] mb-1.5">
                  What service do you need? <span className="text-[#E74C3C]">*</span>
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#E4DFD1] bg-[#FBFAF6] text-[#1C1B18] focus:outline-none focus:border-[#1F3D2B] transition-colors"
                >
                  <option value="">Select a service</option>
                  {services.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-[#1C1B18] mb-1.5">
                  Location <span className="text-[#E74C3C]">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8371]" size={18} />
                  <input
                    type="text"
                    name="location"
                    placeholder="Enter your address"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#E4DFD1] bg-[#FBFAF6] text-[#1C1B18] focus:outline-none focus:border-[#1F3D2B] transition-colors"
                  />
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#1C1B18] mb-1.5">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8371]" size={18} />
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#E4DFD1] bg-[#FBFAF6] text-[#1C1B18] focus:outline-none focus:border-[#1F3D2B] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1C1B18] mb-1.5">Time</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#E4DFD1] bg-[#FBFAF6] text-[#1C1B18] focus:outline-none focus:border-[#1F3D2B] transition-colors"
                  />
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-semibold text-[#1C1B18] mb-1.5">
                  Estimated Budget (NPR) <span className="text-[#E74C3C]">*</span>
                </label>
                <div className="relative">
                  <label className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8371]" size={18} ></label>
                  <input
                    type="number"
                    name="budget"
                    placeholder="e.g. Rs 1500"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#E4DFD1] bg-[#FBFAF6] text-[#1C1B18] focus:outline-none focus:border-[#1F3D2B] transition-colors"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-[#1C1B18] mb-1.5">
                  Description <span className="text-[#E74C3C]">*</span>
                </label>
                <textarea
                  name="description"
                  placeholder="Describe your job in detail..."
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#E4DFD1] bg-[#FBFAF6] text-[#1C1B18] focus:outline-none focus:border-[#1F3D2B] transition-colors resize-none"
                />
              </div>

              {/* Info Box */}
              <div className="bg-[#EFEADA] rounded-xl p-4 flex items-start gap-3">
                <AlertCircle size={18} className="text-[#D68F24] shrink-0 mt-0.5" />
                <p className="text-sm text-[#6B6558]">
                  Pros will bid on your job within 24 hours. You'll receive notifications when bids come in.
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3.5 bg-[#1F3D2B] text-white rounded-xl font-semibold hover:bg-[#2F5940] transition-colors flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Post Job
              </button>
            </form>
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default PostJob;