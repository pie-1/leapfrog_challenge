const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  type: {
    type: String,
    required: true,
    enum: [
      'borrow_request',
      'borrow_accepted',
      'borrow_declined',
      'item_returned',
      'message',
      'event_invite',
      'team_invite',
      'project_like',
      'borrow_overdue',
      'system'
    ]
  },
  message: {
    type: String,
    required: true,
    maxlength: [500, 'Message cannot exceed 500 characters']
  },
  relatedId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'onModel'
  },
  onModel: {
    type: String,
    enum: ['BorrowRequest', 'Message', 'Event', 'Project', 'Item']
  },
  read: {
    type: Boolean,
    default: false
  },
  readAt: {
    type: Date
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true
});

// Index for efficient queries
notificationSchema.index({ user: 1, read: 1 });
notificationSchema.index({ createdAt: -1 });

// Pre-save middleware
notificationSchema.pre('save', function(next) {
  if (this.isModified('read') && this.read) {
    this.readAt = new Date();
  }
  next();
});

// Static methods
notificationSchema.statics.markAllAsRead = async function(userId) {
  return this.updateMany(
    { user: userId, read: false },
    { read: true, readAt: new Date() }
  );
};

notificationSchema.statics.getUnreadCount = async function(userId) {
  return this.countDocuments({ user: userId, read: false });
};

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;