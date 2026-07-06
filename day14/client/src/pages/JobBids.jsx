import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, MapPin, DollarSign, User, CheckCircle, XCircle } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import BidCard from '../components/bidding/BidCard';
import API from '../utils/api';
import { useAuth } from '../context/AuthContext';

const JobBids = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [acceptingBid, setAcceptingBid] = useState(null);

  useEffect(() => {
    fetchJobAndBids();
  }, [id]);

  const fetchJobAndBids = async () => {
    try {
      setLoading(true);
      const [jobRes, bidsRes] = await Promise.all([
        API.get(`/bookings/${id}`),
        API.get(`/bids/job/${id}`),
      ]);
      setJob(jobRes.data);
      setBids(bidsRes.data);
    } catch (err) {
      console.error('Error fetching job/bids:', err);
      setError('Failed to load job details');
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptBid = async (bidId) => {
    try {
      setAcceptingBid(bidId);
      await API.put(`/bids/${bidId}/accept`);
      await fetchJobAndBids();
    } catch (err) {
      console.error('Error accepting bid:', err);
      alert('Failed to accept bid');
    } finally {
      setAcceptingBid(null);
    }
  };

  const handleRejectBid = async (bidId) => {
    try {
      await API.put(`/bids/${bidId}/reject`);
      await fetchJobAndBids();
    } catch (err) {
      console.error('Error rejecting bid:', err);
      alert('Failed to reject bid');
    }
  };

  const isJobOwner = user?._id === job?.customerId?._id;

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

  if (error || !job) {
    return (
      <div className="min-h-screen bg-[#FBFAF6]">
        <Navbar />
        <div className="pt-32 text-center">
          <p className="text-[#6B6558]">{error || 'Job not found'}</p>
          <Link to="/my-history" className="text-[#E8A33D] hover:underline">Back to my jobs</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFAF6] font-['Inter']">
      <Navbar />

      <div className="pt-28 pb-16 max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/my-history"
            className="inline-flex items-center gap-2 text-[#6B6558] hover:text-[#1F3D2B] transition-colors text-sm mb-6"
          >
            <ArrowLeft size={16} /> Back to my jobs
          </Link>

          {/* Job Details */}
          <div className="bg-white rounded-2xl border border-[#E4DFD1] p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-[#1C1B18] font-['Space_Grotesk']">
                  {job.serviceType}
                </h1>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-[#6B6558]">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={15} /> {job.address}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={15} /> {new Date(job.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={15} /> {job.time}
                  </span>
                  <span className="font-semibold text-[#1F3D2B]">₹{job.totalAmount}</span>
                </div>
                {job.description && (
                  <p className="text-[#6B6558] text-sm mt-3">{job.description}</p>
                )}
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                job.status === 'pending' ? 'bg-[#F3B85E]/10 text-[#F3B85E]' :
                job.status === 'accepted' ? 'bg-[#3498DB]/10 text-[#3498DB]' :
                'bg-[#2ECC71]/10 text-[#2ECC71]'
              }`}>
                {job.status}
              </span>
            </div>
          </div>

          {/* Bids List */}
          <h2 className="text-xl font-bold text-[#1C1B18] font-['Space_Grotesk'] mb-4">
            {bids.length} Bid{bids.length !== 1 ? 's' : ''}
          </h2>

          {bids.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-[#E4DFD1]">
              <div className="text-4xl mb-4">💼</div>
              <p className="text-[#6B6558]">No bids yet</p>
              <p className="text-sm text-[#6B6558] mt-1">Wait for providers to bid on your job</p>
            </div>
          ) : (
            <div className="space-y-4">
              {bids.map((bid) => (
                <BidCard
                  key={bid._id}
                  bid={bid}
                  isOwner={isJobOwner}
                  onAccept={handleAcceptBid}
                  onReject={handleRejectBid}
                  accepting={acceptingBid === bid._id}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default JobBids;