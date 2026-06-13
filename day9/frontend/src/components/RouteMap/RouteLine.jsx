import { Polyline } from "react-leaflet";

const RouteLine = ({ routeCoordinates }) => {
  if (!routeCoordinates || routeCoordinates.length === 0) return null;

  // Use a simpler, more visible route style
  return (
    <>
      {/* Shadow line (for visibility) */}
      <Polyline
        positions={routeCoordinates}
        pathOptions={{
          color: "#000000",
          weight: 10,
          opacity: 0.3,
          lineCap: "round",
          lineJoin: "round",
        }}
      />
      
      {/* Main line (bright green) */}
      <Polyline
        positions={routeCoordinates}
        pathOptions={{
          color: "#22c55e",
          weight: 5,
          opacity: 1,
          lineCap: "round",
          lineJoin: "round",
        }}
      />
    </>
  );
};

export default RouteLine;