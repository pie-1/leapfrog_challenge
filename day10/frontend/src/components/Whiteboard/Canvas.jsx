import { useEffect, useRef, useState, useCallback } from 'react';
import rough from 'roughjs';
import { drawShape } from '../../utils/shapeUtils';

const Canvas = ({
  shapes = [],
  onAddShape,
  onUpdateShape,
  onDeleteShape,
  selectedTool = 'rectangle',
  color = '#ffffff',
  fillColor = 'transparent',
  brushSize = 2,
  opacity = 100,
  fontSize = 20,
  fontFamily = 'Inter',
  backgroundColor = '#121212'
}) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const roughRef = useRef(null);
  const isDrawing = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const currentShape = useRef(null);
  const fileInputRef = useRef(null);
  const rafId = useRef(null);

  // Selection & resizing
  const [selectedShapeId, setSelectedShapeId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState(null);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0 });
  const [resizeOriginal, setResizeOriginal] = useState(null);

  // Direct text editing
  const [editingText, setEditingText] = useState(null);

  // Animation
  const [animatingShapes, setAnimatingShapes] = useState([]);

  // Init canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    roughRef.current = rough.canvas(canvas);
    drawAllShapes();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawAllShapes();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Redraw with RAF throttling
  const drawAllShapes = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      const canvas = canvasRef.current;
      const ctx = ctxRef.current;
      if (!ctx || !roughRef.current) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawGrid(ctx, canvas);
      shapes.forEach(s => drawShape(ctx, s, roughRef.current));
      animatingShapes.forEach(s => {
        ctx.save();
        ctx.globalAlpha = s._opacity || 1;
        const scale = s._scale || 1;
        ctx.translate(s.x + s.width/2, s.y + s.height/2);
        ctx.scale(scale, scale);
        ctx.translate(-(s.x + s.width/2), -(s.y + s.height/2));
        drawShape(ctx, s, roughRef.current);
        ctx.restore();
      });
      // Selection highlight
      if (selectedShapeId) {
        const selected = shapes.find(s => s.id === selectedShapeId);
        if (selected) {
          ctx.save();
          ctx.strokeStyle = '#4a9eff';
          ctx.lineWidth = 2;
          ctx.setLineDash([5, 5]);
          ctx.strokeRect(selected.x - 4, selected.y - 4, selected.width + 8, selected.height + 8);
          ctx.restore();
          ctx.save();
          ctx.fillStyle = '#4a9eff';
          const handles = [
            { x: selected.x, y: selected.y },
            { x: selected.x + selected.width, y: selected.y },
            { x: selected.x, y: selected.y + selected.height },
            { x: selected.x + selected.width, y: selected.y + selected.height }
          ];
          handles.forEach(h => {
            ctx.fillRect(h.x - 4, h.y - 4, 8, 8);
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 1;
            ctx.strokeRect(h.x - 4, h.y - 4, 8, 8);
          });
          ctx.restore();
        }
      }
    });
  }, [shapes, backgroundColor, selectedShapeId, animatingShapes]);

  const drawGrid = (ctx, canvas) => {
    const gridSize = 20;
    const color = backgroundColor === '#121212' ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)';
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    ctx.restore();
  };

  // Redraw when dependencies change
  useEffect(() => {
    drawAllShapes();
  }, [drawAllShapes]);

  // Delete key support
  useEffect(() => {
    const onKey = (e) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedShapeId) {
        onDeleteShape(selectedShapeId);
        setSelectedShapeId(null);
      }
      if (e.key === 'Escape') setSelectedShapeId(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedShapeId, onDeleteShape]);

  const getMousePos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const findShapeAt = (x, y) => {
    for (let i = shapes.length - 1; i >= 0; i--) {
      const s = shapes[i];
      if (x >= s.x && x <= s.x + s.width && y >= s.y && y <= s.y + s.height) return s;
    }
    return null;
  };

  const getResizeHandle = (x, y, shape) => {
    const size = 8;
    const handles = [
      { id: 'nw', x: shape.x - size/2, y: shape.y - size/2 },
      { id: 'ne', x: shape.x + shape.width - size/2, y: shape.y - size/2 },
      { id: 'sw', x: shape.x - size/2, y: shape.y + shape.height - size/2 },
      { id: 'se', x: shape.x + shape.width - size/2, y: shape.y + shape.height - size/2 }
    ];
    for (const h of handles) {
      if (x >= h.x && x <= h.x + size && y >= h.y && y <= h.y + size) return h.id;
    }
    return null;
  };

  // Text handlers
  const handleTextChange = (e) => {
    setEditingText(prev => ({ ...prev, text: e.target.innerText }));
  };

  const handleTextKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.target.blur(); // save and close
    }
  };

  const handleTextBlur = () => {
    if (editingText && editingText.text.trim()) {
      const shape = {
        type: 'text',
        x: editingText.x,
        y: editingText.y,
        width: editingText.text.length * 12,
        height: 30,
        text: editingText.text.trim(),
        strokeColor: color,
        fillColor: 'transparent',
        strokeWidth: 0,
        opacity: opacity / 100,
        fontSize: fontSize,
        fontFamily: fontFamily || 'Inter'
      };
      onAddShape(shape);
    }
    setEditingText(null);
  };

  // Image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      e.target.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        onAddShape({
          type: 'image',
          x: 100,
          y: 100,
          width: Math.min(img.width / 2, 400),
          height: Math.min(img.height / 2, 300),
          imageData: event.target.result,
          strokeColor: 'transparent',
          fillColor: 'transparent',
          strokeWidth: 0,
          opacity: 1
        });
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleMouseDown = (e) => {
    const pos = getMousePos(e);

    if (selectedTool === 'select') {
      const clicked = findShapeAt(pos.x, pos.y);
      if (clicked) {
        setSelectedShapeId(clicked.id);
        const handle = getResizeHandle(pos.x, pos.y, clicked);
        if (handle) {
          setIsResizing(true);
          setResizeHandle(handle);
          setResizeStart({ x: pos.x, y: pos.y });
          setResizeOriginal({ ...clicked });
          return;
        }
        setIsDragging(true);
        setDragOffset({ x: pos.x - clicked.x, y: pos.y - clicked.y });
      } else {
        setSelectedShapeId(null);
      }
      return;
    }

    if (selectedTool === 'eraser') {
      const clicked = findShapeAt(pos.x, pos.y);
      if (clicked) {
        onDeleteShape(clicked.id);
        setSelectedShapeId(null);
      }
      return;
    }

    if (selectedTool === 'text') {
      setEditingText({ x: pos.x, y: pos.y, text: '' });
      return;
    }

    if (selectedTool === 'image') {
      fileInputRef.current?.click();
      return;
    }

    // Drawing tools
    isDrawing.current = true;
    startPos.current = pos;
    const shapeOptions = { strokeColor: color, fillColor, strokeWidth: brushSize, opacity: opacity/100, fontSize, fontFamily };
    const newShape = {
      type: selectedTool,
      x: pos.x,
      y: pos.y,
      width: 0,
      height: 0,
      points: selectedTool === 'draw' ? [{ x: pos.x, y: pos.y }] : [],
      ...shapeOptions
    };
    currentShape.current = newShape;
  };

  const handleMouseMove = (e) => {
    const pos = getMousePos(e);

    // Resize logic (optimized)
    if (selectedTool === 'select' && isResizing && selectedShapeId) {
      const shape = shapes.find(s => s.id === selectedShapeId);
      if (shape && resizeOriginal) {
        const dx = pos.x - resizeStart.x, dy = pos.y - resizeStart.y;
        let { x: nx, y: ny, width: nw, height: nh } = resizeOriginal;
        if (resizeHandle === 'se' || resizeHandle === 'e') nw = Math.max(10, resizeOriginal.width + dx);
        if (resizeHandle === 'se' || resizeHandle === 's') nh = Math.max(10, resizeOriginal.height + dy);
        if (resizeHandle === 'nw' || resizeHandle === 'w') { nx = resizeOriginal.x + dx; nw = Math.max(10, resizeOriginal.width - dx); }
        if (resizeHandle === 'nw' || resizeHandle === 'n') { ny = resizeOriginal.y + dy; nh = Math.max(10, resizeOriginal.height - dy); }
        if (resizeHandle === 'ne') { nh = Math.max(10, resizeOriginal.height + dy); }
        if (resizeHandle === 'sw') { nw = Math.max(10, resizeOriginal.width + dx); }
        onUpdateShape(shape.id, { x: nx, y: ny, width: nw, height: nh });
        drawAllShapes(); // RAF throttled
      }
      return;
    }

    // Drag shape
    if (selectedTool === 'select' && isDragging && selectedShapeId) {
      const shape = shapes.find(s => s.id === selectedShapeId);
      if (shape) {
        shape.x = pos.x - dragOffset.x;
        shape.y = pos.y - dragOffset.y;
        onUpdateShape(shape.id, { x: shape.x, y: shape.y });
        drawAllShapes();
      }
      return;
    }

    if (!isDrawing.current || !currentShape.current) return;
    const shape = currentShape.current;
    shape.width = pos.x - shape.x;
    shape.height = pos.y - shape.y;
    if (selectedTool === 'draw') shape.points.push({ x: pos.x, y: pos.y });

    drawAllShapes();
    const ctx = ctxRef.current;
    if (ctx && roughRef.current) drawShape(ctx, shape, roughRef.current);
  };

  const handleMouseUp = () => {
    if (selectedTool === 'select') {
      setIsDragging(false);
      setIsResizing(false);
      setResizeHandle(null);
      return;
    }

    if (!isDrawing.current || !currentShape.current) {
      isDrawing.current = false;
      return;
    }

    const shape = currentShape.current;
    const isValid = selectedTool === 'draw' ? shape.points && shape.points.length > 2 : Math.abs(shape.width) > 5 || Math.abs(shape.height) > 5;

    if (isValid) {
      if (shape.width < 0) { shape.x = shape.x + shape.width; shape.width = Math.abs(shape.width); }
      if (shape.height < 0) { shape.y = shape.y + shape.height; shape.height = Math.abs(shape.height); }
      if (selectedTool !== 'draw') delete shape.points;
      // Animate
      const animated = { ...shape, _opacity: 0, _scale: 0.5 };
      setAnimatingShapes([animated]);
      setTimeout(() => {
        setAnimatingShapes([]);
        onAddShape(shape);
      }, 200);
    }

    isDrawing.current = false;
    currentShape.current = null;
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-screen h-screen"
        style={{
          display: 'block',
          background: backgroundColor,
          cursor: selectedTool === 'select' ? 'default' : selectedTool === 'eraser' ? 'pointer' : 'crosshair'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />

      {editingText && (
        <div
          className="absolute"
          style={{
            left: editingText.x,
            top: editingText.y,
            color: color,
            fontSize: fontSize,
            fontFamily: fontFamily,
            minWidth: 20,
            minHeight: 24,
            outline: 'none',
            background: 'transparent',
            border: '1px dashed #4a9eff',
            padding: '2px 6px',
            zIndex: 50,
            caretColor: color,
          }}
          contentEditable
          suppressContentEditableWarning
          onInput={handleTextChange}
          onKeyDown={handleTextKeyDown}
          onBlur={handleTextBlur}
          autoFocus
        />
      )}
    </>
  );
};

export default Canvas;