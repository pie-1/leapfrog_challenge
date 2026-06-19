import { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { floodFill } from '../../utils/floodFill';

const Canvas = forwardRef(({ 
  svg, 
  selectedColor, 
  brushSize, 
  tool,
  onFill,
  onDraw 
}, ref) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;

    // Set canvas size
    const size = Math.min(window.innerWidth - 80, 500);
    canvas.width = size;
    canvas.height = size;

    // Load SVG template
    loadTemplate();

    // Save initial state
    saveState();

    // Handle resize
    const handleResize = () => {
      const newSize = Math.min(window.innerWidth - 80, 500);
      canvas.width = newSize;
      canvas.height = newSize;
      loadTemplate();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [svg]);

  // Load SVG template onto canvas
    const loadTemplate = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!ctx || !svg) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // White background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Parse SVG and draw on canvas
    const img = new Image();
    const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    
    img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);
        // Save initial state for undo
        setTimeout(saveState, 100);
    };
    
    img.onerror = () => {
        console.error('Failed to load SVG');
        URL.revokeObjectURL(url);
    };
    
    img.src = url;
    };

  // Save current state for undo
  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const imageData = canvas.toDataURL();
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(imageData);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  // Undo
  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      const img = new Image();
      img.onload = () => {
        const ctx = ctxRef.current;
        if (!ctx) return;
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(img, 0, 0);
      };
      img.src = history[newIndex];
    }
  };

  // Clear canvas (reset to template)
  const clearCanvas = () => {
    loadTemplate();
    saveState();
  };

  // Expose methods to parent
  useImperativeHandle(ref, () => ({
    clearCanvas,
    undo,
  }));

  // Get mouse/touch position
  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  // Start drawing
  const startDrawing = (e) => {
    e.preventDefault();
    const pos = getPos(e);
    setIsDrawing(true);
    setLastPos(pos);

    // If fill tool, perform flood fill
    if (tool === 'fill') {
      const canvas = canvasRef.current;
      const ctx = ctxRef.current;
      if (!ctx) return;
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const idx = (Math.round(pos.y) * canvas.width + Math.round(pos.x)) * 4;
      const targetColor = [data[idx], data[idx + 1], data[idx + 2]];
      
      // Don't fill if clicking on white (background) or same color
      if (targetColor[0] === 255 && targetColor[1] === 255 && targetColor[2] === 255) return;
      
      floodFill(ctx, Math.round(pos.x), Math.round(pos.y), selectedColor);
      saveState();
      if (onFill) onFill();
    }
  };

  // Continue drawing
  const draw = (e) => {
    e.preventDefault();
    if (!isDrawing || tool === 'fill') return;

    const pos = getPos(e);
    const ctx = ctxRef.current;
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : selectedColor;
    ctx.lineWidth = brushSize * (tool === 'eraser' ? 2 : 1);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    setLastPos(pos);
    if (onDraw) onDraw();
  };

  // Stop drawing
  const stopDrawing = (e) => {
    if (isDrawing && tool !== 'fill') {
      saveState();
    }
    setIsDrawing(false);
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', damping: 15 }}
      className="bg-white rounded-2xl shadow-2xl p-4 border-4 border-pastel-pink/30"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-auto rounded-lg cursor-crosshair touch-none"
        style={{ maxWidth: '500px', maxHeight: '500px' }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
    </motion.div>
  );
});

export default Canvas;