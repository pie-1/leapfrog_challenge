const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  // Business Information
  businessName: { type: String, required: true, trim: true },
  category: { 
    type: String, 
    required: true,
    enum: ['Venue', 'Hotel', 'Photographer', 'Videographer', 'Catering', 
           'Decorations', 'Music', 'Attire', 'Transport', 'Accommodation',
           'Mehendi', 'Makeup', 'Beautician', 'Event Planner', 'Other']
  },
  description: { type: String, required: true },
  
  // Contact Information
  contactPerson: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  
  // Pricing
  pricing: {
    startingPrice: { type: Number, required: true },
    maxPrice: { type: Number },
    currency: { type: String, default: 'INR' },
    pricingModel: { 
      type: String, 
      enum: ['Fixed', 'Hourly', 'Package', 'Custom'],
      default: 'Custom'
    }
  },
  
  // Verification
  website: { type: String },
  socialMedia: {
    instagram: { type: String },
    facebook: { type: String },
    youtube: { type: String },
    googleMaps: { type: String }
  },
  verified: { type: Boolean, default: false },
  
  // Portfolio
  portfolio: [{
    title: { type: String },
    description: { type: String },
    imageUrl: { type: String }
  }],
  
  // Ratings
  rating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  
  // Availability
  available: { type: Boolean, default: true },
  
  // Vendor User ID (Firebase UID)
  userId: { type: String, required: true, index: true },
  
  // Additional Features
  features: [String],
  capacity: { type: Number },
  packages: [{
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    includes: [String]
  }],
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Vendor', vendorSchema);