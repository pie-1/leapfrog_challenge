import { useEffect, useRef, useState } from 'react';
import rough from 'roughjs';
import { drawShape } from '../../utils/shapeUtils';
import TextInput from './TextInput';

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

  // Selection & resizing state
  const [selectedShapeId, setSelectedShapeId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState(null);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0 });
  const [resizeOriginal, setResizeOriginal] = useState(null);

  // Text tool
  const [showTextInput, setShowTextInput] = useState(false);
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });

  // Animation state
  const [animatingShapes, setAnimatingShapes] = useState([]);

  // Initialize canvas
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

  // Redraw when shapes or background changes
  useEffect(() => {
    drawAllShapes();
  }, [shapes, backgroundColor]);

  // Delete key support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedShapeId) {
        onDeleteShape(selectedShapeId);
        setSelectedShapeId(null);
      }
      if (e.key === 'Escape') {
        setSelectedShapeId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedShapeId, onDeleteShape]);

  // Draw grid
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

  const drawAllShapes = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!ctx || !roughRef.current) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background color
    ctx.fillStyle = backgroundColor || '#121212';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    drawGrid(ctx, canvas);

    // Draw all shapes
    shapes.forEach(shape => {
      drawShape(ctx, shape, roughRef.current);
    });

    // Draw animating shapes (with opacity/scale)
    animatingShapes.forEach(shape => {
      ctx.save();
      ctx.globalAlpha = shape._opacity || 1;
      const scale = shape._scale || 1;
      ctx.translate(shape.x + shape.width/2, shape.y + shape.height/2);
      ctx.scale(scale, scale);
      ctx.translate(-(shape.x + shape.width/2), -(shape.y + shape.height/2));
      drawShape(ctx, shape, roughRef.current);
      ctx.restore();
    });

    // Draw selection highlight and resize handles
    if (selectedShapeId) {
      const selected = shapes.find(s => s.id === selectedShapeId);
      if (selected) {
        ctx.save();
        ctx.strokeStyle = '#4a9eff';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(selected.x - 4, selected.y - 4, selected.width + 8, selected.height + 8);
        ctx.restore();

        // Resize handles
        const handles = [
          { x: selected.x, y: selected.y },
          { x: selected.x + selected.width, y: selected.y },
          { x: selected.x, y: selected.y + selected.height },
          { x: selected.x + selected.width, y: selected.y + selected.height }
        ];
        ctx.save();
        ctx.fillStyle = '#4a9eff';
        handles.forEach(h => {
          ctx.fillRect(h.x - 4, h.y - 4, 8, 8);
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1;
          ctx.strokeRect(h.x - 4, h.y - 4, 8, 8);
        });
        ctx.restore();
      }
    }
  };

  const getMousePos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const findShapeAtPosition = (x, y) => {
    for (let i = shapes.length - 1; i >= 0; i--) {
      const shape = shapes[i];
      if (x >= shape.x && x <= shape.x + shape.width &&
          y >= shape.y && y <= shape.y + shape.height) {
        return shape;
      }
    }
    return null;
  };

  const getResizeHandle = (x, y, shape) => {
    const handleSize = 8;
    const handles = [
      { id: 'nw', x: shape.x - handleSize/2, y: shape.y - handleSize/2 },
      { id: 'ne', x: shape.x + shape.width - handleSize/2, y: shape.y - handleSize/2 },
      { id: 'sw', x: shape.x - handleSize/2, y: shape.y + shape.height - handleSize/2 },
      { id: 'se', x: shape.x + shape.width - handleSize/2, y: shape.y + shape.height - handleSize/2 }
    ];
    for (const handle of handles) {
      if (x >= handle.x && x <= handle.x + handleSize &&
          y >= handle.y && y <= handle.y + handleSize) {
        return handle.id;
      }
    }
    return null;
  };

  const handleAddText = (text) => {
    const shape = {
      type: 'text',
      x: textPosition.x,
      y: textPosition.y,
      width: text.length * 12,
      height: 30,
      text: text,
      strokeColor: color,
      fillColor: 'transparent',
      strokeWidth: 0,
      opacity: opacity / 100,
      fontSize: fontSize,
      fontFamily: fontFamily || 'Inter'
    };
    onAddShape(shape);
    setShowTextInput(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const shape = {
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
        };
        onAddShape(shape);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleMouseDown = (e) => {
    const pos = getMousePos(e);

    // Select tool
    if (selectedTool === 'select') {
      const clickedShape = findShapeAtPosition(pos.x, pos.y);
      if (clickedShape) {
        setSelectedShapeId(clickedShape.id);
        // Check resize handle
        const handle = getResizeHandle(pos.x, pos.y, clickedShape);
        if (handle) {
          setIsResizing(true);
          setResizeHandle(handle);
          setResizeStart({ x: pos.x, y: pos.y });
          setResizeOriginal({ ...clickedShape });
          return;
        }
        setIsDragging(true);
        setDragOffset({
          x: pos.x - clickedShape.x,
          y: pos.y - clickedShape.y
        });
      } else {
        setSelectedShapeId(null);
      }
      return;
    }

    // Eraser tool
    if (selectedTool === 'eraser') {
      const clickedShape = findShapeAtPosition(pos.x, pos.y);
      if (clickedShape) {
        onDeleteShape(clickedShape.id);
        setSelectedShapeId(null);
      }
      return;
    }

    // Text tool
    if (selectedTool === 'text') {
      setTextPosition(pos);
      setShowTextInput(true);
      return;
    }

    // Image tool
    if (selectedTool === 'image') {
      fileInputRef.current?.click();
      return;
    }

    // Drawing tools
    isDrawing.current = true;
    startPos.current = pos;

    const shapeOptions = {
      strokeColor: color,
      fillColor: fillColor,
      strokeWidth: brushSize,
      opacity: opacity / 100,
      fontSize: fontSize,
      fontFamily: fontFamily || 'Inter'
    };

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

    // Resize shape
    if (selectedTool === 'select' && isResizing && selectedShapeId) {
      const shape = shapes.find(s => s.id === selectedShapeId);
      if (shape && resizeOriginal) {
        const dx = pos.x - resizeStart.x;
        const dy = pos.y - resizeStart.y;
        let newX = resizeOriginal.x;
        let newY = resizeOriginal.y;
        let newWidth = resizeOriginal.width;
        let newHeight = resizeOriginal.height;

        if (resizeHandle === 'se' || resizeHandle === 'e') newWidth = Math.max(10, resizeOriginal.width + dx);
        if (resizeHandle === 'se' || resizeHandle === 's') newHeight = Math.max(10, resizeOriginal.height + dy);
        if (resizeHandle === 'nw' || resizeHandle === 'w') {
          newX = resizeOriginal.x + dx;
          newWidth = Math.max(10, resizeOriginal.width - dx);
        }
        if (resizeHandle === 'nw' || resizeHandle === 'n') {
          newY = resizeOriginal.y + dy;
          newHeight = Math.max(10, resizeOriginal.height - dy);
        }
        if (resizeHandle === 'ne') {
          newHeight = Math.max(10, resizeOriginal.height + dy);
        }
        if (resizeHandle === 'sw') {
          newWidth = Math.max(10, resizeOriginal.width + dx);
        }

        onUpdateShape(shape.id, { x: newX, y: newY, width: newWidth, height: newHeight });
        drawAllShapes();
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

    if (selectedTool === 'draw') {
      shape.points.push({ x: pos.x, y: pos.y });
    }

    drawAllShapes();

    // Draw current shape preview with animation
    const ctx = ctxRef.current;
    if (ctx && roughRef.current) {
      drawShape(ctx, shape, roughRef.current);
    }
  };

  const handleMouseUp = (e) => {
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

    const isValid = selectedTool === 'draw' 
      ? shape.points && shape.points.length > 2
      : Math.abs(shape.width) > 5 || Math.abs(shape.height) > 5;

    if (isValid) {
      if (shape.width < 0) {
        shape.x = shape.x + shape.width;
        shape.width = Math.abs(shape.width);
      }
      if (shape.height < 0) {
        shape.y = shape.y + shape.height;
        shape.height = Math.abs(shape.height);
      }
      if (selectedTool !== 'draw') {
        delete shape.points;
      }

      // Add with animation
      const animatedShape = { ...shape, _opacity: 0, _scale: 0.5 };
      setAnimatingShapes([animatedShape]);
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
          cursor: selectedTool === 'select' ? 'default' : 
                  selectedTool === 'eraser' ? 'pointer' : 'crosshair',
          background: backgroundColor || '#121212'
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

      {showTextInput && (
        <TextInput
          onAddText={handleAddText}
          onCancel={() => setShowTextInput(false)}
        />
      )}
    </>
  );
};

export default Canvas;