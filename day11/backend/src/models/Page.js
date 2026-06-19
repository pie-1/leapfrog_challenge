import mongoose from 'mongoose';

const pageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy' },
  imageData: { type: String, required: true }, // SVG string
  thumbnail: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Page', pageSchema);