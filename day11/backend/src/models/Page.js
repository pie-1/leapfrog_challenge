import mongoose from 'mongoose';

const pageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, default: 'Uploaded' },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy' },
  
  // Original PDF storage
  originalPDF: { type: String }, // Path to stored PDF file
  totalPages: { type: Number, default: 1 },
  
  // Page previews (as SVGs or image data)
  pages: [{
    pageNumber: Number,
    preview: { type: String }, // Base64 or URL
    width: Number,
    height: Number
  }],
  
  // User coloring data (optional)
  userColoring: { type: Object, default: {} },
  
  isPublic: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Page', pageSchema);