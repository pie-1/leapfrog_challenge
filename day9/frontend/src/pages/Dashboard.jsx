import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import GuideRegistrationForm from "../components/GuideRegistrationForm";
import { MapPin, Calendar, Award, Star, Phone, Mail, Globe, Mountain, TrendingUp, Users, Camera, CheckCircle, LayoutDashboard } from "lucide-react";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [showGuideForm, setShowGuideForm] = useState(false);
  const navigate = useNavigate();

  const fetchUserData = async (uid) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${uid}`);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
  const handleOpenForm = () => setShowGuideForm(true);
  window.addEventListener('openGuideForm', handleOpenForm);
  return () => window.removeEventListener('openGuideForm', handleOpenForm);
}, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate("/");
        return;
      }
      setUser(currentUser);
      await fetchUserData(currentUser.uid);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <PageLayout title="Dashboard" subtitle="">
        <div className="text-center py-20">Loading...</div>
      </PageLayout>
    );
  }

  if (!userData) return null;

  const isGuide = userData.role === 'guide';

  return (
    <PageLayout title="My Dashboard" subtitle={`Welcome back, ${userData.name || user.email}`}>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Member Since</p>
              <p className="text-xl font-bold">
                {new Date(userData.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </p>
            </div>
            <Mountain size={32} className="opacity-80" />
          </div>
        </div>
        
        {isGuide ? (
          <>
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Experience</p>
                  <p className="text-xl font-bold">{userData.guideProfile?.experience || 0} years</p>
                </div>
                <Award size={32} className="opacity-80" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Rating</p>
                  <p className="text-xl font-bold">{userData.guideProfile?.rating || 0} ★</p>
                </div>
                <Star size={32} className="opacity-80" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Price</p>
                  <p className="text-xl font-bold">₹{userData.guideProfile?.pricePerDay || 0}/day</p>
                </div>
                <TrendingUp size={32} className="opacity-80" />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Treks Completed</p>
                  <p className="text-xl font-bold">{userData.trekStats?.treksCompleted || 0}</p>
                </div>
                <CheckCircle size={32} className="opacity-80" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Total Distance</p>
                  <p className="text-xl font-bold">{userData.trekStats?.totalDistance || 0} km</p>
                </div>
                <MapPin size={32} className="opacity-80" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Bucket List</p>
                  <p className="text-xl font-bold">{userData.savedTreks?.length || 0}</p>
                </div>
                <Calendar size={32} className="opacity-80" />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Become a Guide Button - Only for travellers */}
      {!isGuide && (
        <div className="mb-6">
          <button
            onClick={() => setShowGuideForm(true)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition shadow-lg flex items-center gap-2"
          >
            🏔️ Register as a Professional Guide
          </button>
        </div>
      )}

      {/* Guide Registration Form Modal */}
      {showGuideForm && (
        <GuideRegistrationForm
          onClose={() => setShowGuideForm(false)}
          onSuccess={() => {
            setShowGuideForm(false);
            fetchUserData(user.uid);
          }}
        />
      )}

      {/* Main Content Tabs */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="border-b">
          <div className="flex gap-2 p-4">
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                activeTab === "profile" 
                  ? "bg-green-600 text-white" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Profile
            </button>
            {isGuide && (
              <button
                onClick={() => setActiveTab("portfolio")}
                className={`px-6 py-2 rounded-lg font-medium transition ${
                  activeTab === "portfolio" 
                    ? "bg-green-600 text-white" 
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Portfolio & Certifications
              </button>
            )}
            <button
              onClick={() => setActiveTab("bookings")}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                activeTab === "bookings" 
                  ? "bg-green-600 text-white" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {isGuide ? "Booking Requests" : "My Treks"}
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === "profile" && (
            <div className="space-y-6">
              {/* Profile Header */}
              <div className="flex items-center gap-6">
                <img 
                  src={userData.profileImage || `https://ui-avatars.com/api/?background=22c55e&color=fff&bold=true&name=${(userData.name || "User").charAt(0)}`} 
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-green-500"
                />
                <div>
                  <h2 className="text-2xl font-bold">{userData.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      isGuide ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                    }`}>
                      {isGuide ? "🏔️ Professional Guide" : "🌄 Trekker"}
                    </span>
                    {isGuide && userData.guideProfile?.verified && (
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                        ✓ Verified Guide
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-gray-500" />
                  <span>{userData.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-gray-500" />
                  <span>{userData.phone || "Not provided"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-gray-500" />
                  <span>{userData.location || "Location not set"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe size={18} className="text-gray-500" />
                  <span>Member since {new Date(userData.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Bio */}
              {userData.bio && (
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-semibold mb-2">About Me</h3>
                  <p className="text-gray-600">{userData.bio}</p>
                </div>
              )}

              {/* Guide Specific Profile Details */}
              {isGuide && userData.guideProfile && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Award size={18} /> Specialties
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {userData.guideProfile?.specialties?.map((s, i) => (
                        <span key={i} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">{s}</span>
                      )) || "Not specified"}
                    </div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Users size={18} /> Languages
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {userData.guideProfile?.languages?.map((l, i) => (
                        <span key={i} className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">{l}</span>
                      )) || "Not specified"}
                    </div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-xl">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <MapPin size={18} /> Past Places
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {userData.guideProfile?.pastPlaces?.map((p, i) => (
                        <span key={i} className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm">{p}</span>
                      )) || "Not specified"}
                    </div>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-xl">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Camera size={18} /> Availability
                    </h3>
                    <p className={`font-semibold ${userData.guideProfile?.availability ? "text-green-600" : "text-red-600"}`}>
                      {userData.guideProfile?.availability ? "✓ Available for bookings" : "✗ Currently booked"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "portfolio" && isGuide && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Award size={20} /> Certifications
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {userData.guideProfile?.certification?.map((cert, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <CheckCircle size={16} className="text-green-600" />
                      <span>{cert}</span>
                    </div>
                  )) || <p className="text-gray-500">No certifications added</p>}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Camera size={20} /> Portfolio Photos
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {(userData.guideProfile?.portfolio || []).map((img, i) => (
                    <img key={i} src={img} alt={`Portfolio ${i+1}`} className="rounded-xl h-32 w-full object-cover" />
                  ))}
                  {(!userData.guideProfile?.portfolio || userData.guideProfile?.portfolio.length === 0) && (
                    <p className="text-gray-500 col-span-3">No portfolio images added yet</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "bookings" && (
            <div className="text-center py-12 text-gray-500">
              <Calendar size={48} className="mx-auto mb-3 opacity-50" />
              <p>Booking system coming soon!</p>
              <p className="text-sm mt-1">You'll be able to manage treks here</p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;