import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
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

  const { shapes, isConnected, addShape, updateShape, deleteShape, clearCanvas, syncShapes } = useSocket(roomId);

  // History for undo/redo (local + sync)
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const isUndoRedo = useRef(false);

  // Initialize history when shapes load from server
  useEffect(() => {
    if (shapes.length > 0 && history.length === 0) {
      setHistory([shapes]);
      setHistoryIndex(0);
    }
  }, [shapes]);

  // Push to history when shapes change (except during undo/redo)
  useEffect(() => {
    if (!isUndoRedo.current && history.length > 0) {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(shapes);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  }, [shapes]);

  const handleAddShape = (shape) => {
    const newShape = { ...shape, id: uuidv4() };
    addShape(newShape);
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
      isUndoRedo.current = true;
      const prev = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      syncShapes(prev);
      setTimeout(() => { isUndoRedo.current = false; }, 100);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      isUndoRedo.current = true;
      const next = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      syncShapes(next);
      setTimeout(() => { isUndoRedo.current = false; }, 100);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#121212]">
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

      <div className="fixed top-3 right-3 z-20 bg-[#1e1e1e] px-3 py-1.5 rounded-lg border border-[#333]">
        <div className={`flex items-center gap-2 text-xs ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
          <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></span>
          {isConnected ? 'Live' : 'Connecting...'}
        </div>
      </div>

      <ToolbarLeft selectedTool={selectedTool} onToolSelect={setSelectedTool} />

      <ToolbarTop
        onUndo={handleUndo}
        onRedo={handleRedo}
        onClear={handleClear}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
      />

      <PanelRight
        color={color} setColor={setColor}
        fillColor={fillColor} setFillColor={setFillColor}
        brushSize={brushSize} setBrushSize={setBrushSize}
        opacity={opacity} setOpacity={setOpacity}
        fontSize={fontSize} setFontSize={setFontSize}
        fontFamily={fontFamily} setFontFamily={setFontFamily}
        backgroundColor={backgroundColor} setBackgroundColor={setBackgroundColor}
      />
    </div>
  );
}

export default App;