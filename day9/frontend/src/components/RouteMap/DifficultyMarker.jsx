import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Create custom colored icons based on difficulty
const getDifficultyIcon = (difficulty) => {
  let color = "green"; // Default green
  
  if (difficulty === "Easy") color = "green";
  if (difficulty === "Moderate") color = "yellow";  
  if (difficulty === "Hard") color = "red";
  
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
};

const DifficultyMarker = ({ trek, userLocation, getRouteToTrek }) => {
  const lat = trek.coordinates?.[0] ?? trek.lat;
  const lng = trek.coordinates?.[1] ?? trek.lng;
  
  if (!lat || !lng) return null;
  
  return (
    <Marker 
      position={[lat, lng]}
      icon={getDifficultyIcon(trek.difficulty)}
    >
      <Popup>
        <div className="p-2 min-w-[180px]">
          <h3 className="font-bold text-lg" style={{
            color: trek.difficulty === "Easy" ? "#22c55e" :
                   trek.difficulty === "Moderate" ? "#eab308" : "#ef4444"
          }}>
            {trek.name}
          </h3>
          <p className="text-gray-600 text-sm">{trek.location || trek.region}</p>
          <p className="text-gray-500 text-xs">🏔️ {trek.altitude || trek.altitude_m}m</p>
          {trek.duration && <p className="text-gray-500 text-xs">📅 {trek.duration}</p>}
          {trek.budget && <p className="text-green-600 font-bold mt-1">₹{trek.budget?.toLocaleString()} NPR</p>}
          
          {/* Difficulty badge */}
          <span className={`inline-block mt-2 px-2 py-1 rounded text-xs font-semibold ${
            trek.difficulty === "Easy" ? "bg-green-100 text-green-700" :
            trek.difficulty === "Moderate" ? "bg-yellow-100 text-yellow-700" :
            "bg-red-100 text-red-700"
          }`}>
            {trek.difficulty || "Unknown"}
          </span>
          
          <button 
            onClick={() => getRouteToTrek(trek)}
            className="mt-3 w-full bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
          >
            {userLocation ? '🗺️ Get Route from My Location' : '📍 Share Location First'}
          </button>
        </div>
      </Popup>
    </Marker>
  );
};

export default DifficultyMarker;