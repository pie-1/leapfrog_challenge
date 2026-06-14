import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { X, Plus, Trash2 } from "lucide-react";

const GuideRegistrationForm = ({ onClose, onSuccess }) => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    experience: "",
    pricePerDay: "",
    languages: [],
    specialties: [],
    pastPlaces: [],
    certification: [],
    bio: "",
    phone: "",
    location: ""
  });
  
  const [newLanguage, setNewLanguage] = useState("");
  const [newSpecialty, setNewSpecialty] = useState("");
  const [newPlace, setNewPlace] = useState("");
  const [newCert, setNewCert] = useState("");

  const addItem = (field, value, setter) => {
    if (value.trim()) {
      setFormData({
        ...formData,
        [field]: [...formData[field], value.trim()]
      });
      setter("");
    }
  };

  const removeItem = (field, index) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
        const response = await fetch(`http://localhost:5000/api/users/guide-profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          experience: parseInt(formData.experience),
          pricePerDay: parseInt(formData.pricePerDay),
          languages: formData.languages,
          specialties: formData.specialties,
          pastPlaces: formData.pastPlaces,
          certification: formData.certification,
          bio: formData.bio,
          phone: formData.phone,
          location: formData.location
        })
      });
      
      const data = await response.json();
      console.log("Guide profile saved:", data);
      onSuccess && onSuccess();
    } catch (error) {
      console.error("Error saving guide profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">🏔️ Become a Verified Guide</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <p className="text-gray-600 mb-6">Fill in your professional details to connect with trekkers</p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience *</label>
              <input
                type="number"
                required
                value={formData.experience}
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="e.g., 8"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price per Day (NPR) *</label>
              <input
                type="number"
                required
                value={formData.pricePerDay}
                onChange={(e) => setFormData({...formData, pricePerDay: e.target.value})}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="e.g., 4500"
              />
            </div>
          </div>

          {/* Phone & Location */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="e.g., 9841234567"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location/Base City</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="e.g., Pokhara, Kathmandu"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio / Introduction</label>
            <textarea
              rows="3"
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Tell trekkers about yourself, your experience, and what makes you special..."
            />
          </div>

          {/* Languages */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Languages Spoken</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                className="flex-1 p-2 border rounded-lg"
                placeholder="e.g., English, Nepali, Hindi"
              />
              <button
                type="button"
                onClick={() => addItem("languages", newLanguage, setNewLanguage)}
                className="bg-green-600 text-white px-4 rounded-lg hover:bg-green-700"
              >
                <Plus size={20} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.languages.map((lang, i) => (
                <span key={i} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm flex items-center gap-1">
                  {lang}
                  <button type="button" onClick={() => removeItem("languages", i)} className="hover:text-red-600">
                    <Trash2 size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Specialties */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Specialties (What you're best at)</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newSpecialty}
                onChange={(e) => setNewSpecialty(e.target.value)}
                className="flex-1 p-2 border rounded-lg"
                placeholder="e.g., High Altitude, Photography, Bird Watching"
              />
              <button
                type="button"
                onClick={() => addItem("specialties", newSpecialty, setNewSpecialty)}
                className="bg-green-600 text-white px-4 rounded-lg hover:bg-green-700"
              >
                <Plus size={20} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.specialties.map((spec, i) => (
                <span key={i} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center gap-1">
                  {spec}
                  <button type="button" onClick={() => removeItem("specialties", i)} className="hover:text-red-600">
                    <Trash2 size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Past Places */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Past Trekking Places</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newPlace}
                onChange={(e) => setNewPlace(e.target.value)}
                className="flex-1 p-2 border rounded-lg"
                placeholder="e.g., Everest Base Camp, Annapurna Circuit"
              />
              <button
                type="button"
                onClick={() => addItem("pastPlaces", newPlace, setNewPlace)}
                className="bg-green-600 text-white px-4 rounded-lg hover:bg-green-700"
              >
                <Plus size={20} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.pastPlaces.map((place, i) => (
                <span key={i} className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm flex items-center gap-1">
                  {place}
                  <button type="button" onClick={() => removeItem("pastPlaces", i)} className="hover:text-red-600">
                    <Trash2 size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Certifications (if any)</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newCert}
                onChange={(e) => setNewCert(e.target.value)}
                className="flex-1 p-2 border rounded-lg"
                placeholder="e.g., Wilderness First Aid, High Altitude Guide"
              />
              <button
                type="button"
                onClick={() => addItem("certification", newCert, setNewCert)}
                className="bg-green-600 text-white px-4 rounded-lg hover:bg-green-700"
              >
                <Plus size={20} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.certification.map((cert, i) => (
                <span key={i} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm flex items-center gap-1">
                  {cert}
                  <button type="button" onClick={() => removeItem("certification", i)} className="hover:text-red-600">
                    <Trash2 size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-2 rounded-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit & Become Guide"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GuideRegistrationForm;