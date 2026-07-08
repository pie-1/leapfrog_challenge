const mongoose = require('mongoose');

const borrowRequestSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  },
  borrower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined', 'returned', 'overdue'],
    default: 'pending'
  },
  expected_return_date: {
    type: Date,
    required: [true, 'Expected return date is required'],
    validate: {
      validator: function(value) {
        return value > new Date();
      },
      message: 'Expected return date must be in the future'
    }
  },
  return_date: {
    type: Date
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters'],
    trim: true
  },
  decline_reason: {
    type: String,
    maxlength: [200, 'Decline reason cannot exceed 200 characters'],
    trim: true
  },
  isOverdue: {
    type: Boolean,
    default: false
  },
  overdueDays: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for efficient queries
borrowRequestSchema.index({ item: 1, borrower: 1 });
borrowRequestSchema.index({ owner: 1, status: 1 });
borrowRequestSchema.index({ expected_return_date: 1 });

// Virtual field for isOverdue calculation
borrowRequestSchema.virtual('isOverdueCalculated').get(function() {
  if (this.status === 'returned' || this.status === 'declined') return false;
  return new Date() > this.expected_return_date;
});

// Pre-save middleware
borrowRequestSchema.pre('save', function(next) {
  if (this.status === 'accepted') {
    this.isOverdue = false;
    this.overdueDays = 0;
  }
  if (this.status === 'returned' && !this.return_date) {
    this.return_date = new Date();
  }
  next();
});

// Static methods
borrowRequestSchema.statics.hasPendingRequest = async function(itemId, userId) {
  const existing = await this.findOne({
    item: itemId,
    borrower: userId,
    status: { $in: ['pending', 'accepted'] }
  });
  return !!existing;
};

borrowRequestSchema.statics.getUserActiveBorrows = async function(userId) {
  return this.find({
    $or: [{ borrower: userId }, { owner: userId }],
    status: { $in: ['pending', 'accepted'] }
  }).populate('item');
};

const BorrowRequest = mongoose.model('BorrowRequest', borrowRequestSchema);

module.exports = BorrowRequest;