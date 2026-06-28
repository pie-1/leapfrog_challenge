const aiService = require('../../services/ai.service');
const Vendor = require('../vendor/vendor.model');

const getRecommendations = async (req, res, next) => {
  try {
    const { budget, location, guests, style, eventType, category } = req.body;

    // Get all available vendors
    const vendors = await Vendor.find({ available: true });
    
    // Use AI for recommendations (with fallback)
    const recommendations = await aiService.getVendorRecommendations(
      { budget, location, guests, style, eventType, category },
      vendors
    );

    res.json({
      success: true,
      data: recommendations,
      source: 'AI (Grok via OpenRouter)'
    });
  } catch (error) {
    next(error);
  }
};

const optimizeBudget = async (req, res, next) => {
  try {
    const { totalBudget, events, guests, location } = req.body;
    
    const optimization = await aiService.optimizeBudgetWithAI({
      totalBudget,
      events,
      guests,
      location
    });

    res.json({
      success: true,
      data: optimization,
      source: 'AI (Grok via OpenRouter)'
    });
  } catch (error) {
    next(error);
  }
};

const getTimeline = async (req, res, next) => {
  try {
    const { weddingDate, events, location, guests } = req.body;
    
    const timeline = await aiService.getWeddingTimeline({
      weddingDate,
      events,
      location,
      guests
    });

    res.json({
      success: true,
      data: timeline,
      source: 'AI (Grok via OpenRouter)'
    });
  } catch (error) {
    next(error);
  }
};

const matchVendors = async (req, res, next) => {
  try {
    const { weddingId } = req.params;
    
    // Get wedding details
    const Wedding = require('../wedding/wedding.model');
    const wedding = await Wedding.findById(weddingId);
    
    if (!wedding) {
      return res.status(404).json({ message: 'Wedding not found' });
    }

    const vendors = await Vendor.find({ available: true });
    const matches = await aiService.getVendorMatching(wedding, vendors);

    res.json({
      success: true,
      data: matches,
      source: 'AI (Grok via OpenRouter)'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRecommendations,
  optimizeBudget,
  getTimeline,
  matchVendors
};