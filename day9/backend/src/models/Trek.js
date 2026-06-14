const mongoose = require('mongoose');

const trekSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Moderate', 'Hard'], required: true },
  altitude: { type: Number, required: true },
  budget: { type: Number, required: true },
  location: { type: String, required: true },
  region: { type: String, required: true },
  coordinates: { type: [Number], required: true },
  image: { type: String, default: '/images/mountain.jpg' },
  description: { type: String },
  bestSeason: { type: String },
  permits: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Trek', trekSchema);