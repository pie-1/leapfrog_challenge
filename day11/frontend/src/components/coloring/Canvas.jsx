import { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useColorFill } from '../../hooks/useColorFill';
import { useSound } from '../../hooks/useSound';

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
  const [isLoaded, setIsLoaded] = useState(false);

  const { fillArea } = useColorFill(canvasRef, selectedColor, onFill);
  const { play } = useSound();

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctxRef.current = ctx;

    const size = Math.min(window.innerWidth - 80, 500);
    canvas.width = size;
    canvas.height = size;

    loadTemplate();

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

    // Clear and set white background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Create image from SVG
    const img = new Image();
    const svgString = svg;
    
    // Create blob URL
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    img.onload = () => {
      // Draw SVG centered and scaled to fit canvas
      const scale = Math.min(canvas.width / 400, canvas.height / 400);
      const x = (canvas.width - 400 * scale) / 2;
      const y = (canvas.height - 400 * scale) / 2;
      
      ctx.drawImage(img, x, y, 400 * scale, 400 * scale);
      URL.revokeObjectURL(url);
      setIsLoaded(true);
      saveState();
    };
    
    img.onerror = (err) => {
      console.warn('SVG load error:', err);
      // Draw fallback
      drawFallback(ctx, canvas.width, canvas.height);
      setIsLoaded(true);
    };
    
    img.src = url;
  };

  // Fallback shapes
  const drawFallback = (ctx, w, h) => {
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    ctx.strokeRect(50, 50, w - 100, h - 100);
    ctx.font = '24px Fredoka';
    ctx.fillStyle = '#999';
    ctx.textAlign = 'center';
    ctx.fillText('🎨 Coloring Page', w/2, h/2);
  };

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const imageData = canvas.toDataURL();
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(imageData);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

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

  const clearCanvas = () => {
    loadTemplate();
  };

  useImperativeHandle(ref, () => ({
    clearCanvas,
    undo,
  }));

  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    let clientX, clientY;
    if (e.touches) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e) => {
    if (!isLoaded) return;
    
    const pos = getPos(e);
    setIsDrawing(true);
    setLastPos(pos);

    if (tool === 'fill') {
      const filled = fillArea(pos.x, pos.y);
      if (filled) {
        saveState();
        play('pop');
      }
    }
  };

  const draw = (e) => {
    if (!isDrawing || tool === 'fill' || !isLoaded) return;

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
    play('brush');
  };

  const stopDrawing = (e) => {
    if (isDrawing && tool !== 'fill' && isLoaded) {
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
        onTouchCancel={stopDrawing}
      />
    </motion.div>
  );
});

export default Canvas;