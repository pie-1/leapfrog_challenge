const mongoose = require('mongoose');

const guideSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  experience: { type: Number, required: true },
  languages: [{ type: String }],
  region: { type: String, required: true },
  pricePerDay: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  verified: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Guide', guideSchema);