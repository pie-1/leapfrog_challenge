const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['traveller', 'guide', 'admin'], default: 'traveller' },
  profileImage: { type: String, default: '' },
  phone: { type: String, default: '' },
  location: { type: String, default: '' },
  bio: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  
  // Traveller specific
  savedTreks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trek' }],
  completedTreks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trek' }],
  trekStats: {
    totalDistance: { type: Number, default: 0 },
    totalAltitude: { type: Number, default: 0 },
    treksCompleted: { type: Number, default: 0 }
  },
  
  // Guide specific (using dot notation for updates)
  guideProfile: {
    experience: { type: Number, default: 0 },
    certification: [{ type: String }],
    pastPlaces: [{ type: String }],
    specialties: [{ type: String }],
    pricePerDay: { type: Number, default: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    totalReviews: { type: Number, default: 0 },
    languages: [{ type: String }],
    verified: { type: Boolean, default: false },
    availability: { type: Boolean, default: true },
    portfolio: [{ type: String }]
  }
});

module.exports = mongoose.model('User', userSchema);