import { motion } from 'framer-motion';

const PanelRight = ({
  color, setColor,
  fillColor, setFillColor,
  brushSize, setBrushSize,
  opacity, setOpacity,
  fontSize, setFontSize,
  fontFamily, setFontFamily,
  backgroundColor, setBackgroundColor
}) => {
  const fontFamilies = ['Inter', 'Comic Sans MS', 'Arial', 'Times New Roman', 'Courier New', 'Georgia', 'Verdana', 'Roboto'];

  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed right-3 top-1/2 -translate-y-1/2 z-10 bg-[#1e1e1e] rounded-xl p-4 shadow-2xl border border-[#333] w-52 max-h-[90vh] overflow-y-auto"
    >
      <h3 className="text-xs font-semibold text-[#888] uppercase tracking-wider mb-4">Style</h3>
      <div className="space-y-4">
        {/* Stroke */}
        <div>
          <label className="block text-xs text-[#aaa] mb-1.5">Stroke</label>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-full h-9 rounded-lg cursor-pointer bg-[#2a2a2a] border border-[#444]" />
        </div>
        {/* Fill */}
        <div>
          <label className="block text-xs text-[#aaa] mb-1.5">Fill</label>
          <div className="flex gap-2">
            <input type="color" value={fillColor === 'transparent' ? '#000000' : fillColor} onChange={(e) => setFillColor(e.target.value)} className="flex-1 h-9 rounded-lg cursor-pointer bg-[#2a2a2a] border border-[#444]" />
            <button onClick={() => setFillColor('transparent')} className="px-2 text-xs text-[#888] hover:text-white bg-[#2a2a2a] rounded-lg border border-[#444]">✕</button>
          </div>
        </div>
        {/* Width */}
        <div>
          <div className="flex justify-between"><label className="text-xs text-[#aaa]">Width</label><span className="text-xs text-[#888]">{brushSize}px</span></div>
          <input type="range" min="1" max="20" value={brushSize} onChange={(e) => setBrushSize(parseInt(e.target.value))} className="w-full accent-[#4a9eff]" />
        </div>
        {/* Opacity */}
        <div>
          <div className="flex justify-between"><label className="text-xs text-[#aaa]">Opacity</label><span className="text-xs text-[#888]">{opacity}%</span></div>
          <input type="range" min="0" max="100" value={opacity} onChange={(e) => setOpacity(parseInt(e.target.value))} className="w-full accent-[#4a9eff]" />
        </div>
        {/* Font Size */}
        <div>
          <div className="flex justify-between"><label className="text-xs text-[#aaa]">Font Size</label><span className="text-xs text-[#888]">{fontSize}px</span></div>
          <input type="range" min="10" max="60" value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value))} className="w-full accent-[#4a9eff]" />
        </div>
        {/* Background */}
        <div>
          <label className="block text-xs text-[#aaa] mb-1.5">Background</label>
          <div className="flex gap-2">
            <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} className="flex-1 h-9 rounded-lg cursor-pointer bg-[#2a2a2a] border border-[#444]" />
            <button onClick={() => setBackgroundColor('#ffffff')} className="px-2 text-xs text-white bg-[#2a2a2a] rounded-lg border border-[#444]">☀️</button>
            <button onClick={() => setBackgroundColor('#121212')} className="px-2 text-xs text-white bg-[#2a2a2a] rounded-lg border border-[#444]">🌙</button>
          </div>
        </div>
        {/* Font Family */}
        <div>
          <label className="block text-xs text-[#aaa] mb-1.5">Font</label>
          <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} className="w-full p-2 text-sm bg-[#2a2a2a] text-white rounded-lg border border-[#444]">
            {fontFamilies.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
      </div>
    </motion.div>
  );
};

export default PanelRight;