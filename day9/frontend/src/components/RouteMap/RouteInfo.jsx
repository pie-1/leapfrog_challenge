const RouteInfo = ({ routeInfo, onClose }) => {
  if (!routeInfo) return null;
  
  return (
    <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-4 flex justify-between items-center">
      <div>
        <span className="font-semibold">🚶 Route Info:</span>
        <span className="ml-2">{routeInfo.distance} km • {routeInfo.duration} mins</span>
      </div>
      <button 
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>
    </div>
  );
};

export default RouteInfo;