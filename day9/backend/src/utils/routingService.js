// Using OSRM - No API key required
const getRoute = async (startLat, startLng, endLat, endLng) => {
  try {
    const response = await fetch(
      `https://router.project-osrm.org/route/v1/foot/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson`
    );
    
    const data = await response.json();
    
    if (data.code === 'Ok' && data.routes[0]) {
      const route = data.routes[0];
      const coordinates = route.geometry.coordinates.map(coord => [coord[1], coord[0]]);
      
      return {
        success: true,
        coordinates: coordinates,
        distance: (route.distance / 1000).toFixed(1),
        duration: Math.round(route.duration / 60)
      };
    }
    
    return { success: false, error: 'No route found' };
  } catch (error) {
    console.error('Routing error:', error);
    return { success: false, error: error.message };
  }
};

const getTrekTrail = (trekId) => {
  const trails = {
    1: [[27.9881, 86.925], [27.9042, 86.8607], [27.8037, 86.7148]],
    2: [[28.5983, 83.9311], [28.5682, 83.9624], [28.5733, 83.9856]]
  };
  return trails[trekId] || null;
};

module.exports = { getRoute, getTrekTrail };