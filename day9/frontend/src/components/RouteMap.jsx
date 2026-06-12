import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Create custom GREEN icon for treks
const trekIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Create custom BLUE icon for passes
const passIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const MapController = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center && center.length === 2) map.flyTo(center, zoom || 10, { duration: 1.5 });
  }, [center, map, zoom]);
  return null;
};

const RouteMap = ({ selectedTrek }) => {
  const [treks, setTreks] = useState([]);
  const [passes, setPasses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch map points from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/treks/map-points")
      .then(res => res.json())
      .then(data => {
        setTreks(data.treks || []);
        setPasses(data.passes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching map points:", error);
        setLoading(false);
      });
  }, []);

  // Filter valid treks (with coordinates)
  const validTreks = treks.filter(trek => {
    const lat = trek.coordinates?.[0] ?? trek.lat;
    const lng = trek.coordinates?.[1] ?? trek.lng;
    return lat && lng && typeof lat === 'number' && typeof lng === 'number';
  });

  // Filter valid passes (with coordinates)
  const validPasses = passes.filter(pass => {
    return pass.coordinates && 
           pass.coordinates.length === 2 && 
           typeof pass.coordinates[0] === 'number' && 
           typeof pass.coordinates[1] === 'number';
  });

  // Get center for map
  let center = [28.3949, 84.124]; // Default Nepal center
  
  if (selectedTrek) {
    const lat = selectedTrek.coordinates?.[0] ?? selectedTrek.lat;
    const lng = selectedTrek.coordinates?.[1] ?? selectedTrek.lng;
    if (lat && lng) center = [lat, lng];
  }

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4">Loading map data...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold">Trekking Routes Map</h2>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-600 rounded-full"></div>
              <span>Treks ({validTreks.length})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span>Mountain Passes ({validPasses.length})</span>
            </div>
          </div>
        </div>

        <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
          <MapContainer 
            center={center} 
            zoom={7} 
            style={{ height: "550px", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapController center={center} />

            {/* Green Trek Markers - Only valid ones */}
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
                    </div>
                  </Popup>
                </Marker>
              );
            })}

            {/* Blue Pass Markers - Only valid ones */}
            {validPasses.map((pass) => {
              const [lat, lng] = pass.coordinates;
              
              return (
                <Marker 
                  key={pass.id} 
                  position={[lat, lng]}
                  icon={passIcon}
                >
                  <Popup>
                    <div className="p-2 min-w-[160px]">
                      <h3 className="font-bold text-lg text-blue-700">{pass.name}</h3>
                      <p className="text-gray-600 text-sm">{pass.region || 'Nepal'}</p>
                      <p className="text-gray-500 text-xs">🏔️ {pass.altitude || pass.elevation_m}m</p>
                      <p className="text-gray-500 text-xs">📍 Mountain Pass</p>
                      {pass.description && <p className="text-gray-400 text-xs mt-1">{pass.description.substring(0, 80)}...</p>}
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>

        <p className="text-center text-gray-500 text-sm mt-4">
          🟢 Green = Trek Routes ({validTreks.length}) | 🔵 Blue = Mountain Passes ({validPasses.length}) | Click any marker for details
        </p>
      </div>
    </section>
  );
};

export default RouteMap;