const PanelRight = ({
  color = '#ffffff',
  setColor,
  fillColor = 'transparent',
  setFillColor,
  brushSize = 2,
  setBrushSize,
  opacity = 100,
  setOpacity,
  fontSize = 20,
  setFontSize
}) => {
  return (
    <div className="fixed right-3 top-1/2 -translate-y-1/2 z-10 bg-[#1e1e1e] rounded-xl p-4 shadow-2xl border border-[#333] w-48">
      <h3 className="text-xs font-semibold text-[#888] uppercase tracking-wider mb-4">
        Style
      </h3>

      <div className="space-y-4">
        {/* Stroke Color */}
        <div>
          <label className="block text-xs text-[#aaa] mb-1.5">Stroke</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor && setColor(e.target.value)}
            className="w-full h-9 rounded-lg cursor-pointer bg-[#2a2a2a] border border-[#444] hover:border-[#4a9eff] transition"
          />
        </div>

        {/* Fill Color */}
        <div>
          <label className="block text-xs text-[#aaa] mb-1.5">Fill</label>
          <div className="flex gap-2">
            <input
              type="color"
              value={fillColor === 'transparent' ? '#000000' : fillColor}
              onChange={(e) => setFillColor && setFillColor(e.target.value)}
              className="flex-1 h-9 rounded-lg cursor-pointer bg-[#2a2a2a] border border-[#444] hover:border-[#4a9eff] transition"
            />
            <button
              onClick={() => setFillColor && setFillColor('transparent')}
              className="px-2 text-xs text-[#888] hover:text-white bg-[#2a2a2a] rounded-lg border border-[#444] hover:border-[#4a9eff] transition"
              title="No fill"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Stroke Width */}
        <div>
          <div className="flex justify-between">
            <label className="text-xs text-[#aaa]">Width</label>
            <span className="text-xs text-[#888]">{brushSize}px</span>
          </div>
          <input
            type="range"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize && setBrushSize(parseInt(e.target.value))}
            className="w-full accent-[#4a9eff] h-1 bg-[#333] rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Opacity */}
        <div>
          <div className="flex justify-between">
            <label className="text-xs text-[#aaa]">Opacity</label>
            <span className="text-xs text-[#888]">{opacity}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={opacity}
            onChange={(e) => setOpacity && setOpacity(parseInt(e.target.value))}
            className="w-full accent-[#4a9eff] h-1 bg-[#333] rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Font Size */}
        <div>
          <div className="flex justify-between">
            <label className="text-xs text-[#aaa]">Font Size</label>
            <span className="text-xs text-[#888]">{fontSize}px</span>
          </div>
          <input
            type="range"
            min="10"
            max="60"
            value={fontSize}
            onChange={(e) => setFontSize && setFontSize(parseInt(e.target.value))}
            className="w-full accent-[#4a9eff] h-1 bg-[#333] rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default PanelRight;