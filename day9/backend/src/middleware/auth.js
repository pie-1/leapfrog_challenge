// Simple auth middleware for now (will work without Firebase)
const authenticate = async (req, res, next) => {
  // For now, just pass through (we'll add real auth later)
  req.userId = 'temp_user_123';
  next();
};

module.exports = { authenticate };