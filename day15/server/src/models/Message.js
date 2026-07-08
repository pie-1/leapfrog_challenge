const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  conversation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    maxlength: [1000, 'Message cannot exceed 1000 characters'],
    trim: true
  },
  read: {
    type: Boolean,
    default: false
  },
  readAt: {
    type: Date
  },
  type: {
    type: String,
    enum: ['text', 'image', 'file'],
    default: 'text'
  },
  attachments: [{
    type: String
  }],
  deletedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

// Index for efficient queries
messageSchema.index({ conversation: 1, createdAt: -1 });

// Pre-save middleware
messageSchema.pre('save', function(next) {
  if (this.isModified('read') && this.read) {
    this.readAt = new Date();
  }
  next();
});

// Static methods
messageSchema.statics.markAsRead = async function(messageIds, userId) {
  return this.updateMany(
    { _id: { $in: messageIds }, receiver: userId, read: false },
    { read: true, readAt: new Date() }
  );
};

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;