// TEMPORARY: For development - bypasses authentication
// Replace this with real Firebase verification later
const authMiddleware = (req, res, next) => {
  // For testing, use a test user
  req.user = {
    uid: 'test_user_123',
    email: 'test@example.com',
    name: 'Test User',
  };
  next();
};

module.exports = authMiddleware;