const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['books', 'tools', 'games']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    minlength: [10, 'Description must be at least 10 characters'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  condition: {
    type: String,
    required: [true, 'Condition is required'],
    enum: ['New', 'Like New', 'Good', 'Fair', 'Poor']
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  image_urls: [{
    type: String,
    validate: {
      validator: function(v) {
        return v.length <= 5; // Max 5 images
      },
      message: 'Maximum 5 images allowed'
    }
  }],
  number_of_items: {
    type: Number,
    required: [true, 'Number of items is required'],
    min: [1, 'Must have at least 1 item'],
    max: [10, 'Maximum 10 items allowed']
  },
  is_available: {
    type: Boolean,
    default: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  facultyRestriction: [{
    type: String,
    enum: ['BE Computer', 'Architecture', 'Civil', 'BIT']
  }],
  borrowCount: {
    type: Number,
    default: 0
  },
  averageRating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for search
itemSchema.index({ title: 'text', description: 'text', tags: 'text' });

// Virtual field for current borrow status
itemSchema.virtual('currentBorrowRequest').get(function() {
  // This would be populated in the query
  return null;
});

// Pre-save middleware
itemSchema.pre('save', function(next) {
  // Ensure tags are unique and lowercase
  if (this.tags && this.tags.length > 0) {
    this.tags = [...new Set(this.tags.map(tag => tag.toLowerCase().trim()))];
  }
  next();
});

// Instance methods
itemSchema.methods.isAvailable = function() {
  return this.is_available && this.number_of_items > 0;
};

// Static methods
itemSchema.statics.findAvailable = function() {
  return this.find({ is_available: true, number_of_items: { $gt: 0 } });
};

itemSchema.statics.findByCategory = function(category) {
  return this.find({ category, is_available: true });
};

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;