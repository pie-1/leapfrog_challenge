import { motion } from 'framer-motion';

const ToolbarTop = ({ onUndo, onRedo, onClear, canUndo, canRedo }) => {
  const handleExportPNG = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'whiteboard.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleExportSVG = () => {
    // Placeholder for future SVG export
    alert('SVG export coming soon');
  };

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed top-3 left-1/2 -translate-x-1/2 z-10 bg-[#1e1e1e] rounded-xl px-4 py-2 shadow-2xl border border-[#333] flex items-center gap-2 flex-wrap"
    >
      <button
        onClick={onUndo}
        disabled={!canUndo}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
          canUndo ? 'text-white hover:bg-[#2a2a2a]' : 'text-[#555] cursor-not-allowed'
        }`}
        title="Undo (Ctrl+Z)"
      >
        ↩️
      </button>
      <button
        onClick={onRedo}
        disabled={!canRedo}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
          canRedo ? 'text-white hover:bg-[#2a2a2a]' : 'text-[#555] cursor-not-allowed'
        }`}
        title="Redo (Ctrl+Y)"
      >
        ↪️
      </button>
      <div className="w-px h-6 bg-[#333] mx-1" />
      <button
        onClick={onClear}
        className="px-3 py-1.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition"
        title="Clear Canvas"
      >
        🗑️ Clear
      </button>
      <div className="w-px h-6 bg-[#333] mx-1" />
      <button
        onClick={handleExportPNG}
        className="px-3 py-1.5 rounded-lg text-sm font-medium text-white hover:bg-[#2a2a2a] transition"
      >
        📥 PNG
      </button>
      <button
        onClick={handleExportSVG}
        className="px-3 py-1.5 rounded-lg text-sm font-medium text-white hover:bg-[#2a2a2a] transition"
      >
        📥 SVG
      </button>
    </motion.div>
  );
};

export default ToolbarTop;