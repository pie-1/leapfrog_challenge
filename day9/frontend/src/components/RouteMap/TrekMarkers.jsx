import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Green icon for treks
const trekIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const TrekMarkers = ({ treks, userLocation, getRouteToTrek }) => {
  // Filter valid treks with coordinates
  const validTreks = treks.filter(trek => {
    const lat = trek.coordinates?.[0] ?? trek.lat;
    const lng = trek.coordinates?.[1] ?? trek.lng;
    return lat && lng && typeof lat === 'number' && typeof lng === 'number';
  });

  return (
    <>
      {validTreks.map((trek) => {
        const lat = trek.coordinates?.[0] ?? trek.lat;
        const lng = trek.coordinates?.[1] ?? trek.lng;
        
        return (
          <Marker 
            key={trek.id} 
            position={[lat, lng]}
            icon={trekIcon}
          >
            <Popup>
              <div className="p-2 min-w-[180px]">
                <h3 className="font-bold text-lg text-green-700">{trek.name}</h3>
                <p className="text-gray-600 text-sm">{trek.location || trek.region}</p>
                <p className="text-gray-500 text-xs">🏔️ {trek.altitude || trek.altitude_m}m</p>
                {trek.duration && <p className="text-gray-500 text-xs">📅 {trek.duration}</p>}
                {trek.budget && <p className="text-green-600 font-bold mt-1">₹{trek.budget?.toLocaleString()} NPR</p>}
                {trek.difficulty && trek.difficulty !== "Unknown" && (
                  <span className={`inline-block mt-2 px-2 py-1 rounded text-xs ${
                    trek.difficulty === "Easy" ? "bg-green-100 text-green-700" :
                    trek.difficulty === "Moderate" ? "bg-yellow-100 text-yellow-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {trek.difficulty}
                  </span>
                )}
                <button 
                  onClick={() => getRouteToTrek(trek)}
                  className="mt-3 w-full bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                >
                  {userLocation ? ' Get Route from My Location' : '📍 Share Location First'}
                </button>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
};

export default TrekMarkers;