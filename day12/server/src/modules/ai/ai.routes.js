const express = require('express');
const router = express.Router();
const aiController = require('./ai.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

// All routes require authentication
router.use(authMiddleware);

// Vendor recommendations
router.post('/recommendations', aiController.getRecommendations);

// Budget optimization
router.post('/optimize-budget', aiController.optimizeBudget);

// Wedding timeline
router.post('/timeline', aiController.getTimeline);

// Vendor matching
router.get('/match-vendors/:weddingId', aiController.matchVendors);

module.exports = router;