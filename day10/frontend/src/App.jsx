import { useState } from 'react';
import Canvas from './components/Whiteboard/Canvas';
import ToolbarLeft from './components/Whiteboard/ToolbarLeft';
import ToolbarTop from './components/Whiteboard/ToolbarTop';
import PanelRight from './components/Whiteboard/PanelRight';
import { useSocket } from './hooks/useSocket';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [selectedTool, setSelectedTool] = useState('rectangle');
  const [roomId] = useState('default-room');

  // Style states
  const [color, setColor] = useState('#ffffff');
  const [fillColor, setFillColor] = useState('transparent');
  const [brushSize, setBrushSize] = useState(2);
  const [opacity, setOpacity] = useState(100);
  const [fontSize, setFontSize] = useState(20);
  const [fontFamily, setFontFamily] = useState('Inter');
  const [backgroundColor, setBackgroundColor] = useState('#121212');

  const { shapes, isConnected, addShape, updateShape, deleteShape, clearCanvas } = useSocket(roomId);

  // Undo/Redo (local only)
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const handleAddShape = (shape) => {
    const newShape = { ...shape, id: uuidv4() };
    addShape(newShape);

    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push([...shapes, newShape]);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUpdateShape = (id, updates) => {
    updateShape(id, updates);
  };

  const handleDeleteShape = (id) => {
    deleteShape(id);
  };

  const handleClear = () => {
    clearCanvas();
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#121212]">
      {/* Canvas */}
      <Canvas
        shapes={shapes}
        onAddShape={handleAddShape}
        onUpdateShape={handleUpdateShape}
        onDeleteShape={handleDeleteShape}
        selectedTool={selectedTool}
        color={color}
        fillColor={fillColor}
        brushSize={brushSize}
        opacity={opacity}
        fontSize={fontSize}
        fontFamily={fontFamily}
        backgroundColor={backgroundColor}
      />

      {/* Connection Status */}
      <div className="fixed top-3 right-3 z-20 bg-[#1e1e1e] px-3 py-1.5 rounded-lg border border-[#333]">
        <div className={`flex items-center gap-2 text-xs ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
          <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></span>
          {isConnected ? 'Live' : 'Connecting...'}
        </div>
      </div>

      {/* Left Toolbar */}
      <ToolbarLeft
        selectedTool={selectedTool}
        onToolSelect={setSelectedTool}
      />

      {/* Top Toolbar */}
      <ToolbarTop
        onUndo={handleUndo}
        onRedo={handleRedo}
        onClear={handleClear}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
      />

      {/* Right Panel */}
      <PanelRight
        color={color}
        setColor={setColor}
        fillColor={fillColor}
        setFillColor={setFillColor}
        brushSize={brushSize}
        setBrushSize={setBrushSize}
        opacity={opacity}
        setOpacity={setOpacity}
        fontSize={fontSize}
        setFontSize={setFontSize}
        fontFamily={fontFamily}
        setFontFamily={setFontFamily}
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
      />
    </div>
  );
}

export default App;