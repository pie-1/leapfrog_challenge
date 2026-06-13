import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Red icon for user location
const userIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const UserLocationMarker = ({ userLocation }) => {
  if (!userLocation) return null;
  
  return (
    <Marker 
      position={[userLocation.lat, userLocation.lng]}
      icon={userIcon}
    >
      <Popup>
        <div className="p-2">
          <h3 className="font-bold">📍 Your Location</h3>
          <p className="text-sm text-gray-600">Starting point for route</p>
        </div>
      </Popup>
    </Marker>
  );
};

export default UserLocationMarker;