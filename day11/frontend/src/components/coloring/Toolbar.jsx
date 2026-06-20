import { motion } from 'framer-motion';
import { 
  PaintBucket, 
  Pencil, 
  Eraser, 
  RotateCcw, 
  Trash2,
  Minus,
  Plus
} from 'lucide-react';

const tools = [
  { id: 'fill', icon: PaintBucket, label: 'Fill' },
  { id: 'brush', icon: Pencil, label: 'Brush' },
  { id: 'eraser', icon: Eraser, label: 'Eraser' },
];

const Toolbar = ({ 
  selectedTool, 
  onToolSelect, 
  brushSize, 
  onBrushSizeChange,
  onClear,
  onUndo
}) => {
  const brushSizes = [2, 4, 6, 8, 12];

  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border-2 border-pastel-pink/30"
    >
      <h3 className="text-sm font-semibold text-gray-500 mb-4">Tools</h3>
      
      {/* Tool Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.id}
              onClick={() => onToolSelect(tool.id)}
              className={`p-3 rounded-xl transition-all duration-200 ${
                selectedTool === tool.id
                  ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title={tool.label}
            >
              <Icon size={20} />
            </button>
          );
        })}
      </div>

      {/* Brush Size */}
      <div className="mb-4">
        <label className="text-xs text-gray-400 block mb-2">Brush Size</label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onBrushSizeChange(Math.max(2, brushSize - 2))}
            className="p-1 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <Minus size={14} />
          </button>
          <div className="flex-1 flex justify-center">
            <div 
              className="rounded-full bg-gray-700 transition-all"
              style={{ 
                width: brushSize * 2, 
                height: brushSize * 2,
                minWidth: 8,
                minHeight: 8,
                maxWidth: 24,
                maxHeight: 24
              }}
            />
          </div>
          <button
            onClick={() => onBrushSizeChange(Math.min(12, brushSize + 2))}
            className="p-1 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={onUndo}
          className="flex-1 p-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-600 transition flex items-center justify-center gap-1"
        >
          <RotateCcw size={16} />
          <span className="text-xs">Undo</span>
        </button>
        <button
          onClick={onClear}
          className="flex-1 p-2 bg-red-50 hover:bg-red-100 rounded-xl text-red-500 transition flex items-center justify-center gap-1"
        >
          <Trash2 size={16} />
          <span className="text-xs">Clear</span>
        </button>
      </div>
    </motion.div>
  );
};

export default Toolbar;