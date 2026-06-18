import { motion } from 'framer-motion';

const tools = [
  { id: 'select', label: '🖱️', title: 'Select' },
  { id: 'rectangle', label: '▭', title: 'Rectangle' },
  { id: 'ellipse', label: '◯', title: 'Ellipse' },
  { id: 'diamond', label: '◇', title: 'Diamond' },
  { id: 'arrow', label: '→', title: 'Arrow' },
  { id: 'line', label: '╱', title: 'Line' },
  { id: 'draw', label: '✏️', title: 'Freehand' },
  { id: 'text', label: 'T', title: 'Text' },
  { id: 'image', label: '🖼️', title: 'Image' },
  { id: 'eraser', label: '🧹', title: 'Eraser' },
];

const ToolbarLeft = ({ selectedTool, onToolSelect }) => {
  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`
        fixed z-10 
        md:left-3 md:top-1/2 md:-translate-y-1/2
        bottom-6 left-1/2 -translate-x-1/2 md:translate-x-0
        bg-[#1e1e1e] rounded-xl p-2 shadow-2xl border border-[#333]
      `}
    >
      <div className="flex md:flex-col gap-1">
        {tools.map((tool) => (
          <motion.button
            key={tool.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onToolSelect(tool.id)}
            className={`w-10 h-10 rounded-lg text-lg transition-all flex items-center justify-center ${
              selectedTool === tool.id
                ? 'bg-[#4a9eff] text-white shadow-lg scale-105'
                : 'text-[#aaa] hover:bg-[#2a2a2a] hover:text-white'
            }`}
            title={tool.title}
          >
            {tool.label}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default ToolbarLeft;