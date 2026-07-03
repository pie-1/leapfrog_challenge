import React, { useState, useEffect } from 'react';

const MultiplayerMode = ({ players, onPlayerJoin, onPlayerLeave }) => {
  const [isMultiplayer, setIsMultiplayer] = useState(false);
  const [playerName, setPlayerName] = useState('Player 1');

  const toggleMultiplayer = () => {
    setIsMultiplayer(!isMultiplayer);
    if (!isMultiplayer) {
      onPlayerJoin(playerName);
    } else {
      onPlayerLeave();
    }
  };

  return (
    <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm p-2 rounded-full border border-white/30">
      <button
        onClick={toggleMultiplayer}
        className={`px-4 py-2 rounded-full font-bold transition-all transform hover:scale-105 ${
          isMultiplayer 
            ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' 
            : 'bg-gradient-to-r from-blue-400 to-indigo-500 text-white'
        }`}
      >
        {isMultiplayer ? '👥 2 Players' : '👤 Single Player'}
      </button>
      
      {isMultiplayer && (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Player name"
            className="px-3 py-1 rounded-full bg-white/80 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-24"
          />
          <div className="flex gap-1">
            {players.map((player, index) => (
              <div
                key={index}
                className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center text-xs font-bold text-white"
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiplayerMode;