const Toolbar = ({ color, setColor, brushSize, setBrushSize, tool, setTool, onClear }) => {
  return (
    <div className="flex flex-wrap items-center gap-3 px-6 py-3 bg-[#faf8f6] border-b border-[#e8e4de]">
      <div className="flex items-center gap-1 bg-white rounded-lg shadow-sm p-1">
        <button
          onClick={() => setTool('pen')}
          className={`px-3 py-1.5 text-xs font-medium rounded transition ${
            tool === 'pen'
              ? 'bg-[#1e293b] text-white'
              : 'text-[#4a3f35] hover:bg-[#e8e4de]'
          }`}
        >
          ✏️ Pen
        </button>
        <button
          onClick={() => setTool('eraser')}
          className={`px-3 py-1.5 text-xs font-medium rounded transition ${
            tool === 'eraser'
              ? 'bg-[#1e293b] text-white'
              : 'text-[#4a3f35] hover:bg-[#e8e4de]'
          }`}
        >
          🧹 Eraser
        </button>
      </div>

      <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm px-3 py-1.5">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-6 h-6 rounded-full border-2 border-[#d6cec4] cursor-pointer p-0"
        />
      </div>

      <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm px-3 py-1.5">
        <span className="text-xs text-[#8a7f73]">Size</span>
        <input
          type="range"
          min={1}
          max={20}
          value={brushSize}
          onChange={(e) => setBrushSize(parseInt(e.target.value))}
          className="w-20 accent-[#1e293b]"
        />
        <span className="text-xs text-[#4a3f35] w-5">{brushSize}</span>
      </div>

      <button
        onClick={onClear}
        className="ml-auto px-4 py-1.5 text-xs font-medium text-[#8a7f73] hover:text-red-600 hover:bg-red-50 rounded-lg transition border border-[#d6cec4]"
      >
        Clear Board
      </button>
    </div>
  );
};

export default Toolbar;