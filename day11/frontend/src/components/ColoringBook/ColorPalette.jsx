import { motion } from 'framer-motion';

const colors = [
  '#FF6B6B', // Bright Red
  '#FF9F43', // Orange
  '#FECA57', // Yellow
  '#48DBFB', // Sky Blue
  '#0ABDE3', // Deep Blue
  '#10AC84', // Green
  '#5F27CD', // Purple
  '#FF6FB7', // Pink
  '#FFFFFF', // White
  '#2D3436', // Black
  '#FD79A8', // Light Pink
  '#FDCB6E', // Gold
  '#6C5CE7', // Indigo
  '#00B894', // Mint Green
  '#E17055', // Terracotta
];

const ColorPalette = ({ selectedColor, onColorSelect }) => {
  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border-2 border-pastel-pink/30"
    >
      <h3 className="text-sm font-semibold text-gray-500 mb-4">Colors</h3>
      
      <div className="grid grid-cols-5 gap-2">
        {colors.map((color) => (
          <motion.button
            key={color}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onColorSelect(color)}
            className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${
              selectedColor === color
                ? 'border-gray-700 shadow-lg scale-110'
                : 'border-transparent hover:border-gray-300'
            }`}
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>

      {/* Custom color picker */}
      <div className="mt-4 flex items-center gap-2">
        <label className="text-xs text-gray-400">Custom</label>
        <input
          type="color"
          value={selectedColor}
          onChange={(e) => onColorSelect(e.target.value)}
          className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-200 p-0"
        />
      </div>
    </motion.div>
  );
};

export default ColorPalette;