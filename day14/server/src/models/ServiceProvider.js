import mongoose from 'mongoose';

const providerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  serviceType: { type: String, required: true },
  experience: { type: Number, required: true },
  description: { type: String },
  hourlyRate: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  verified: { type: Boolean, default: false },
  documents: {
    aadhar: { type: String },
    pan: { type: String },
    certificate: { type: String },
  },
  availability: { type: Boolean, default: true },
  location: {
    lat: Number,
    lng: Number,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('ServiceProvider', providerSchema);