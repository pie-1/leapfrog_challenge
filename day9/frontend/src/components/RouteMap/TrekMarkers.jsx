import DifficultyMarker from "./DifficultyMarker";

const TrekMarkers = ({ treks, userLocation, getRouteToTrek }) => {
  // Filter valid treks with coordinates
  const validTreks = treks.filter(trek => {
    const lat = trek.coordinates?.[0] ?? trek.lat;
    const lng = trek.coordinates?.[1] ?? trek.lng;
    return lat && lng && typeof lat === 'number' && typeof lng === 'number';
  });

  return (
    <>
      {validTreks.map((trek) => (
        <DifficultyMarker 
          key={trek.id}
          trek={trek}
          userLocation={userLocation}
          getRouteToTrek={getRouteToTrek}
        />
      ))}
    </>
  );
};

export default TrekMarkers;