const socketIO = require('socket.io');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const NotificationService = require('../services/notificationService');
const logger = require('../utils/logger');

const createSocketServer = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:5173',
      credentials: true,
      methods: ['GET', 'POST']
    },
    pingTimeout: 60000,
    pingInterval: 25000
  });

  // Authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      
      if (!token) {
        return next(new Error('Authentication required'));
      }

      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        return next(new Error('User not found'));
      }

      socket.user = user;
      socket.userId = user._id.toString();
      next();
    } catch (error) {
      logger.error('Socket authentication error:', error);
      next(new Error('Authentication failed'));
    }
  });

  io.on('connection', (socket) => {
    logger.info(`User connected: ${socket.userId}`);

    // Join user's personal room
    socket.join(`user:${socket.userId}`);

    // Handle joining conversation
    socket.on('join-conversation', (conversationId) => {
      socket.join(`conversation:${conversationId}`);
      logger.info(`User ${socket.userId} joined conversation ${conversationId}`);
    });

    // Handle leaving conversation
    socket.on('leave-conversation', (conversationId) => {
      socket.leave(`conversation:${conversationId}`);
      logger.info(`User ${socket.userId} left conversation ${conversationId}`);
    });

    // Handle typing indicator
    socket.on('typing', ({ conversationId, receiverId }) => {
      socket.to(`conversation:${conversationId}`).emit('user-typing', {
        userId: socket.userId,
        userName: socket.user.name
      });
    });

    // Handle stop typing
    socket.on('stop-typing', ({ conversationId }) => {
      socket.to(`conversation:${conversationId}`).emit('user-stop-typing', {
        userId: socket.userId
      });
    });

    // Handle new message
    socket.on('send-message', async (data) => {
      try {
        const { receiverId, message, conversationId } = data;

        // Get or create conversation
        let conversation;
        if (conversationId) {
          conversation = await Conversation.findById(conversationId);
        } else {
          conversation = await Conversation.getOrCreate(socket.userId, receiverId);
        }

        // Create message
        const newMessage = await Message.create({
          conversation: conversation._id,
          sender: socket.userId,
          receiver: receiverId,
          message
        });

        // Populate sender info
        await newMessage.populate('sender', 'name email');

        // Update conversation last message
        conversation.lastMessage = newMessage._id;
        conversation.lastMessageAt = new Date();
        await conversation.save();

        // Emit to conversation room
        io.to(`conversation:${conversation._id}`).emit('new-message', {
          message: newMessage,
          conversationId: conversation._id
        });

        // Notify receiver
        io.to(`user:${receiverId}`).emit('message-notification', {
          from: socket.userId,
          message: newMessage,
          conversationId: conversation._id
        });

        // Create notification for receiver
        await NotificationService.createNotification({
          user: receiverId,
          type: 'message',
          message: `${socket.user.name} sent you a message`,
          relatedId: newMessage._id,
          onModel: 'Message',
          metadata: {
            conversationId: conversation._id,
            senderName: socket.user.name
          }
        });

      } catch (error) {
        logger.error('Send message error:', error);
        socket.emit('message-error', {
          error: 'Failed to send message'
        });
      }
    });

    // Handle mark as read
    socket.on('mark-read', async ({ messageIds, conversationId }) => {
      try {
        await Message.markAsRead(messageIds, socket.userId);
        
        io.to(`conversation:${conversationId}`).emit('messages-read', {
          messageIds,
          userId: socket.userId
        });
      } catch (error) {
        logger.error('Mark read error:', error);
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      logger.info(`User disconnected: ${socket.userId}`);
    });
  });

  return io;
};

module.exports = { createSocketServer };