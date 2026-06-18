import rough from 'roughjs';

export const drawShape = (ctx, shape, roughCanvas) => {
  if (!ctx || !roughCanvas || !shape) return;

  const { type, x, y, width, height, strokeColor, fillColor, strokeWidth, opacity, points, text, fontSize, fontFamily, imageData } = shape;

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
      case 'rectangle':
        roughCanvas.rectangle(x, y, width, height, options);
        break;
      case 'ellipse':
        roughCanvas.ellipse(x + width/2, y + height/2, width, height, options);
        break;
      case 'diamond': {
        const pts = [
          [x + width/2, y],
          [x + width, y + height/2],
          [x + width/2, y + height],
          [x, y + height/2]
        ];
        roughCanvas.polygon(pts, options);
        break;
      }
      case 'arrow': {
        const endX = x + width, endY = y + height;
        roughCanvas.line(x, y, endX, endY, options);
        const angle = Math.atan2(endY - y, endX - x);
        const headLen = 10;
        const headPts = [
          [endX, endY],
          [endX - headLen * Math.cos(angle - 0.5), endY - headLen * Math.sin(angle - 0.5)],
          [endX - headLen * Math.cos(angle + 0.5), endY - headLen * Math.sin(angle + 0.5)]
        ];
        roughCanvas.polygon(headPts, { stroke: strokeColor, strokeWidth, fill: strokeColor });
        break;
      }
      case 'line':
        roughCanvas.line(x, y, x + width, y + height, options);
        break;
      case 'text':
        ctx.fillStyle = strokeColor;
        ctx.font = `${fontSize || 20}px ${fontFamily || 'Inter'}, sans-serif`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText(text || 'Text', x, y);
        break;
      case 'image':
        if (imageData) {
          const img = new Image();
          img.onload = () => ctx.drawImage(img, x, y, width, height);
          img.src = imageData;
        }
        break;
      case 'draw':
        if (points && points.length > 1) {
          const path = points.map(p => Array.isArray(p) ? p : [p.x, p.y]);
          roughCanvas.linearPath(path, options);
        }
        break;
      default:
        break;
    }
  } catch (err) {
    console.warn('Draw error:', err);
  }
  ctx.restore();
};