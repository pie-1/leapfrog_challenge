import rough from 'roughjs';

export const shapeTypes = {
  RECTANGLE: 'rectangle',
  ELLIPSE: 'ellipse',
  DIAMOND: 'diamond',
  ARROW: 'arrow',
  LINE: 'line',
  DRAW: 'draw',
  TEXT: 'text',
  IMAGE: 'image'
};

export const createShape = (type, x, y, width, height, options = {}) => {
  return {
    id: options.id || null,
    type,
    x,
    y,
    width: width || 0,
    height: height || 0,
    strokeColor: options.strokeColor || '#ffffff',
    fillColor: options.fillColor || 'transparent',
    strokeWidth: options.strokeWidth || 2,
    strokeStyle: options.strokeStyle || 'solid',
    opacity: options.opacity || 1,
    points: options.points || [],
    text: options.text || '',
    fontSize: options.fontSize || 20,
    rotation: options.rotation || 0,
    imageData: options.imageData || null
  };
};

export const drawShape = (ctx, shape, roughCanvas) => {
  if (!ctx || !roughCanvas || !shape) return;

  const { 
    type, 
    x, 
    y, 
    width, 
    height, 
    strokeColor, 
    fillColor, 
    strokeWidth, 
    opacity, 
    points, 
    text, 
    fontSize,
    imageData
  } = shape;

  ctx.save();
  ctx.globalAlpha = opacity || 1;

  const options = {
    stroke: strokeColor || '#ffffff',
    strokeWidth: strokeWidth || 2,
    fill: fillColor && fillColor !== 'transparent' ? fillColor : 'transparent',
    fillStyle: 'solid'
  };

  try {
    switch (type) {
      case shapeTypes.RECTANGLE:
        roughCanvas.rectangle(x, y, width, height, options);
        break;

      case shapeTypes.ELLIPSE:
        roughCanvas.ellipse(x + width/2, y + height/2, width, height, options);
        break;

      case shapeTypes.DIAMOND:
        const diamondPoints = [
          [x + width/2, y],
          [x + width, y + height/2],
          [x + width/2, y + height],
          [x, y + height/2]
        ];
        roughCanvas.polygon(diamondPoints, options);
        break;

      case shapeTypes.ARROW:
        const endX = x + width;
        const endY = y + height;
        roughCanvas.line(x, y, endX, endY, options);
        // Arrowhead
        const angle = Math.atan2(endY - y, endX - x);
        const headLen = 10;
        const headPoints = [
          [endX, endY],
          [endX - headLen * Math.cos(angle - 0.5), endY - headLen * Math.sin(angle - 0.5)],
          [endX - headLen * Math.cos(angle + 0.5), endY - headLen * Math.sin(angle + 0.5)]
        ];
        roughCanvas.polygon(headPoints, { 
          stroke: strokeColor, 
          strokeWidth: strokeWidth, 
          fill: strokeColor 
        });
        break;

      case shapeTypes.LINE:
        roughCanvas.line(x, y, x + width, y + height, options);
        break;

      case shapeTypes.TEXT:
        ctx.fillStyle = strokeColor;
        ctx.font = `${fontSize || 20}px Inter, sans-serif`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText(text || 'Text', x, y);
        break;

      case shapeTypes.IMAGE:
        if (imageData) {
          const img = new Image();
          img.onload = () => {
            ctx.drawImage(img, x, y, width, height);
          };
          img.src = imageData;
        }
        break;

      case shapeTypes.DRAW:
        if (points && points.length > 1) {
          // Convert points to array format if needed
          const pathPoints = points.map(p => {
            if (Array.isArray(p)) {
              return p;
            }
            return [p.x || 0, p.y || 0];
          });
          roughCanvas.linearPath(pathPoints, options);
        }
        break;

      default:
        console.warn('Unknown shape type:', type);
        break;
    }
  } catch (error) {
    console.error('Error drawing shape:', error);
  }

  ctx.restore();
};