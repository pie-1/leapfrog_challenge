import { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '../../hooks/useSound';

const Canvas = forwardRef(({
  pageData,
  selectedColor,
  brushSize,
  tool,
  onFill,
  onDraw
}, ref) => {
  const canvasRef = useRef(null);
  const colorCanvasRef = useRef(null);
  const ctxRef = useRef(null);
  const colorCtxRef = useRef(null);
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isLoaded, setIsLoaded] = useState(false);
  const { play } = useSound();

  // Initialize both layers
  useEffect(() => {
    const canvas = canvasRef.current;
    const colorCanvas = colorCanvasRef.current;
    
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const colorCtx = colorCanvas.getContext('2d', { willReadFrequently: true });
    
    ctxRef.current = ctx;
    colorCtxRef.current = colorCtx;

    const size = Math.min(window.innerWidth - 80, 500);
    canvas.width = size;
    colorCanvas.width = size;
    canvas.height = size;
    colorCanvas.height = size;

    loadTemplate();

    const handleResize = () => {
      const newSize = Math.min(window.innerWidth - 80, 500);
      canvas.width = newSize;
      colorCanvas.width = newSize;
      canvas.height = newSize;
      colorCanvas.height = newSize;
      loadTemplate();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [pageData]);

  // Load template on background layer
  const loadTemplate = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    const colorCanvas = colorCanvasRef.current;
    const colorCtx = colorCtxRef.current;
    
    if (!ctx || !pageData) return;

    // Clear background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Clear color layer
    if (colorCtx) {
      colorCtx.clearRect(0, 0, colorCanvas.width, colorCanvas.height);
    }

    // Load page preview
    if (pageData.preview) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        setIsLoaded(true);
        saveState();
      };
      img.onerror = () => {
        drawFallback(ctx, canvas.width, canvas.height);
        setIsLoaded(true);
      };
      img.src = pageData.preview;
    } else {
      drawFallback(ctx, canvas.width, canvas.height);
      setIsLoaded(true);
    }
  };

  const drawFallback = (ctx, w, h) => {
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    ctx.strokeRect(50, 50, w - 100, h - 100);
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, 80, 0, Math.PI * 2);
    ctx.stroke();
    ctx.font = '24px Fredoka';
    ctx.fillStyle = '#999';
    ctx.textAlign = 'center';
    ctx.fillText('🎨 Coloring Page', w / 2, h / 2 + 140);
  };

  // Save state (background + color layer)
  const saveState = () => {
    const canvas = canvasRef.current;
    const colorCanvas = colorCanvasRef.current;
    if (!canvas || !colorCanvas) return;
    
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(canvas, 0, 0);
    tempCtx.drawImage(colorCanvas, 0, 0);
    
    const imageData = tempCanvas.toDataURL();
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(imageData);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      restoreState(history[newIndex]);
      play('click');
    }
  };

  const restoreState = (imageData) => {
    const canvas = canvasRef.current;
    const colorCanvas = colorCanvasRef.current;
    const ctx = ctxRef.current;
    const colorCtx = colorCtxRef.current;
    if (!ctx || !colorCtx) return;

    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      colorCtx.clearRect(0, 0, colorCanvas.width, colorCanvas.height);
      ctx.drawImage(img, 0, 0);
    };
    img.src = imageData;
  };

  const clearCanvas = () => {
    const colorCanvas = colorCanvasRef.current;
    const colorCtx = colorCtxRef.current;
    if (colorCtx) {
      colorCtx.clearRect(0, 0, colorCanvas.width, colorCanvas.height);
    }
    saveState();
    play('erase');
  };

  const resetCanvas = () => {
    loadTemplate();
  };

  useImperativeHandle(ref, () => ({
    clearCanvas,
    undo,
    resetCanvas,
    canvasRef,
    getImageData: () => {
      const canvas = canvasRef.current;
      const colorCanvas = colorCanvasRef.current;
      if (!canvas || !colorCanvas) return null;
      
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tempCtx = tempCanvas.getContext('2d');
      tempCtx.drawImage(canvas, 0, 0);
      tempCtx.drawImage(colorCanvas, 0, 0);
      return tempCanvas.toDataURL('image/png');
    }
  }));

  // Flood fill on color layer only
  const fillColorLayer = (startX, startY, fillColor) => {
    const colorCanvas = colorCanvasRef.current;
    const colorCtx = colorCtxRef.current;
    if (!colorCtx) return 0;

    const w = colorCanvas.width;
    const h = colorCanvas.height;
    const imageData = colorCtx.getImageData(0, 0, w, h);
    const data = imageData.data;
    const fillRGB = hexToRgb(fillColor);
    const startIdx = (startY * w + startX) * 4;
    const targetRGB = [data[startIdx], data[startIdx + 1], data[startIdx + 2]];

    if (targetRGB[0] === 255 && targetRGB[1] === 255 && targetRGB[2] === 255) return 0;
    if (colorsMatch(targetRGB, fillRGB, 0)) return 0;

    const stack = [[startX, startY]];
    const visited = new Set();
    let filled = 0;

    while (stack.length > 0) {
      const [px, py] = stack.pop();
      const key = `${px},${py}`;
      if (visited.has(key)) continue;
      if (px < 0 || px >= w || py < 0 || py >= h) continue;

      const idx = (py * w + px) * 4;
      const current = [data[idx], data[idx + 1], data[idx + 2]];
      if (!colorsMatch(current, targetRGB, 50)) continue;

      visited.add(key);
      data[idx] = fillRGB[0];
      data[idx + 1] = fillRGB[1];
      data[idx + 2] = fillRGB[2];
      data[idx + 3] = 255;
      filled++;

      stack.push([px + 1, py], [px - 1, py], [px, py + 1], [px, py - 1]);
    }

    colorCtx.putImageData(imageData, 0, 0);
    return filled;
  };

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : [0, 0, 0];
  };

  const colorsMatch = (c1, c2, tolerance = 50) => {
    return Math.abs(c1[0] - c2[0]) < tolerance &&
           Math.abs(c1[1] - c2[1]) < tolerance &&
           Math.abs(c1[2] - c2[2]) < tolerance;
  };

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

    // Fill tool – works on color layer
    if (tool === 'fill') {
      try {
        const filled = fillColorLayer(Math.round(pos.x), Math.round(pos.y), selectedColor);
        if (filled > 0) {
          saveState();
          if (onFill) onFill();
          play('pop');
        }
      } catch (err) {
        console.warn('Fill error:', err);
      }
      return;
    }

    setIsDrawing(true);
    setLastPos(pos);
  };

  const draw = (e) => {
    if (!isDrawing || tool === 'fill' || !isLoaded) return;
    const pos = getPos(e);
    const colorCtx = colorCtxRef.current;
    if (!colorCtx) return;

    colorCtx.beginPath();
    colorCtx.moveTo(lastPos.x, lastPos.y);
    colorCtx.lineTo(pos.x, pos.y);
    
    if (tool === 'eraser') {
      colorCtx.globalCompositeOperation = 'destination-out';
      colorCtx.strokeStyle = 'rgba(255,255,255,1)';
    } else {
      colorCtx.globalCompositeOperation = 'source-over';
      colorCtx.strokeStyle = selectedColor;
    }
    
    colorCtx.lineWidth = brushSize * (tool === 'eraser' ? 3 : 1);
    colorCtx.lineCap = 'round';
    colorCtx.lineJoin = 'round';
    colorCtx.stroke();

    colorCtx.globalCompositeOperation = 'source-over';

    setLastPos(pos);
    if (onDraw) onDraw();
    play('brush');
  };

  const stopDrawing = () => {
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
      className="bg-white rounded-2xl shadow-2xl p-4 border-4 border-pastel-pink/30 relative"
    >
      {/* Color Layer (top) */}
      <canvas
        ref={colorCanvasRef}
        className="absolute top-4 left-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] rounded-lg touch-none"
        style={{ maxWidth: '500px', maxHeight: '500px', pointerEvents: 'none' }}
      />
      
      {/* Background Layer */}
      <canvas
        ref={canvasRef}
        className="w-full h-auto rounded-lg cursor-crosshair touch-none relative z-10"
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