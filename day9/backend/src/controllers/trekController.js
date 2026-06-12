const treks = require("../data/treks");
const { loadMountainPasses } = require("../utils/geojsonParser");

// Cache passes (load once, not on every request)
let cachedPasses = null;

const getPasses = () => {
  if (!cachedPasses) {
    cachedPasses = loadMountainPasses();
  }
  return cachedPasses;
};

// Get ALL treks (for cards and filters)
const getAllTreks = (req, res) => {
  res.json(treks);
};

// Get ALL map points (treks + passes combined)
const getAllMapPoints = (req, res) => {
  const passes = getPasses();
  const mapPoints = {
    treks: treks.map(trek => ({ ...trek, type: 'trek' })),
    passes: passes
  };
  res.json(mapPoints);
};

// Search and filter (only on treks, not passes)
const searchTreks = (req, res) => {
  const query = req.query.q?.toLowerCase() || "";
  const results = treks.filter((trek) =>
    trek.name.toLowerCase().includes(query)
  );
  res.json(results);
};

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

module.exports = {
  getAllTreks,
  getAllMapPoints,
  searchTreks,
  filterTreks,
};