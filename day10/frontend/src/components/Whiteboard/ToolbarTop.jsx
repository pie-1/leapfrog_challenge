import { useState } from 'react';
import html2canvas from 'html2canvas';

const ToolbarTop = ({ onUndo, onRedo, onClear, canUndo, canRedo }) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPNG = () => {
    setIsExporting(true);
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'whiteboard.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    setIsExporting(false);
  };

  const handleExportSVG = () => {
    setIsExporting(true);
    // For SVG export, we'll implement this in Step 5 with Rough.js
    alert('SVG export will work after Rough.js integration');
    setIsExporting(false);
  };

  return (
    <div className="fixed top-3 left-1/2 -translate-x-1/2 z-10 bg-[#1e1e1e] rounded-xl px-4 py-2 shadow-2xl border border-[#333] flex items-center gap-2">
      {/* Undo */}
      <button
        onClick={onUndo}
        disabled={!canUndo}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
          canUndo
            ? 'text-white hover:bg-[#2a2a2a]'
            : 'text-[#555] cursor-not-allowed'
        }`}
        title="Undo (Ctrl+Z)"
      >
        ↩️
      </button>

      {/* Redo */}
      <button
        onClick={onRedo}
        disabled={!canRedo}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
          canRedo
            ? 'text-white hover:bg-[#2a2a2a]'
            : 'text-[#555] cursor-not-allowed'
        }`}
        title="Redo (Ctrl+Y)"
      >
        ↪️
      </button>

      <div className="w-px h-6 bg-[#333] mx-1"></div>

      {/* Clear */}
      <button
        onClick={onClear}
        className="px-3 py-1.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition"
        title="Clear Canvas"
      >
        🗑️ Clear
      </button>

      <div className="w-px h-6 bg-[#333] mx-1"></div>

      {/* Export PNG */}
      <button
        onClick={handleExportPNG}
        disabled={isExporting}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
          isExporting
            ? 'text-[#555] cursor-not-allowed'
            : 'text-white hover:bg-[#2a2a2a]'
        }`}
        title="Export as PNG"
      >
        📥 PNG
      </button>

      {/* Export SVG */}
      <button
        onClick={handleExportSVG}
        className="px-3 py-1.5 rounded-lg text-sm font-medium text-white hover:bg-[#2a2a2a] transition"
        title="Export as SVG"
      >
        📥 SVG
      </button>
    </div>
  );
};

export default ToolbarTop;