import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, DollarSign, Briefcase, Eye } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import PlaceBid from '../components/bidding/PlaceBid';
import API from '../utils/api';
import { useAuth } from '../context/AuthContext';

const ProviderJobs = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    fetchAvailableJobs();
  }, []);

  const fetchAvailableJobs = async () => {
    try {
      setLoading(true);
      const response = await API.get('/bookings/available-jobs');
      setJobs(response.data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Failed to load available jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleBidPlaced = () => {
    setSelectedJob(null);
    fetchAvailableJobs();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBFAF6]">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#E8A33D]" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFAF6] font-['Inter']">
      <Navbar />

      <div className="pt-28 pb-16 max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#1C1B18] font-['Space_Grotesk'] tracking-tight">
                Available Jobs
              </h1>
              <p className="text-[#6B6558] mt-1">
                {jobs.length} jobs available to bid on
              </p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600 mb-4">
              {error}
            </div>
          )}

          {jobs.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-[#E4DFD1]">
              <div className="text-5xl mb-4">💼</div>
              <p className="text-[#6B6558]">No jobs available right now</p>
              <p className="text-sm text-[#6B6558] mt-1">Check back later for new opportunities</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobs.map((job) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl border border-[#E4DFD1] p-6 hover:shadow-[0_4px_16px_-8px_rgba(20,37,26,0.12)] transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-[#1C1B18] text-lg">{job.serviceType}</h3>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-[#6B6558]">
                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} /> {job.address}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar size={14} /> {new Date(job.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={14} /> {job.time}
                        </span>
                      </div>
                      <p className="text-sm text-[#6B6558] mt-2 line-clamp-2">{job.description}</p>
                      <div className="mt-3">
                        <span className="text-sm font-semibold text-[#1F3D2B]">₹{job.totalAmount} (budget)</span>
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-[#F3B85E]/10 text-[#F3B85E]">
                      Open
                    </span>
                  </div>

                  <div className="flex gap-3 mt-4 pt-4 border-t border-[#E4DFD1]">
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="flex-1 px-4 py-2 bg-[#1F3D2B] text-white rounded-xl text-sm font-semibold hover:bg-[#2F5940] transition-colors"
                    >
                      Place Bid
                    </button>
                    <Link
                      to={`/job/${job._id}/bids`}
                      className="px-4 py-2 border border-[#E4DFD1] text-[#6B6558] rounded-xl text-sm font-semibold hover:bg-[#EFEADA] transition-colors flex items-center gap-1.5"
                    >
                      <Eye size={16} /> View Bids
                    </Link>
                  </div>

                  {selectedJob?._id === job._id && (
                    <div className="mt-4">
                      <PlaceBid
                        jobId={job._id}
                        onBidPlaced={handleBidPlaced}
                        onCancel={() => setSelectedJob(null)}
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default ProviderJobs;