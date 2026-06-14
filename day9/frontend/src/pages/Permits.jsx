import { useState } from "react";
import PageLayout from "../components/common/PageLayout";
import { FileText, Download, MapPin, Calendar, AlertCircle, CheckCircle, Clock, ExternalLink, Shield, DollarSign, Users } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "../components/common/AnimatedSection.jsx";

const Permits = () => {
  const [selectedTrek, setSelectedTrek] = useState(null);
  const [expandedPermit, setExpandedPermit] = useState(null);

  const permitsData = [
    {
      id: 1,
      trek: "Everest Base Camp",
      difficulty: "Hard",
      duration: "14 days",
      image: "/images/everest.jpg",
      permits: [
        { 
          name: "Sagarmatha National Park Permit", 
          cost: "NPR 3,000", 
          where: "Kathmandu or Monjo",
          duration: "Entry valid for entire trek",
          icon: <Shield size={18} />,
          required: true
        },
        { 
          name: "Khumbu Pasang Lhamu Permit", 
          cost: "NPR 2,000", 
          where: "Kathmandu",
          duration: "Single entry",
          icon: <FileText size={18} />,
          required: true
        },
        { 
          name: "TIMS Card", 
          cost: "NPR 2,000", 
          where: "TAAN/NTB office",
          duration: "Valid for 1 year",
          icon: <Users size={18} />,
          required: true
        }
      ],
      totalCost: "NPR 7,000",
      bestSeason: "March-May, Sept-Nov",
      tips: ["Carry 4 passport photos", "Get permits 2-3 days before trek", "Keep copies on phone"]
    },
    {
      id: 2,
      trek: "Annapurna Circuit",
      difficulty: "Hard",
      duration: "16 days",
      image: "/images/annapurna.jpg",
      permits: [
        { 
          name: "ACAP Permit", 
          cost: "NPR 3,000", 
          where: "Kathmandu or Pokhara",
          duration: "Valid for entry",
          icon: <Shield size={18} />,
          required: true
        },
        { 
          name: "TIMS Card", 
          cost: "NPR 2,000", 
          where: "TAAN/NTB office",
          duration: "Valid for 1 year",
          icon: <Users size={18} />,
          required: true
        }
      ],
      totalCost: "NPR 5,000",
      bestSeason: "April-May, Oct-Nov",
      tips: ["Start early to avoid afternoon winds", "Acclimatize at Manang", "Check weather at Thorong La"]
    },
    {
      id: 3,
      trek: "Manaslu Circuit",
      difficulty: "Hard",
      duration: "14 days",
      image: "/images/manaslu.jpg",
      permits: [
        { 
          name: "Manaslu Restricted Permit", 
          cost: "USD 100/week", 
          where: "Kathmandu only",
          duration: "Per week",
          icon: <AlertCircle size={18} />,
          required: true
        },
        { 
          name: "ACAP Permit", 
          cost: "NPR 3,000", 
          where: "Kathmandu",
          duration: "Single entry",
          icon: <Shield size={18} />,
          required: true
        },
        { 
          name: "TIMS Card", 
          cost: "NPR 2,000", 
          where: "TAAN office",
          duration: "Valid for 1 year",
          icon: <Users size={18} />,
          required: true
        }
      ],
      totalCost: "USD 100 + NPR 5,000",
      bestSeason: "Sept-Nov",
      tips: ["Must go with licensed guide", "Minimum 2 trekkers required", "Register with immigration"]
    },
    {
      id: 4,
      trek: "Langtang Valley",
      difficulty: "Moderate",
      duration: "8 days",
      image: "/images/langtang.jpg",
      permits: [
        { 
          name: "Langtang National Park Permit", 
          cost: "NPR 3,000", 
          where: "Kathmandu or Dhunche",
          duration: "Entry valid",
          icon: <Shield size={18} />,
          required: true
        },
        { 
          name: "TIMS Card", 
          cost: "NPR 2,000", 
          where: "TAAN/NTB office",
          duration: "Valid for 1 year",
          icon: <Users size={18} />,
          required: true
        }
      ],
      totalCost: "NPR 5,000",
      bestSeason: "March-May, Oct-Nov",
      tips: ["Check road conditions to Syabrubesi", "Carry warm clothes", "Mobile network available"]
    },
    {
      id: 5,
      trek: "Mardi Himal",
      difficulty: "Easy",
      duration: "5 days",
      image: "/images/mardi.jpg",
      permits: [
        { 
          name: "ACAP Permit", 
          cost: "NPR 3,000", 
          where: "Kathmandu or Pokhara",
          duration: "Entry valid",
          icon: <Shield size={18} />,
          required: true
        },
        { 
          name: "TIMS Card", 
          cost: "NPR 2,000", 
          where: "TAAN/NTB office",
          duration: "Valid for 1 year",
          icon: <Users size={18} />,
          required: true
        }
      ],
      totalCost: "NPR 5,000",
      bestSeason: "March-May, Sept-Dec",
      tips: ["Short trek, good for beginners", "Stunning sunrise views", "Teahouses available"]
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case "Easy": return "bg-green-100 text-green-700";
      case "Moderate": return "bg-yellow-100 text-yellow-700";
      case "Hard": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <PageLayout 
      title="📋 Trekking Permits Guide" 
      subtitle="Everything you need to know about permits for Nepal's famous treks"
    >
      {/* Info Banner */}
      <AnimatedSection>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 border border-blue-200">
          <div className="flex items-start gap-4">
            <div className="bg-blue-600 p-3 rounded-xl">
              <AlertCircle className="text-white" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-blue-800">Important Permit Information</h3>
              <p className="text-gray-600 text-sm mt-1">
                Most trekking permits can be obtained in Kathmandu at the Nepal Tourism Board office. 
                Some restricted areas require additional permits and must be arranged through registered agencies.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Quick Stats */}
      <AnimatedSection delay={0.1}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <div className="text-2xl mb-1">🏔️</div>
            <div className="font-bold text-xl">5+</div>
            <div className="text-xs text-gray-500">Popular Treks</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <div className="text-2xl mb-1">📄</div>
            <div className="font-bold text-xl">12+</div>
            <div className="text-xs text-gray-500">Permits Available</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <div className="text-2xl mb-1">💰</div>
            <div className="font-bold text-xl">NPR 3,000</div>
            <div className="text-xs text-gray-500">Avg Permit Cost</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <div className="text-2xl mb-1">⏱️</div>
            <div className="font-bold text-xl">24hrs</div>
            <div className="text-xs text-gray-500">Processing Time</div>
          </div>
        </div>
      </AnimatedSection>

      {/* Trek Cards */}
      <div className="space-y-6">
        {permitsData.map((trek, index) => (
          <AnimatedSection key={trek.id} delay={index * 0.1}>
            <motion.div 
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all"
              whileHover={{ y: -4 }}
            >
              {/* Trek Header */}
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="md:w-1/4 h-48 md:h-auto">
                  <img 
                    src={trek.image} 
                    alt={trek.trek}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Content */}
                <div className="flex-1 p-6">
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">{trek.trek}</h2>
                      <div className="flex gap-3 mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(trek.difficulty)}`}>
                          {trek.difficulty}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar size={14} /> {trek.duration}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-gray-500">
                          <DollarSign size={14} /> {trek.totalCost}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setExpandedPermit(expandedPermit === trek.id ? null : trek.id)}
                      className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-1"
                    >
                      {expandedPermit === trek.id ? "Show Less" : "View Permits"}
                    </button>
                  </div>

                  {/* Best Season */}
                  <div className="mt-3 flex items-center gap-2 text-sm">
                    <span className="font-medium">Best Season:</span>
                    <span className="text-gray-600">{trek.bestSeason}</span>
                  </div>

                  {/* Expanded Permits */}
                  {expandedPermit === trek.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4 pt-4 border-t"
                    >
                      <h3 className="font-semibold text-gray-800 mb-3">Required Permits:</h3>
                      <div className="space-y-3">
                        {trek.permits.map((permit, i) => (
                          <div key={i} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 p-3 bg-gray-50 rounded-xl">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                {permit.icon}
                                <span className="font-semibold text-gray-800">{permit.name}</span>
                                {permit.required && (
                                  <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">Required</span>
                                )}
                              </div>
                              <div className="text-sm text-gray-500 mt-1">📍 {permit.where}</div>
                            </div>
                            <div className="flex gap-4">
                              <div className="text-right">
                                <div className="text-sm text-gray-500">Cost</div>
                                <div className="font-semibold text-green-600">{permit.cost}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm text-gray-500">Validity</div>
                                <div className="text-sm">{permit.duration}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Tips */}
                      <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-200">
                        <h4 className="font-semibold text-amber-800 flex items-center gap-2 mb-2">
                          <AlertCircle size={16} /> Trek Tips
                        </h4>
                        <ul className="text-sm text-amber-700 space-y-1">
                          {trek.tips.map((tip, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <CheckCircle size={12} />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatedSection>
        ))}
      </div>

      {/* Download Guide Section */}
      <AnimatedSection delay={0.5}>
        <div className="mt-10 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-2">Need a Complete Permit Guide?</h3>
          <p className="text-green-100 mb-6">Download our comprehensive PDF guide with all permit details, office locations, and sample forms</p>
          <button className="bg-white text-green-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition flex items-center gap-2 mx-auto">
            <Download size={18} />
            Download Free Guide (PDF)
          </button>
          <p className="text-xs text-green-200 mt-4">*Guide will be emailed to you instantly</p>
        </div>
      </AnimatedSection>

      {/* FAQs */}
      <AnimatedSection delay={0.6}>
        <div className="mt-10">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h4 className="font-semibold text-gray-800 mb-2">Where to get permits in Kathmandu?</h4>
              <p className="text-sm text-gray-600">Nepal Tourism Board office at Bhrikutimandap, Kathmandu. Open Sunday-Friday, 10 AM - 5 PM.</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h4 className="font-semibold text-gray-800 mb-2">Can I get permits online?</h4>
              <p className="text-sm text-gray-600">Some permits are available online, but physical permits are still required for most treks.</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h4 className="font-semibold text-gray-800 mb-2">How many passport photos needed?</h4>
              <p className="text-sm text-gray-600">Carry at least 4-6 passport-size photos for different permits.</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h4 className="font-semibold text-gray-800 mb-2">Do I need a guide for restricted areas?</h4>
              <p className="text-sm text-gray-600">Yes, areas like Manaslu, Upper Mustang require licensed guides.</p>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </PageLayout>
  );
};

export default Permits;