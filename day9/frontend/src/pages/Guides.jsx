import PageLayout from "../components/common/PageLayout";
import { useState, useEffect } from "react";
import { Star, Phone, MapPin, Languages } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Guides = () => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  // Fetch guides from backend
  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/guides");
      const data = await response.json();
      setGuides(data);
    } catch (error) {
      console.error("Error fetching guides:", error);
    } finally {
      setLoading(false);
    }
  };

  const regions = ["All", ...new Set(guides.map(g => g.region).filter(Boolean))];

  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === "" || selectedRegion === "All" || guide.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  const contactGuide = (guide) => {
    if (!user) {
      alert("Please login to contact guides");
      navigate("/login");
      return;
    }
    alert(`📞 Contact ${guide.name} at ${guide.phone}\n\n(Booking system coming soon!)`);
  };

  const handleRegisterGuide = () => {
    if (!user) {
      alert("Please login to register as a guide");
      navigate("/login");
      return;
    }
    navigate("/dashboard");
    // Trigger guide registration modal
    setTimeout(() => {
      const event = new CustomEvent('openGuideForm');
      window.dispatchEvent(event);
    }, 500);
  };

  if (loading) {
    return (
      <PageLayout title="👨‍🏫 Local Trekking Guides" subtitle="Connect with verified guides who know the mountains best">
        <div className="text-center py-20">Loading guides...</div>
      </PageLayout>
    );
  }

  return (
    <PageLayout 
      title="👨‍🏫 Local Trekking Guides" 
      subtitle="Connect with verified guides who know the mountains best"
    >
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search guides..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {regions.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
      </div>

      {/* Guides Grid */}
      {filteredGuides.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No guides found. Try different filters.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <div key={guide._id || guide.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 text-white">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">{guide.name}</h3>
                  {guide.verified && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">✓ Verified</span>
                  )}
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <Star size={16} fill="gold" stroke="gold" />
                  <span className="text-sm">{guide.guideProfile?.rating || guide.rating || 0} ★</span>
                </div>
              </div>
              
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={18} />
                  <span className="text-sm">{guide.guideProfile?.pastPlaces?.[0] || guide.region || "Nepal"}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Languages size={18} />
                  <span className="text-sm">{guide.guideProfile?.languages?.join(", ") || guide.languages?.join(", ") || "English, Nepali"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">📅 {guide.guideProfile?.experience || guide.experience || 0} years</span>
                  <span className="text-green-600 font-bold">₹{guide.guideProfile?.pricePerDay || guide.pricePerDay || 0}/day</span>
                </div>
                <button
                  onClick={() => contactGuide(guide)}
                  className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-semibold transition flex items-center justify-center gap-2"
                >
                  <Phone size={18} />
                  Contact Guide
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Become a Guide */}
      <div className="mt-10 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 text-center border border-orange-200">
        <h3 className="font-bold text-xl mb-2">Are you a local guide?</h3>
        <p className="text-gray-600 mb-4">Join our platform to connect with trekkers from around the world</p>
        <button 
          onClick={handleRegisterGuide}
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-xl font-semibold"
        >
          Register as Guide →
        </button>
      </div>
    </PageLayout>
  );
};

export default Guides;