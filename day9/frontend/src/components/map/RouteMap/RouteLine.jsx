import { Polyline } from "react-leaflet";

const RouteLine = ({ routeCoordinates, userLocation, destination }) => {
  if (!routeCoordinates || routeCoordinates.length === 0) return null;

  // Smooth the route by removing duplicate consecutive points
  const smoothedCoordinates = [];
  for (let i = 0; i < routeCoordinates.length; i++) {
    if (i === 0 || 
        routeCoordinates[i][0] !== routeCoordinates[i-1][0] || 
        routeCoordinates[i][1] !== routeCoordinates[i-1][1]) {
      smoothedCoordinates.push(routeCoordinates[i]);
    }
  }

  return (
    <>
      {/* Shadow Layer for better visibility */}
      <Polyline
        positions={smoothedCoordinates}
        pathOptions={{
          color: "#000000",
          weight: 8,
          opacity: 0.3,
          lineCap: "round",
          lineJoin: "round",
        }}
      />
      
      {/* Main Route Layer */}
      <Polyline
        positions={smoothedCoordinates}
        pathOptions={{
          color: "#22c55e",
          weight: 4,
          opacity: 1,
          lineCap: "round",
          lineJoin: "round",
        }}
      />
      
      {/* Dashed overlay for better visibility on dark terrain */}
      <Polyline
        positions={smoothedCoordinates}
        pathOptions={{
          color: "#ffffff",
          weight: 1.5,
          opacity: 0.5,
          lineCap: "round",
          lineJoin: "round",
          dashArray: "5, 10",
        }}
      />
    </>
  );
};

export default RouteLine;