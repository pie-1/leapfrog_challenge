import mongoose from 'mongoose';

const bidSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceProvider', required: true },
  amount: { type: Number, required: true },
  message: { type: String },
  estimatedTime: { type: String },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'rejected', 'expired'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Bid', bidSchema);