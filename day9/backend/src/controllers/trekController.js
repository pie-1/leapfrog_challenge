const Trek = require('../models/Trek');
const { loadMountainPasses } = require('../utils/geojsonParser');
const { getRoute } = require('../utils/routingService');

let cachedPasses = null;

const getPasses = () => {
  if (!cachedPasses) {
    cachedPasses = loadMountainPasses();
  }
  return cachedPasses;
};

// Get ALL treks from MongoDB
const getAllTreks = async (req, res) => {
  try {
    const treks = await Trek.find();
    res.json(treks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get ALL map points (treks + passes)
const getAllMapPoints = async (req, res) => {
  try {
    const treks = await Trek.find();
    const passes = getPasses();
    res.json({
      treks: treks.map(trek => ({ ...trek.toObject(), type: 'trek' })),
      passes: passes
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search treks
const searchTreks = async (req, res) => {
  try {
    const query = req.query.q || '';
    const treks = await Trek.find({
      name: { $regex: query, $options: 'i' }
    });
    res.json(treks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Filter treks
const filterTreks = async (req, res) => {
  try {
    const { difficulty, maxBudget } = req.query;
    let filter = {};
    
    if (difficulty) filter.difficulty = difficulty;
    if (maxBudget) filter.budget = { $lte: parseInt(maxBudget) };
    
    const treks = await Trek.find(filter);
    res.json(treks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get route to trek
const getRouteToTrek = async (req, res) => {
  const { userLat, userLng, trekLat, trekLng } = req.query;
  
  if (!userLat || !userLng || !trekLat || !trekLng) {
    return res.status(400).json({ error: 'Missing coordinates' });
  }
  
  const route = await getRoute(
    parseFloat(userLat), 
    parseFloat(userLng),
    parseFloat(trekLat), 
    parseFloat(trekLng)
  );
  
  if (route.success) {
    res.json({
      route: route.coordinates,
      distance: route.distance,
      duration: route.duration
    });
  } else {
    res.status(500).json({ error: route.error });
  }
};

module.exports = {
  getAllTreks,
  getAllMapPoints,
  searchTreks,
  filterTreks,
  getRouteToTrek,
};