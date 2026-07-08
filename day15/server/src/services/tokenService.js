const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const logger = require('../utils/logger');

class TokenService {
  static generateAccessToken(userId) {
    return jwt.sign(
      { id: userId },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: process.env.JWT_ACCESS_EXPIRY || '15m' }
    );
  }

  static generateRefreshToken(userId) {
    return jwt.sign(
      { id: userId },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRY || '7d' }
    );
  }

  static generateVerificationToken() {
    return crypto.randomBytes(32).toString('hex');
  }

  static generateResetToken() {
    return crypto.randomBytes(32).toString('hex');
  }

  static verifyAccessToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (error) {
      logger.error('Access token verification failed:', error.message);
      return null;
    }
  }

  static verifyRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
      logger.error('Refresh token verification failed:', error.message);
      return null;
    }
  }

  static async saveRefreshToken(userId, refreshToken) {
    await User.findByIdAndUpdate(userId, { refreshToken });
  }

  static async revokeRefreshToken(userId) {
    await User.findByIdAndUpdate(userId, { refreshToken: null });
  }

  static async refreshAccessToken(refreshToken) {
    try {
      // Verify refresh token
      const decoded = this.verifyRefreshToken(refreshToken);
      if (!decoded) {
        throw new Error('Invalid refresh token');
      }

      // Find user with this refresh token
      const user = await User.findOne({
        _id: decoded.id,
        refreshToken: refreshToken
      });

      if (!user) {
        throw new Error('Refresh token not found or revoked');
      }

      // Generate new access token
      const newAccessToken = this.generateAccessToken(user._id);

      return {
        success: true,
        accessToken: newAccessToken,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          faculty: user.faculty
        }
      };
    } catch (error) {
      logger.error('Refresh token error:', error.message);
      return {
        success: false,
        message: error.message
      };
    }
  }
}

module.exports = TokenService;