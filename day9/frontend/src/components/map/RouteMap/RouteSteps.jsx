import { ChevronDown, ChevronUp, Footprints, Clock, MapPin } from "lucide-react";
import { useState } from "react";

const RouteSteps = ({ routeInfo, waypoints, onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!routeInfo) return null;

  return (
    <div className="absolute top-20 right-4 z-10 w-80 bg-white rounded-xl shadow-2xl border border-gray-200">
      {/* Header */}
      <div className="p-4 bg-green-600 text-white rounded-t-xl flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Footprints size={20} />
          <h3 className="font-semibold">Route Details</h3>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setIsExpanded(!isExpanded)} className="hover:bg-green-700 p-1 rounded">
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          <button onClick={onClose} className="hover:bg-green-700 p-1 rounded">✕</button>
        </div>
      </div>

      {/* Stats */}
      <div className="p-4 bg-gray-50 border-b">
        <div className="flex justify-between">
          <div>
            <p className="text-xs text-gray-500">Distance</p>
            <p className="text-xl font-bold text-gray-800">{routeInfo.distance} km</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Duration</p>
            <p className="text-xl font-bold text-gray-800">{routeInfo.duration} mins</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Walking Time</p>
            <p className="text-xl font-bold text-gray-800">{Math.round(routeInfo.duration / 60)} hrs</p>
          </div>
        </div>
      </div>

      {/* Steps (Expanded) */}
      {isExpanded && waypoints && waypoints.length > 0 && (
        <div className="max-h-96 overflow-y-auto">
          {waypoints.slice(0, 10).map((waypoint, idx) => (
            <div key={idx} className="p-3 border-b hover:bg-gray-50">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-green-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{waypoint.name || `Step ${idx + 1}`}</p>
                  <p className="text-xs text-gray-500">{waypoint.distance} km • {waypoint.duration} mins</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      
      <div className="p-3 bg-blue-50 text-blue-700 text-xs text-center rounded-b-xl">
        💡 Follow the green line. Mobile network works along major roads.
      </div>
    </div>
  );
};

export default RouteSteps;