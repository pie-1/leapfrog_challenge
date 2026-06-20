import { useCallback } from 'react';
import { floodFill } from '../utils/floodFill';

export const useColorFill = (canvasRef, selectedColor, onFill) => {
  const fillArea = useCallback((x, y) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    try {
      // Get the target color from the clicked pixel
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const idx = (Math.round(y) * canvas.width + Math.round(x)) * 4;
      const targetColor = [data[idx], data[idx + 1], data[idx + 2]];

      // Prevent filling white background
      if (targetColor[0] === 255 && targetColor[1] === 255 && targetColor[2] === 255) return;

      // Perform flood fill
      floodFill(ctx, Math.round(x), Math.round(y), selectedColor);
      
      // Callback for sound effect
      if (onFill) onFill();

      return true;
    } catch (error) {
      console.warn('Fill error:', error);
      return false;
    }
  }, [canvasRef, selectedColor, onFill]);

  return { fillArea };
};
