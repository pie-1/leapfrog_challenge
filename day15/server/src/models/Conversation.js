const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  },
  lastMessageAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Ensure unique conversation between two users
conversationSchema.index({ participants: 1 }, { unique: true });

conversationSchema.statics.getOrCreate = async function(user1Id, user2Id) {
  let conversation = await this.findOne({
    participants: { $all: [user1Id, user2Id], $size: 2 }
  });

  if (!conversation) {
    conversation = await this.create({
      participants: [user1Id, user2Id]
    });
  }

  return conversation;
};

const Conversation = mongoose.model('Conversation', conversationSchema);
module.exports = Conversation;