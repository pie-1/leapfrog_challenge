const tools = [
  { id: 'select', label: '🖱️', title: 'Select (V)' },
  { id: 'hand', label: '✋', title: 'Pan (H)' },
  { id: 'rectangle', label: '▭', title: 'Rectangle (R)' },
  { id: 'ellipse', label: '◯', title: 'Ellipse (O)' },
  { id: 'diamond', label: '◇', title: 'Diamond (D)' },
  { id: 'arrow', label: '→', title: 'Arrow (A)' },
  { id: 'line', label: '╱', title: 'Line (L)' },
  { id: 'draw', label: '✏️', title: 'Freehand (P)' },
  { id: 'text', label: 'T', title: 'Text (T)' },
  { id: 'image', label: '🖼️', title: 'Image (I)' },
];

const ToolbarLeft = ({ selectedTool, onToolSelect }) => {
  return (
    <div className="fixed left-3 top-1/2 -translate-y-1/2 z-10 bg-[#1e1e1e] rounded-xl p-2 shadow-2xl border border-[#333]">
      <div className="flex flex-col gap-1">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => onToolSelect(tool.id)}
            className={`w-10 h-10 rounded-lg text-lg transition-all flex items-center justify-center ${
              selectedTool === tool.id
                ? 'bg-[#4a9eff] text-white shadow-lg scale-105'
                : 'text-[#aaa] hover:bg-[#2a2a2a] hover:text-white'
            }`}
            title={tool.title}
          >
            {tool.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToolbarLeft;