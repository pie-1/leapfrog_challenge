import { useState, useEffect } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import PageLayout from "../components/common/PageLayout";

const Safety = () => {
  const [emergencyContacts, setEmergencyContacts] = useState(() => {
    const saved = localStorage.getItem("emergencyContacts");
    return saved ? JSON.parse(saved) : [
      { name: "Police", number: "100", relation: "Emergency" },
      { name: "Ambulance", number: "102", relation: "Medical" },
      { name: "Family Member", number: "", relation: "Relative" },
    ];
  });

  const [newContact, setNewContact] = useState({ name: "", number: "", relation: "" });
  const [showAddForm, setShowAddForm] = useState(false);

  // Save contacts to localStorage
  useEffect(() => {
    localStorage.setItem("emergencyContacts", JSON.stringify(emergencyContacts));
  }, [emergencyContacts]);

  const addContact = () => {
    if (newContact.name && newContact.number) {
      setEmergencyContacts([...emergencyContacts, newContact]);
      setNewContact({ name: "", number: "", relation: "" });
      setShowAddForm(false);
    }
  };

  const deleteContact = (index) => {
    setEmergencyContacts(emergencyContacts.filter((_, i) => i !== index));
  };

  const sendSOSLocation = () => {
    if (emergencyContacts.filter(c => c.number).length === 0) {
      alert("Please add at least one emergency contact first!");
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const locationLink = `https://maps.google.com/?q=${latitude},${longitude}`;
        
        // In production, this would send SMS/email to all contacts
        const message = `🚨 SOS! I need help. My location: ${locationLink}`;
        
        // For demo, show which contacts would be notified
        const contactList = emergencyContacts.filter(c => c.number).map(c => `${c.name} (${c.relation}): ${c.number}`).join("\n");
        
        alert(`📍 SOS Location Captured!\n\nWill notify:\n${contactList}\n\nLocation link:\n${locationLink}`);
      });
    } else {
      alert("Please enable location services");
    }
  };

  return (
    <PageLayout title="🚨 Fast Help" subtitle="Emergency contacts & one-tap SOS">
      
      {/* Emergency Contacts Management */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">📞 My Emergency Contacts</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            <Plus size={18} /> Add Contact
          </button>
        </div>

        {/* Add Contact Form */}
        {showAddForm && (
          <div className="bg-gray-50 p-4 rounded-xl mb-4">
            <input
              type="text"
              placeholder="Name"
              value={newContact.name}
              onChange={(e) => setNewContact({...newContact, name: e.target.value})}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={newContact.number}
              onChange={(e) => setNewContact({...newContact, number: e.target.value})}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              placeholder="Relation (e.g., Mother, Brother, Police)"
              value={newContact.relation}
              onChange={(e) => setNewContact({...newContact, relation: e.target.value})}
              className="w-full p-2 border rounded mb-2"
            />
            <button
              onClick={addContact}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
            >
              <Save size={16} className="inline mr-1" /> Save Contact
            </button>
          </div>
        )}

        {/* Contact List */}
        <div className="space-y-2">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold">{contact.name}</p>
                <p className="text-sm text-gray-500">{contact.relation} • {contact.number || "Not set"}</p>
              </div>
              <button
                onClick={() => deleteContact(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SOS Button */}
      <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-8 mb-8 text-center">
        <button
          onClick={sendSOSLocation}
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-xl animate-pulse shadow-lg"
        >
          🚨 SEND SOS WITH MY LOCATION
        </button>
        <p className="text-sm text-gray-600 mt-4">
          Your location will be shared with {emergencyContacts.filter(c => c.number).length} emergency contact(s)
        </p>
      </div>

      {/* Quick Dial Grid */}
      <div className="grid md:grid-cols-3 gap-4">
        <a href="tel:100" className="bg-blue-600 text-white p-4 rounded-xl text-center">
          <div className="font-bold">🚔 Police</div>
          <div className="text-2xl">100</div>
        </a>
        <a href="tel:102" className="bg-red-600 text-white p-4 rounded-xl text-center">
          <div className="font-bold">🚑 Ambulance</div>
          <div className="text-2xl">102</div>
        </a>
        <a href="tel:1144" className="bg-orange-600 text-white p-4 rounded-xl text-center">
          <div className="font-bold">🛡️ Tourist Police</div>
          <div className="text-2xl">1144</div>
        </a>
      </div>
    </PageLayout>
  );
};

export default Safety;