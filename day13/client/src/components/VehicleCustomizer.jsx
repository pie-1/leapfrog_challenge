import React, { useState } from 'react';
import { GAME_CONFIG } from '../constants/gameConfig';

const VehicleCustomizer = ({ vehicle, onCustomize }) => {
  const [selectedColor, setSelectedColor] = useState('#FF6B6B');
  const [showCustomizer, setShowCustomizer] = useState(false);
  
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#F1948A'];
  
  const handleColorSelect = (color) => {
    setSelectedColor(color);
    onCustomize({ color });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowCustomizer(!showCustomizer)}
        className="px-4 py-2 bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold rounded-full hover:from-purple-500 hover:to-pink-500 transition-all transform hover:scale-105 shadow-lg"
      >
        🎨 Customize
      </button>
      
      {showCustomizer && (
        <div className="absolute top-full mt-2 right-0 bg-white rounded-2xl shadow-2xl p-4 w-64 z-50 border-2 border-purple-200">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">{GAME_CONFIG.VEHICLES[vehicle].emoji}</span>
            <span className="font-bold text-slate-700">{GAME_CONFIG.VEHICLES[vehicle].label}</span>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => handleColorSelect(color)}
                className={`w-10 h-10 rounded-full border-2 transition-all transform hover:scale-110 ${
                  selectedColor === color ? 'border-black scale-110 shadow-lg' : 'border-gray-200'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          
          <div className="mt-3 text-xs text-slate-500 text-center">
            Choose your vehicle color!
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleCustomizer;