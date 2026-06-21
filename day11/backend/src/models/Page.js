import mongoose from 'mongoose';

const pageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, default: 'Uploaded' },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy' },
  imageData: { type: String, required: true },
  thumbnail: { type: String },
  isPublic: { type: Boolean, default: true },
  originalFileName: { type: String }, // Store original name
  fileType: { type: String }, // PDF or image type
  pageNumber: { type: Number, default: 1 }, // For multi-page PDFs
  totalPages: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Page', pageSchema);