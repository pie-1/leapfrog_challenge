import { useEffect } from 'react';
import { useSocket } from './hooks/useSocket';
import { useDrawing } from './hooks/useDrawing';
import Toolbar from './components/Whiteboard/Toolbar';
import Canvas from './components/Whiteboard/Canvas';

function App() {
  const socket = useSocket('http://localhost:3001');
  const {
    canvasRef,
    color,
    setColor,
    brushSize,
    setBrushSize,
    tool,
    setTool,
    startDrawing,
    draw,
    stopDrawing,
    clearCanvas,
    getCanvasContext
  } = useDrawing();

  // Listen for incoming drawing events
  useEffect(() => {
    if (!socket) return;

    socket.on('draw', (data) => {
      const ctx = getCanvasContext();
      if (!ctx) return;
      ctx.strokeStyle = data.color;
      ctx.lineWidth = data.size;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(data.x1, data.y1);
      ctx.lineTo(data.x2, data.y2);
      ctx.stroke();
    });

    socket.on('clear', () => {
      const canvas = canvasRef.current;
      const ctx = getCanvasContext();
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    return () => {
      socket.off('draw');
      socket.off('clear');
    };
  }, [socket, getCanvasContext]);

  // Send drawing to others
  const sendDraw = (x1, y1, x2, y2, color, size) => {
    if (socket) {
      socket.emit('draw', { x1, y1, x2, y2, color, size });
    }
  };

  const handleClear = () => {
    clearCanvas();
    if (socket) {
      socket.emit('clear');
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f0eb] flex items-center justify-center p-6">
      <div className="max-w-6xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#d6cec4]">
          
          {/* Header */}
          <div className="px-6 py-4 bg-[#faf8f6] border-b border-[#e8e4de] flex justify-between items-center">
            <h1 className="text-xl font-bold text-[#1e293b]">✏️ CollabBoard</h1>
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${socket?.connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-xs text-[#8a7f73]">{socket?.connected ? 'Live' : 'Offline'}</span>
            </div>
          </div>

          {/* Toolbar */}
          <Toolbar
            color={color}
            setColor={setColor}
            brushSize={brushSize}
            setBrushSize={setBrushSize}
            tool={tool}
            setTool={setTool}
            onClear={handleClear}
          />

          {/* Canvas */}
          <Canvas
            ref={canvasRef}
            startDrawing={startDrawing}
            draw={(e) => draw(e, sendDraw)}
            stopDrawing={stopDrawing}
          />

          {/* Footer */}
          <div className="px-6 py-2 text-xs text-[#8a7f73] text-center border-t border-[#e8e4de] bg-[#faf8f6]">
            {socket?.connected ? '🟢 Connected — drawing in real-time' : '🔴 Reconnecting...'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;