import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Blue icon for passes
const passIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const PassMarkers = ({ passes, userLocation, getRouteToTrek }) => {
  // Filter valid passes with coordinates
  const validPasses = passes.filter(pass => {
    return pass.coordinates && 
           pass.coordinates.length === 2 && 
           typeof pass.coordinates[0] === 'number' && 
           typeof pass.coordinates[1] === 'number';
  });

  return (
    <>
      {validPasses.map((pass) => {
        const [lat, lng] = pass.coordinates;
        
        // Convert pass to trek-like format for route function
        const passAsTrek = {
          id: pass.id,
          name: pass.name,
          coordinates: [lat, lng],
          lat: lat,
          lng: lng
        };
        
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
                
                {/* ADDED: Get Route Button for Passes */}
                <button 
                  onClick={() => getRouteToTrek(passAsTrek)}
                  className="mt-3 w-full bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                >
                  {userLocation ? '🗺️ Get Route to this Pass' : '📍 Share Location First'}
                </button>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
};

export default PassMarkers;