import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceProvider', default: null },
  serviceType: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String, default: '' },
  totalAmount: { type: Number, default: 0 },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' },
  rating: { type: Number, min: 1, max: 5 },
  review: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Booking', bookingSchema);