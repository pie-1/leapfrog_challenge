import mongoose from 'mongoose';

const pageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, default: 'Uploaded' },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy' },
  imageData: { type: String, required: true }, // Base64 data URL
  thumbnail: { type: String },
  isPublic: { type: Boolean, default: true },
  isPDF: { type: Boolean, default: false },
  originalFileName: { type: String },
  fileType: { type: String },
  fileSize: { type: Number },
  pageNumber: { type: Number, default: 1 },
  totalPages: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Page', pageSchema);