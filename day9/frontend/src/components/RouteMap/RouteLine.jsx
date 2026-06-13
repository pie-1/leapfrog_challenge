import { Polyline } from "react-leaflet";

const RouteLine = ({ routeCoordinates }) => {
  if (!routeCoordinates || routeCoordinates.length === 0) return null;

  return (
    <Polyline
      positions={routeCoordinates}
      color="#22c55e"
      weight={4}
      opacity={0.8}
      dashArray="10, 10"
    />
  );
};

export default RouteLine;