import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({
  score: {
    type: Number,
    required: true,
    min: 0
  },
  vehicle: {
    type: String,
    enum: ['car', 'bike', 'plane', 'helicopter'],
    required: true
  },
  playerName: {
    type: String,
    default: 'Anonymous',
    maxlength: 20
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

scoreSchema.index({ score: -1 });

export default mongoose.model('Score', scoreSchema);