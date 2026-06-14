import { useState, useEffect } from "react";
import PageLayout from "../components/common/PageLayout";
import { Search, MapPin, Star, Users, Mountain, Briefcase, Mail, Phone } from "lucide-react";

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users/all");
      const data = await response.json();
      console.log("Fetched profiles:", data);
      setProfiles(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching profiles:", error);
      setProfiles([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredProfiles = profiles.filter(profile => {
    const matchesFilter = filter === "all" || 
      (filter === "guides" && profile.role === "guide") ||
      (filter === "travellers" && profile.role === "traveller");
    
    const matchesSearch = profile.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.guideProfile?.specialties?.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <PageLayout title="🌍 Trek Community" subtitle="Connect with fellow trekkers and experienced guides">
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading profiles...</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout 
      title="🌍 Trek Community" 
      subtitle="Connect with fellow trekkers and experienced guides"
    >
      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by name, location, or specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-5 py-2 rounded-xl font-medium transition ${
              filter === "all" 
                ? "bg-gray-800 text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All ({profiles.length})
          </button>
          <button
            onClick={() => setFilter("guides")}
            className={`px-5 py-2 rounded-xl font-medium transition flex items-center gap-2 ${
              filter === "guides" 
                ? "bg-blue-600 text-white" 
                : "bg-blue-50 text-blue-700 hover:bg-blue-100"
            }`}
          >
            <Briefcase size={16} /> Guides ({profiles.filter(p => p.role === 'guide').length})
          </button>
          <button
            onClick={() => setFilter("travellers")}
            className={`px-5 py-2 rounded-xl font-medium transition flex items-center gap-2 ${
              filter === "travellers" 
                ? "bg-green-600 text-white" 
                : "bg-green-50 text-green-700 hover:bg-green-100"
            }`}
          >
            <Mountain size={16} /> Travellers ({profiles.filter(p => p.role === 'traveller').length})
          </button>
        </div>
      </div>

      {/* Profiles Grid */}
      {filteredProfiles.length === 0 ? (
        <div className="text-center py-12">
          <Users size={48} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500">No profiles found matching your criteria</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.map((profile) => (
            <div key={profile._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all border border-gray-100">
              {/* Header */}
              <div className={`p-4 text-white ${
                profile.role === "guide" 
                  ? "bg-gradient-to-r from-blue-600 to-blue-700" 
                  : "bg-gradient-to-r from-green-600 to-green-700"
              }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">{profile.name || "Anonymous"}</h3>
                    <p className="text-sm opacity-90 mt-1">
                      {profile.role === "guide" ? "🏔️ Professional Guide" : "🌄 Trekker"}
                    </p>
                  </div>
                  {profile.role === "guide" && profile.guideProfile?.verified && (
                    <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold">
                      ✓ Verified
                    </span>
                  )}
                </div>
              </div>
              
              {/* Body */}
              <div className="p-5 space-y-3">
                {profile.location && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={16} />
                    <span className="text-sm">{profile.location}</span>
                  </div>
                )}
                
                {profile.role === "guide" && profile.guideProfile ? (
                  <>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Star size={16} className="text-yellow-500" />
                      <span className="text-sm">{profile.guideProfile.rating || 0} ★ ({profile.guideProfile.totalReviews || 0} reviews)</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Briefcase size={16} />
                      <span className="text-sm">{profile.guideProfile.experience || 0} years experience</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="font-semibold">₹{profile.guideProfile.pricePerDay || 0}</span>
                      <span className="text-sm">/ day</span>
                    </div>
                    {profile.guideProfile.specialties?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {profile.guideProfile.specialties.slice(0, 2).map((s, i) => (
                          <span key={i} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">{s}</span>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail size={16} />
                      <span className="text-sm">{profile.email}</span>
                    </div>
                    {profile.phone && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone size={16} />
                        <span className="text-sm">{profile.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mountain size={16} />
                      <span className="text-sm">{profile.trekStats?.treksCompleted || 0} treks completed</span>
                    </div>
                  </>
                )}
                
                {profile.bio && (
                  <p className="text-gray-500 text-sm line-clamp-2 mt-2 pt-2 border-t">{profile.bio}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </PageLayout>
  );
};

export default Profiles;