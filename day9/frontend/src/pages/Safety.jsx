import { useState, useEffect } from "react";
import { Phone, Plus, Trash2, Save, AlertTriangle, Navigation } from "lucide-react";
import PageLayout from "../components/common/PageLayout";

const Safety = () => {
  const [emergencyContacts, setEmergencyContacts] = useState(() => {
    const saved = localStorage.getItem("emergencyContacts");
    return saved
      ? JSON.parse(saved)
      : [
          { name: "Police", number: "100", relation: "Emergency" },
          { name: "Ambulance", number: "102", relation: "Medical" },
        ];
  });

  const [newContact, setNewContact] = useState({ name: "", number: "", relation: "" });
  const [showAddForm, setShowAddForm] = useState(false);
  const [sending, setSending] = useState(false);

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
    const validContacts = emergencyContacts.filter(c => c.number);
    if (validContacts.length === 0) {
      alert("Please add at least one emergency contact");
      return;
    }

    setSending(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const locationLink = `https://maps.google.com/?q=${latitude},${longitude}`;
        const contacts = validContacts.map(c => `${c.name}: ${c.number}`).join("\n");
        alert(`📍 SOS Location Sent!\n\nContacts notified:\n${contacts}\n\nLocation: ${locationLink}`);
        setSending(false);
      },
      () => {
        alert("Please enable location access");
        setSending(false);
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <PageLayout title="Fast Help" subtitle="Emergency contacts & one-tap SOS">
      
      {/* SOS Button - Hero Section */}
      <div className="text-center mb-12">
        <button
          onClick={sendSOSLocation}
          disabled={sending}
          className={`relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-white transition-all shadow-lg ${
            sending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 hover:scale-105"
          }`}
        >
          <AlertTriangle size={22} />
          {sending ? "Sending..." : "Emergency SOS"}
          <Navigation size={18} className="opacity-80" />
        </button>
        <p className="text-sm text-gray-500 mt-3">
          Sends your live location to {emergencyContacts.filter(c => c.number).length} saved contact(s)
        </p>
      </div>

      {/* Emergency Contacts Section */}
      <div className="bg-gray rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Emergency Contacts</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1"
          >
            <Plus size={16} /> Add
          </button>
        </div>

        <div className="p-6">
          {showAddForm && (
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Name"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={newContact.number}
                  onChange={(e) => setNewContact({ ...newContact, number: e.target.value })}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="text"
                  placeholder="Relation"
                  value={newContact.relation}
                  onChange={(e) => setNewContact({ ...newContact, relation: e.target.value })}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  onClick={addContact}
                  className="px-4 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Save size={18} />
                </button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {emergencyContacts.map((contact, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Phone size={18} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{contact.name}</p>
                    <p className="text-sm text-gray-500">
                      {contact.relation} • {contact.number || "Not added"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {contact.number && (
                    <a
                      href={`tel:${contact.number}`}
                      className="text-green-600 text-sm font-medium px-3 py-1 rounded-lg hover:bg-green-50"
                    >
                      Call
                    </a>
                  )}
                  <button
                    onClick={() => deleteContact(index)}
                    className="text-gray-400 hover:text-red-500 p-1"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Dial */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Dial</h2>
        <div className="grid grid-cols-3 gap-4">
          <a
            href="tel:100"
            className="bg-orange border border-gray-400 rounded-xl py-4 text-center hover:border-green-300 hover:shadow-md transition"
          >
            <div className="text-2xl mb-1">🚔</div>
            <div className="font-bold text-gray-800">100</div>
            <div className="text-xs text-gray-500">Police</div>
          </a>
          <a
            href="tel:102"
            className="bg-white border border-gray-200 rounded-xl py-4 text-center hover:border-green-300 hover:shadow-md transition"
          >
            <div className="text-2xl mb-1">🚑</div>
            <div className="font-bold text-gray-800">102</div>
            <div className="text-xs text-gray-500">Ambulance</div>
          </a>
          <a
            href="tel:1144"
            className="bg-white border border-gray-200 rounded-xl py-4 text-center hover:border-green-300 hover:shadow-md transition"
          >
            <div className="text-2xl mb-1">🛡️</div>
            <div className="font-bold text-gray-800">1144</div>
            <div className="text-xs text-gray-500">Tourist Police</div>
          </a>
        </div>
      </div>
    </PageLayout>
  );
};

export default Safety;