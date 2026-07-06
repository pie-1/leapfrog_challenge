import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationMap = ({ userLocation, providers, onProviderSelect }) => {
  const defaultCenter = [28.3949, 84.124]; // Nepal center

  return (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden border border-[#E4DFD1]">
      <MapContainer
        center={userLocation || defaultCenter}
        zoom={userLocation ? 13 : 7}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User Location */}
        {userLocation && (
          <>
            <Circle
              center={[userLocation.lat, userLocation.lng]}
              radius={100}
              pathOptions={{ color: '#E8A33D', fillColor: '#E8A33D', fillOpacity: 0.2 }}
            />
            <Marker position={[userLocation.lat, userLocation.lng]}>
              <Popup>
                <div className="text-center">
                  <p className="font-semibold text-[#1C1B18]">📍 Your Location</p>
                </div>
              </Popup>
            </Marker>
          </>
        )}

        {/* Provider Markers */}
        {providers?.map((provider) => (
          <Marker
            key={provider._id}
            position={[provider.location?.lat || 28.3949, provider.location?.lng || 84.124]}
            onClick={() => onProviderSelect?.(provider)}
          >
            <Popup>
              <div className="p-2">
                <p className="font-semibold text-[#1C1B18]">{provider.userId?.name || 'Provider'}</p>
                <p className="text-sm text-[#6B6558]">{provider.serviceType}</p>
                <p className="text-sm font-semibold text-[#1F3D2B]">₹{provider.hourlyRate}/hr</p>
                <button
                  onClick={() => onProviderSelect?.(provider)}
                  className="mt-2 px-3 py-1 bg-[#1F3D2B] text-white rounded-lg text-xs"
                >
                  View Profile
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LocationMap;