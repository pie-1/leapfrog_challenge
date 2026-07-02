import React from 'react';
import { GAME_CONFIG } from '../constants/gameConfig';

const VehicleSelector = ({ selected, onSelect }) => {
  return (
    <div className="flex gap-2 bg-slate-800/50 backdrop-blur-sm p-2 rounded-full border border-slate-700">
      {Object.entries(GAME_CONFIG.VEHICLES).map(([key, vehicle]) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className={`px-4 py-2 rounded-full transition-all duration-200 flex items-center gap-2
            ${selected === key 
              ? 'bg-yellow-500 text-slate-900 shadow-lg shadow-yellow-500/30 scale-105' 
              : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600'
            }`}
        >
          <span className="text-xl">{vehicle.emoji}</span>
          <span className="hidden sm:inline">{vehicle.label}</span>
        </button>
      ))}
    </div>
  );
};

export default VehicleSelector;