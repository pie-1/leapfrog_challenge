import { useEffect, useRef, useState } from 'react';
import rough from 'roughjs';
import { drawShape } from '../../utils/shapeUtils';
import TextInput from './TextInput';

const Canvas = ({
  shapes,
  onCanvasReady,
  onAddShape,
  onUpdateShape,
  onDeleteShape,
  selectedTool = 'rectangle',
  color = '#ffffff',
  fillColor = 'transparent',
  brushSize = 2,
  opacity = 100,
  fontSize = 20
}) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const roughRef = useRef(null);
  const isDrawing = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const currentShape = useRef(null);
  const fileInputRef = useRef(null);

  // Text tool state
  const [showTextInput, setShowTextInput] = useState(false);
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });

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

    if (onCanvasReady) {
      onCanvasReady({ canvas, ctx });
    }

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    drawAllShapes();
  }, [shapes]);

  const drawAllShapes = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!ctx || !roughRef.current) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    shapes.forEach(shape => {
      drawShape(ctx, shape, roughRef.current);
    });
  };

  const getMousePos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
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
      fontSize: fontSize
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
          width: img.width / 2,
          height: img.height / 2,
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
    if (selectedTool === 'select' || selectedTool === 'hand') {
      return;
    }

    if (selectedTool === 'text') {
      const pos = getMousePos(e);
      setTextPosition(pos);
      setShowTextInput(true);
      return;
    }

    if (selectedTool === 'image') {
      fileInputRef.current?.click();
      return;
    }

    const pos = getMousePos(e);
    isDrawing.current = true;
    startPos.current = pos;

    const shapeOptions = {
      strokeColor: color,
      fillColor: fillColor,
      strokeWidth: brushSize,
      opacity: opacity / 100,
      fontSize: fontSize
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

    if (!isDrawing.current || !currentShape.current) {
      return;
    }

    const shape = currentShape.current;
    shape.width = pos.x - shape.x;
    shape.height = pos.y - shape.y;

    if (selectedTool === 'draw') {
      shape.points.push({ x: pos.x, y: pos.y });
    }

    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!ctx || !roughRef.current) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes.forEach(shape => {
      drawShape(ctx, shape, roughRef.current);
    });

    drawShape(ctx, shape, roughRef.current);
  };

  const handleMouseUp = (e) => {
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

      onAddShape(shape);
    }

    isDrawing.current = false;
    currentShape.current = null;
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-screen h-screen bg-[#121212]"
        style={{ 
          display: 'block', 
          cursor: selectedTool === 'select' ? 'default' : 
                  selectedTool === 'hand' ? 'grab' : 'crosshair'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />

      {/* Hidden file input for images */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />

      {/* Text input modal */}
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