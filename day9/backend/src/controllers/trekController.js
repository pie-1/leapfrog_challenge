const treks = require("../data/treks");
const { loadMountainPasses } = require("../utils/geojsonParser");
const { getRoute, getTrekTrail } = require("../utils/routingService");

// Cache passes
let cachedPasses = null;

const getPasses = () => {
  if (!cachedPasses) {
    cachedPasses = loadMountainPasses();
  }
  return cachedPasses;
};

// Get ALL treks
const getAllTreks = (req, res) => {
  res.json(treks);
};

// Get ALL map points
const getAllMapPoints = (req, res) => {
  const passes = getPasses();
  const mapPoints = {
    treks: treks.map(trek => ({ ...trek, type: 'trek' })),
    passes: passes
  };
  res.json(mapPoints);
};

// Search treks
const searchTreks = (req, res) => {
  const query = req.query.q?.toLowerCase() || "";
  const results = treks.filter((trek) =>
    trek.name.toLowerCase().includes(query)
  );
  res.json(results);
};

// Filter treks
const filterTreks = (req, res) => {
  const { difficulty, maxBudget } = req.query;
  let results = [...treks];

  if (difficulty) {
    results = results.filter((trek) => trek.difficulty === difficulty);
  }

  if (maxBudget) {
    results = results.filter((trek) => trek.budget <= parseInt(maxBudget));
  }

  res.json(results);
};

// NEW: Get route to trek
const getRouteToTrek = async (req, res) => {
  const { userLat, userLng, trekLat, trekLng, trekId } = req.query;
  
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
    const trail = trekId ? getTrekTrail(parseInt(trekId)) : null;
    
    res.json({
      route: route.coordinates,
      distance: route.distance,
      duration: route.duration,
      trail: trail
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