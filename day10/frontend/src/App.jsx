import { useState, useRef, useEffect, useCallback } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

function App() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#1e293b'); // Dark slate
  const [brushSize, setBrushSize] = useState(3);
  const [tool, setTool] = useState('pen');

  const sendDraw = useCallback((x1, y1, x2, y2, color, size) => {
    socket.emit('draw', { x1, y1, x2, y2, color, size });
  }, []);

  useEffect(() => {
    const handleDraw = (data) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.strokeStyle = data.color || '#1e293b';
      ctx.lineWidth = data.size || 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(data.x1, data.y1);
      ctx.lineTo(data.x2, data.y2);
      ctx.stroke();
    };
    socket.on('draw', handleDraw);
    return () => socket.off('draw', handleDraw);
  }, []);

  const startDrawing = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setIsDrawing(true);
    canvasRef.current._lastX = x;
    canvasRef.current._lastY = y;
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = canvasRef.current.getContext('2d');
    const currentColor = tool === 'eraser' ? '#f8fafc' : color;
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(canvasRef.current._lastX, canvasRef.current._lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    sendDraw(canvasRef.current._lastX, canvasRef.current._lastY, x, y, currentColor, brushSize);
    canvasRef.current._lastX = x;
    canvasRef.current._lastY = y;
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    socket.emit('clear');
  };

  useEffect(() => {
    socket.on('clear', () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
    return () => socket.off('clear');
  }, []);

  return (
    <div className="min-h-screen bg-[#e8e4de] flex items-center justify-center p-6">
      <div className="max-w-5xl w-full">
        
        {/* Whiteboard Frame */}
        <div className="relative bg-white rounded-xl shadow-2xl p-3 border-8 border-[#c4b5a5]">
          
          {/* Top Bar - Marker Tray */}
          <div className="flex items-center justify-between px-4 py-2 bg-[#f1efe9] border-b border-[#d6cec4]">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-[#4a3f35] tracking-wide">✏️ Whiteboard</span>
              <span className="text-xs text-[#8a7f73] bg-[#e8e4de] px-3 py-1 rounded-full">Live</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1">
                <div className="w-5 h-5 rounded-full bg-red-500 border border-white/50 shadow-sm"></div>
                <div className="w-5 h-5 rounded-full bg-blue-500 border border-white/50 shadow-sm"></div>
                <div className="w-5 h-5 rounded-full bg-green-500 border border-white/50 shadow-sm"></div>
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div className="bg-[#faf8f6] rounded-lg overflow-hidden">
            <canvas
              ref={canvasRef}
              width={900}
              height={550}
              className="w-full h-auto cursor-crosshair"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
          </div>

          {/* Bottom Toolbar - Like real whiteboard tray */}
          <div className="flex flex-wrap items-center gap-3 px-4 py-3 bg-[#f1efe9] border-t border-[#d6cec4] rounded-b-lg">
            
            {/* Tools */}
            <div className="flex items-center gap-1 bg-white rounded-lg shadow-sm p-1">
              <button
                onClick={() => setTool('pen')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition ${
                  tool === 'pen'
                    ? 'bg-[#1e293b] text-white shadow-md'
                    : 'text-[#4a3f35] hover:bg-[#e8e4de]'
                }`}
              >
                Marker
              </button>
              <button
                onClick={() => setTool('eraser')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition ${
                  tool === 'eraser'
                    ? 'bg-[#1e293b] text-white shadow-md'
                    : 'text-[#4a3f35] hover:bg-[#e8e4de]'
                }`}
              >
                Eraser
              </button>
            </div>

            {/* Color Picker */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border-2 border-[#d6cec4] overflow-hidden">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-8 h-8 -m-1 cursor-pointer"
                />
              </div>
            </div>

            {/* Size Slider */}
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

            {/* Clear */}
            <button
              onClick={clearCanvas}
              className="ml-auto px-4 py-1.5 text-xs font-medium text-[#8a7f73] hover:text-red-600 hover:bg-red-50 rounded-lg transition border border-[#d6cec4]"
            >
              Clear Board
            </button>
          </div>
        </div>

        {/* Footer hint */}
        <p className="text-center text-sm text-[#8a7f73] mt-4">
          Open in two tabs to draw together — marker tips included
        </p>
      </div>
    </div>
  );
}

export default App;