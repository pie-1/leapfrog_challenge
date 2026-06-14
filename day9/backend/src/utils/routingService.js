// OSRM with better route geometry
const getRoute = async (startLat, startLng, endLat, endLng) => {
  try {
    // Use car routing for better road network
    const response = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson&steps=true&alternatives=true`
    );
    
    const data = await response.json();
    
    if (data.code === 'Ok' && data.routes[0]) {
      const route = data.routes[0];
      // Get full geometry with all points
      const coordinates = route.geometry.coordinates.map(coord => [coord[1], coord[0]]);
      const distance = (route.distance / 1000).toFixed(1);
      const duration = Math.round(route.duration / 60);
      
      // Also get waypoints for better visualization
      const waypoints = route.legs[0].steps.map(step => ({
        name: step.name,
        distance: (step.distance / 1000).toFixed(1),
        duration: Math.round(step.duration / 60),
        coordinates: [step.maneuver.location[1], step.maneuver.location[0]]
      }));
      
      return {
        success: true,
        coordinates: coordinates,
        distance: distance,
        duration: duration,
        waypoints: waypoints,
        instruction: route.legs[0].steps[0]?.maneuver?.instruction || "Start your journey"
      };
    }
    
    return { success: false, error: 'No route found' };
  } catch (error) {
    console.error('Routing error:', error);
    return { success: false, error: error.message };
  }
};

module.exports = { getRoute };