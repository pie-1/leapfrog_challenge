const fs = require('fs');
const path = require('path');

// Load and parse mountain passes
const loadMountainPasses = () => {
  try {
    const rawData = fs.readFileSync(
      path.join(__dirname, '../data/mountain-passes-nepal.geojson'),
      'utf8'
    );
    const geojson = JSON.parse(rawData);
    
    // Convert GeoJSON features to your trek-like format
    const passes = geojson.features.map((feature, index) => ({
      id: `pass_${index + 100}`, // Use different ID range to avoid conflicts
      name: feature.properties.name,
      type: 'pass', // To distinguish from treks
      altitude: feature.properties.elevation_m,
      region: feature.properties.region,
      country: feature.properties.country,
      coordinates: [
        feature.geometry.coordinates[1], // latitude
        feature.geometry.coordinates[0]  // longitude
      ],
      // Additional fields for UI
      difficulty: 'Unknown', // Passes don't have difficulty
      budget: null,
      duration: null,
      image: '/images/mountain.jpg',
      description: `High mountain pass in ${feature.properties.region} at ${feature.properties.elevation_m}m`
    }));
    
    console.log(` Loaded ${passes.length} mountain passes`);
    return passes;
  } catch (error) {
    console.error('Error loading GeoJSON:', error);
    return [];
  }
};

module.exports = { loadMountainPasses };