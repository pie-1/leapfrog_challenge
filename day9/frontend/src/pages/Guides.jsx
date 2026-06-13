import PageLayout from "../components/PageLayout";
import { useState } from "react";
import { Star, Phone, MapPin, Languages } from "lucide-react";

// This data will move to backend when you add authentication
const INITIAL_GUIDES = [
  {
    id: 1,
    name: "Pasang Sherpa",
    experience: 12,
    languages: ["English", "Nepali", "Sherpa"],
    region: "Everest Region",
    rating: 4.9,
    phone: "9841234567",
    verified: true,
    pricePerDay: 45,
  },
  {
    id: 2,
    name: "Kumar Gurung",
    experience: 8,
    languages: ["English", "Nepali"],
    region: "Annapurna Region",
    rating: 4.8,
    phone: "9847654321",
    verified: true,
    pricePerDay: 40,
  },
  {
    id: 3,
    name: "Mingma Tamang",
    experience: 10,
    languages: ["English", "Nepali", "Tamang"],
    region: "Langtang Region",
    rating: 4.7,
    phone: "9849876543",
    verified: true,
    pricePerDay: 42,
  },
];

const Guides = () => {
  const [guides, setGuides] = useState(INITIAL_GUIDES);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  const regions = ["All", "Everest Region", "Annapurna Region", "Langtang Region"];

  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === "" || selectedRegion === "All" || guide.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  // This function will connect to backend after login feature
  const contactGuide = (guide) => {
    alert(`📞 Contact ${guide.name} at ${guide.phone}\n\n(After login, this will connect you directly)`);
  };

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
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGuides.map(guide => (
          <div key={guide.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 text-white">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold">{guide.name}</h3>
                {guide.verified && (
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">✓ Verified</span>
                )}
              </div>
              <div className="flex items-center gap-1 mt-2">
                <Star size={16} fill="gold" stroke="gold" />
                <span className="text-sm">{guide.rating} ★</span>
              </div>
            </div>
            
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin size={18} />
                <span className="text-sm">{guide.region}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Languages size={18} />
                <span className="text-sm">{guide.languages.join(", ")}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">📅 {guide.experience} years</span>
                <span className="text-green-600 font-bold">${guide.pricePerDay}/day</span>
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

      {filteredGuides.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No guides found. Try different filters.</p>
        </div>
      )}

      {/* Become a Guide */}
      <div className="mt-10 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 text-center border border-orange-200">
        <h3 className="font-bold text-xl mb-2">Are you a local guide?</h3>
        <p className="text-gray-600 mb-4">Join our platform to connect with trekkers from around the world</p>
        <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-xl font-semibold">
          Register as Guide →
        </button>
      </div>
    </PageLayout>
  );
};

export default Guides;