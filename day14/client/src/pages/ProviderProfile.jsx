import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, ShieldCheck, Clock, Calendar, Phone, Mail, ThumbsUp, MessageCircle } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const ProviderProfile = () => {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with API call
    const mockProvider = {
      id: 1,
      name: 'Rajesh Sharma',
      service: 'Plumbing',
      rating: 4.9,
      reviews: 127,
      experience: 12,
      hourlyRate: 800,
      verified: true,
      location: 'Kathmandu',
      distance: '1.2 km',
      availability: 'Available Today',
      description: 'Professional plumber with 12+ years of experience in residential and commercial plumbing. Specializing in pipe repairs, installations, and emergency services.',
      skills: ['Pipe Repair', 'Installation', 'Leak Detection', 'Emergency Services'],
      languages: ['Nepali', 'English', 'Hindi'],
      phone: '+977-984-1234567',
      email: 'rajesh@servicepulse.com',
      reviewsList: [
        { name: 'Sita Gurung', rating: 5, text: 'Excellent work! Fixed my leaking pipe within minutes.', date: '2 days ago' },
        { name: 'Kumar Tamang', rating: 5, text: 'Professional and punctual. Highly recommend!', date: '1 week ago' },
        { name: 'Maya Rai', rating: 4, text: 'Good service, reasonable price.', date: '2 weeks ago' },
      ],
    };
    setProvider(mockProvider);
    setLoading(false);
  }, [id]);

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

  if (!provider) {
    return (
      <div className="min-h-screen bg-[#FBFAF6]">
        <Navbar />
        <div className="pt-32 text-center">
          <p className="text-[#6B6558]">Professional not found</p>
          <Link to="/providers" className="text-[#E8A33D] hover:underline">Back to search</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFAF6] font-['Inter']">
      <Navbar />

      <div className="pt-28 pb-16 max-w-5xl mx-auto px-6 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Breadcrumb */}
          <Link to="/providers" className="text-sm text-[#6B6558] hover:text-[#1F3D2B] transition-colors">
            ← Back to professionals
          </Link>

          {/* Profile Header */}
          <div className="bg-white rounded-2xl border border-[#E4DFD1] p-6 md:p-8 mt-4">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-[#EFEADA] flex items-center justify-center text-3xl font-bold text-[#1F3D2B]">
                    {provider.name.charAt(0)}
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-[#1C1B18] font-['Space_Grotesk']">
                      {provider.name}
                    </h1>
                    <div className="flex items-center gap-3 mt-1">
                      <p className="text-[#6B6558]">{provider.service}</p>
                      {provider.verified && (
                        <span className="flex items-center gap-1 text-xs font-medium text-[#E8A33D]">
                          <ShieldCheck size={14} /> Verified
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-4 mt-4">
                  <div className="flex items-center gap-1.5">
                    <Star size={18} className="text-[#F3B85E] fill-[#F3B85E]" />
                    <span className="font-semibold">{provider.rating}</span>
                    <span className="text-sm text-[#6B6558]">({provider.reviews} reviews)</span>
                  </div>
                  <span className="text-sm text-[#6B6558]">• {provider.experience} years experience</span>
                  <span className="text-sm text-[#6B6558]">• {provider.distance} away</span>
                </div>

                {/* Availability */}
                <div className="flex items-center gap-4 mt-4">
                  <span className={`flex items-center gap-1.5 text-sm font-medium ${
                    provider.availability === 'Available Today' ? 'text-[#2ECC71]' : 'text-[#F3B85E]'
                  }`}>
                    <Clock size={15} /> {provider.availability}
                  </span>
                  <span className="text-sm text-[#6B6558]">• ₹{provider.hourlyRate}/hr</span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mt-5">
                  <button className="px-6 py-2.5 bg-[#1F3D2B] text-white rounded-xl font-semibold hover:bg-[#2F5940] transition-colors">
                    Book Now
                  </button>
                  <button className="px-6 py-2.5 border border-[#E4DFD1] rounded-xl font-semibold text-[#1C1B18] hover:bg-[#EFEADA] transition-colors flex items-center gap-2">
                    <MessageCircle size={18} /> Message
                  </button>
                  <button className="px-6 py-2.5 border border-[#E4DFD1] rounded-xl font-semibold text-[#1C1B18] hover:bg-[#EFEADA] transition-colors flex items-center gap-2">
                    <Phone size={18} /> Call
                  </button>
                </div>
              </div>

              {/* Rate & Contact */}
              <div className="md:text-right shrink-0">
                <div className="text-3xl font-bold text-[#1F3D2B] font-['Space_Grotesk']">
                  ₹{provider.hourlyRate}
                </div>
                <p className="text-sm text-[#6B6558]">per hour</p>
                <p className="flex items-center justify-center md:justify-end gap-1 text-sm text-[#6B6558] mt-2">
                  <MapPin size={15} /> {provider.location}
                </p>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {/* About */}
            <div className="md:col-span-2 bg-white rounded-2xl border border-[#E4DFD1] p-6">
              <h2 className="font-semibold text-[#1C1B18] mb-3">About</h2>
              <p className="text-[#6B6558] leading-relaxed">{provider.description}</p>

              <div className="mt-4">
                <h3 className="font-semibold text-[#1C1B18] text-sm mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {provider.skills.map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-[#EFEADA] rounded-full text-sm text-[#1F3D2B]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold text-[#1C1B18] text-sm mb-2">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {provider.languages.map((lang) => (
                    <span key={lang} className="px-3 py-1 bg-white border border-[#E4DFD1] rounded-full text-sm text-[#6B6558]">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-2xl border border-[#E4DFD1] p-6">
              <h2 className="font-semibold text-[#1C1B18] mb-3">Contact</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-[#6B6558]">
                  <Phone size={16} className="text-[#1F3D2B]" />
                  <a href={`tel:${provider.phone}`} className="hover:text-[#1F3D2B] transition-colors">
                    {provider.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-[#6B6558]">
                  <Mail size={16} className="text-[#1F3D2B]" />
                  <a href={`mailto:${provider.email}`} className="hover:text-[#1F3D2B] transition-colors">
                    {provider.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-[#6B6558]">
                  <MapPin size={16} className="text-[#1F3D2B]" />
                  <span>{provider.location}</span>
                </div>
              </div>

              <button className="w-full mt-4 py-2.5 bg-[#E8A33D] text-[#14251A] rounded-xl font-semibold hover:bg-[#D68F24] transition-colors">
                Request Quote
              </button>
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-white rounded-2xl border border-[#E4DFD1] p-6 mt-6">
            <h2 className="font-semibold text-[#1C1B18] mb-4">Reviews</h2>
            <div className="space-y-4">
              {provider.reviewsList.map((review, index) => (
                <div key={index} className="border-b border-[#E4DFD1] pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#1C1B18]">{review.name}</span>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className={i < review.rating ? 'text-[#F3B85E] fill-[#F3B85E]' : 'text-[#E4DFD1]'} />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-[#6B6558]">{review.date}</span>
                  </div>
                  <p className="text-[#6B6558] mt-1">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default ProviderProfile;