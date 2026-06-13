import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import RouteLine from "./RouteLine";
import "leaflet/dist/leaflet.css";

// Fix default marker icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";

import MapControls from "./MapControls";
import RouteInfo from "./RouteInfo";
import TrekMarkers from "./TrekMarkers";
import PassMarkers from "./PassMarkers";
import UserLocationMarker from "./UserLocationMarker";

// Fix Leaflet default icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Map controller for flying to selected trek
const MapController = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center && center.length === 2) {
      map.flyTo(center, zoom || 10, { duration: 1.5 });
    }
  }, [center, map, zoom]);
  return null;
};

const RouteMap = ({ selectedTrek }) => {
  // State
  const [treks, setTreks] = useState([]);
  const [passes, setPasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [routeInfo, setRouteInfo] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState(null);

  // Fetch map data
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

  // Get user's real location
  const getUserLocation = () => {
    setLocationLoading(true);
    
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setLocationLoading(false);
        alert("📍 Location found! Now click 'Get Route' on any trek.");
      },
      (error) => {
        console.error("Location error:", error);
        alert("Please enable location access to use routing feature");
        setLocationLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Get route from user location to trek
const getRouteToTrek = async (trek) => {
  if (!userLocation) {
    alert("Please share your location first");
    return;
  }
  
  // This will trigger RouteLine component via selectedTrek prop
  // But we need to pass selectedTrek to RouteLine
  // For now, just show route info
  const trekLat = trek.coordinates?.[0] ?? trek.lat;
  const trekLng = trek.coordinates?.[1] ?? trek.lng;
  
  try {
    const response = await fetch(
      `http://localhost:5000/api/treks/route?userLat=${userLocation.lat}&userLng=${userLocation.lng}&trekLat=${trekLat}&trekLng=${trekLng}`
    );
    const data = await response.json();
    
    if (data.route) {
      setRouteInfo({
        distance: data.distance,
        duration: data.duration
      });
      // Store route coordinates for RouteLine
      setRouteCoordinates(data.route);
    }
  } catch (error) {
    console.error('Route error:', error);
  }
};

  // Filter valid treks for count
  const validTreksCount = treks.filter(trek => {
    const lat = trek.coordinates?.[0] ?? trek.lat;
    const lng = trek.coordinates?.[1] ?? trek.lng;
    return lat && lng && typeof lat === 'number' && typeof lng === 'number';
  }).length;

  // Filter valid passes for count
  const validPassesCount = passes.filter(pass => {
    return pass.coordinates && 
           pass.coordinates.length === 2 && 
           typeof pass.coordinates[0] === 'number' && 
           typeof pass.coordinates[1] === 'number';
  }).length;

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
        <MapControls 
          validTreks={{ length: validTreksCount }}
          validPasses={{ length: validPassesCount }}
          userLocation={userLocation}
          locationLoading={locationLoading}
          getUserLocation={getUserLocation}
        />

            <RouteInfo 
            routeInfo={routeInfo}
            onClose={() => {
                setRouteInfo(null);
                setRouteCoordinates(null); 
            }}
            />

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

            <TrekMarkers 
              treks={treks}
              userLocation={userLocation}
              getRouteToTrek={getRouteToTrek}
            />

           <PassMarkers 
                passes={passes}
                userLocation={userLocation}
                getRouteToTrek={getRouteToTrek}
                />

            <UserLocationMarker userLocation={userLocation} />
                <RouteLine 
                    routeCoordinates={routeCoordinates}
                    />
          </MapContainer>
        </div>

        <p className="text-center text-gray-500 text-sm mt-4">
          🟢 Green = Trek Routes | 🔵 Blue = Mountain Passes | Click any marker for details
        </p>
      </div>
    </section>
  );
};

export default RouteMap;