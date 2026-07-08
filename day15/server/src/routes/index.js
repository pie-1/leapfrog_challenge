const express = require('express');
const router = express.Router();

// Import routes
const authRoutes = require('./authRoutes');
// Add other routes as they are created

router.use('/auth', authRoutes);
// router.use('/users', userRoutes);
// router.use('/items', itemRoutes);
// router.use('/borrow', borrowRoutes);
// router.use('/messages', messageRoutes);
// router.use('/events', eventRoutes);
// router.use('/projects', projectRoutes);
// router.use('/notifications', notificationRoutes);

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;