const Notification = require('../models/Notification');
const logger = require('../utils/logger');

class NotificationService {
  static async createNotification(data) {
    try {
      const notification = await Notification.create({
        user: data.user,
        type: data.type,
        message: data.message,
        relatedId: data.relatedId,
        onModel: data.onModel,
        metadata: data.metadata || {}
      });

      return notification;
    } catch (error) {
      logger.error('Notification creation error:', error);
      return null;
    }
  }

  static async getNotifications(userId, page = 1, limit = 20) {
    try {
      const skip = (page - 1) * limit;

      const [notifications, total] = await Promise.all([
        Notification.find({ user: userId })
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),
        Notification.countDocuments({ user: userId })
      ]);

      return {
        notifications,
        total,
        page,
        totalPages: Math.ceil(total / limit),
        unreadCount: await Notification.getUnreadCount(userId)
      };
    } catch (error) {
      logger.error('Get notifications error:', error);
      throw error;
    }
  }

  static async markAsRead(notificationId, userId) {
    const notification = await Notification.findOneAndUpdate(
      { _id: notificationId, user: userId },
      { read: true, readAt: new Date() },
      { new: true }
    );
    return notification;
  }

  static async markAllAsRead(userId) {
    return Notification.markAllAsRead(userId);
  }
}

module.exports = NotificationService;