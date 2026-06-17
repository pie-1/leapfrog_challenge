import { useState, useRef, useCallback } from 'react';

export const useDrawing = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#1e293b');
  const [brushSize, setBrushSize] = useState(3);
  const [tool, setTool] = useState('pen');

  const getCanvasContext = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    return canvas.getContext('2d');
  }, []);

  const startDrawing = useCallback((e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    setIsDrawing(true);
    canvas._lastX = x;
    canvas._lastY = y;
  }, []);

  const draw = useCallback((e, sendDraw) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    const ctx = getCanvasContext();
    if (!ctx) return;

    const currentColor = tool === 'eraser' ? '#ffffff' : color;
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(canvas._lastX, canvas._lastY);
    ctx.lineTo(x, y);
    ctx.stroke();

    sendDraw(canvas._lastX, canvas._lastY, x, y, currentColor, brushSize);
    canvas._lastX = x;
    canvas._lastY = y;
  }, [isDrawing, color, brushSize, tool, getCanvasContext]);

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
  }, []);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = getCanvasContext();
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, [getCanvasContext]);

  return {
    canvasRef,
    isDrawing,
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
  };
};