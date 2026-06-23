import { forwardRef, useImperativeHandle, useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '../../hooks/useSound';
import { floodFill } from '../../utils/floodFill';

const Canvas = forwardRef(({
  pageData,
  selectedColor,
  brushSize,
  tool,
  onFill,
  onDraw
}, ref) => {
  const bgCanvasRef = useRef(null);
  const colorCanvasRef = useRef(null);
  const bgCtx = useRef(null);
  const colorCtx = useRef(null);
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isLoaded, setIsLoaded] = useState(false);
  const { play } = useSound();

  const size = Math.min(window.innerWidth - 80, 500);

  useEffect(() => {
    const bgCanvas = bgCanvasRef.current;
    const colorCanvas = colorCanvasRef.current;
    bgCanvas.width = size;
    bgCanvas.height = size;
    colorCanvas.width = size;
    colorCanvas.height = size;
    bgCtx.current = bgCanvas.getContext('2d', { willReadFrequently: true });
    colorCtx.current = colorCanvas.getContext('2d', { willReadFrequently: true });
    loadTemplate();
  }, [pageData]);

  const loadTemplate = () => {
    const ctx = bgCtx.current;
    const colorCtxLocal = colorCtx.current;
    if (!ctx) return;

    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);
    if (colorCtxLocal) {
      colorCtxLocal.clearRect(0, 0, size, size);
    }

    const preview = pageData?.preview || pageData?.imageData;
    if (preview) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, size, size);
        setIsLoaded(true);
        saveState();
      };
      img.onerror = () => {
        drawFallback(ctx);
        setIsLoaded(true);
      };
      img.src = preview;
    } else {
      drawFallback(ctx);
      setIsLoaded(true);
    }
  };

  const drawFallback = (ctx) => {
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    ctx.strokeRect(50, 50, size - 100, size - 100);
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, 80, 0, Math.PI * 2);
    ctx.stroke();
    ctx.font = '24px Fredoka';
    ctx.fillStyle = '#999';
    ctx.textAlign = 'center';
    ctx.fillText('🎨 Coloring Page', size / 2, size / 2 + 140);
  };

  const saveState = useCallback(() => {
    const bgCanvas = bgCanvasRef.current;
    const colorCanvas = colorCanvasRef.current;
    if (!bgCanvas || !colorCanvas) return;
    const temp = document.createElement('canvas');
    temp.width = size;
    temp.height = size;
    const tempCtx = temp.getContext('2d');
    tempCtx.drawImage(bgCanvas, 0, 0);
    tempCtx.drawImage(colorCanvas, 0, 0);
    const imageData = temp.toDataURL();
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(imageData);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex, size]);

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      const img = new Image();
      img.onload = () => {
        bgCtx.current.clearRect(0, 0, size, size);
        colorCtx.current.clearRect(0, 0, size, size);
        bgCtx.current.drawImage(img, 0, 0);
      };
      img.src = history[newIndex];
      play('click');
    }
  };

  const clearCanvas = () => {
    colorCtx.current.clearRect(0, 0, size, size);
    saveState();
    play('erase');
  };

  const resetCanvas = () => loadTemplate();

  useImperativeHandle(ref, () => ({
    clearCanvas,
    undo,
    resetCanvas,
    getImageData: () => {
      const bgCanvas = bgCanvasRef.current;
      const colorCanvas = colorCanvasRef.current;
      if (!bgCanvas || !colorCanvas) return null;
      const temp = document.createElement('canvas');
      temp.width = size;
      temp.height = size;
      const tempCtx = temp.getContext('2d');
      tempCtx.drawImage(bgCanvas, 0, 0);
      tempCtx.drawImage(colorCanvas, 0, 0);
      return temp.toDataURL('image/png');
    }
  }));

  const getPos = (e) => {
    const rect = bgCanvasRef.current.getBoundingClientRect();
    const scaleX = size / rect.width;
    const scaleY = size / rect.height;
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

    if (tool === 'fill') {
      try {
        const filled = floodFill(colorCtx.current, Math.round(pos.x), Math.round(pos.y), selectedColor);
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
    const ctx = colorCtx.current;
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(pos.x, pos.y);
    
    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(255,255,255,1)';
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = selectedColor;
    }
    
    ctx.lineWidth = brushSize * (tool === 'eraser' ? 3 : 1);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    ctx.globalCompositeOperation = 'source-over';

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
      <canvas
        ref={colorCanvasRef}
        className="absolute top-4 left-4 rounded-lg touch-none"
        style={{ 
          width: `${size}px`, 
          height: `${size}px`,
          pointerEvents: 'none',
        }}
      />
      
      <canvas
        ref={bgCanvasRef}
        className="w-full h-auto rounded-lg cursor-crosshair touch-none relative z-10"
        style={{ 
          maxWidth: '500px', 
          maxHeight: '500px',
          width: `${size}px`,
          height: `${size}px`
        }}
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