import mongoose from 'mongoose';

const pageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, default: 'Uploaded' },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy' },
  
  // For images: store base64 directly
  imageData: { type: String },
  
  // For PDFs: store file path and previews
  filePath: { type: String },
  fileType: { type: String },
  isPDF: { type: Boolean, default: false },
  totalPages: { type: Number, default: 1 },
  pages: [{
    pageNumber: Number,
    preview: { type: String }, // base64 image of page
    width: Number,
    height: Number
  }],
  
  originalFileName: { type: String },
  isPublic: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Page', pageSchema);