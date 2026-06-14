const MapControls = ({ validTreks, validPasses, userLocation, locationLoading, getUserLocation }) => {
  return (
    <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
      <h2 className="text-4xl font-bold">Trekking Routes Map</h2>
      
      <div className="flex gap-4 items-center flex-wrap">
        {/* Legend */}
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
        
        {/* Location Button */}
        <button
          onClick={getUserLocation}
          disabled={locationLoading}
          className={`px-4 py-2 rounded-lg text-white font-semibold transition-all ${
            userLocation 
              ? 'bg-green-600 hover:bg-green-700' 
              : 'bg-blue-600 hover:bg-blue-700'
          } disabled:opacity-50`}
        >
          {locationLoading ? ' Getting location...' : userLocation ? ' Location Shared' : '📍 Share My Location'}
        </button>
       
      </div>
    </div>
  );
};

export default MapControls;