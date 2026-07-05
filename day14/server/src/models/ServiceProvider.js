import mongoose from 'mongoose';

const serviceProviderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  serviceType: { type: String, required: true },
  specialization: { type: String },
  experience: { type: Number, required: true },
  description: { type: String },
  about: { type: String },
  hourlyRate: { type: Number, required: true },
  availability: {
    monday: { start: String, end: String },
    tuesday: { start: String, end: String },
    wednesday: { start: String, end: String },
    thursday: { start: String, end: String },
    friday: { start: String, end: String },
    saturday: { start: String, end: String },
    sunday: { start: String, end: String },
  },
  responseTime: { type: String, default: 'Within 1 hour' },
  tools: [{ type: String }],
  certifications: [{ type: String }],
  rating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  verified: { type: Boolean, default: false },
  documents: {
    aadhar: { type: String },
    pan: { type: String },
    certificate: { type: String },
  },
  location: {
    lat: Number,
    lng: Number,
    address: String,
  },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('ServiceProvider', serviceProviderSchema);