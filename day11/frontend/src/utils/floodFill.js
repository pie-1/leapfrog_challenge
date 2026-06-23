export const floodFill = (ctx, startX, startY, fillColor, tolerance = 50) => {
  const canvas = ctx.canvas;
  const w = canvas.width;
  const h = canvas.height;

  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;

  const fillRGB = hexToRgb(fillColor);
  const startIdx = (startY * w + startX) * 4;
  const targetRGB = [data[startIdx], data[startIdx + 1], data[startIdx + 2]];

  // Don't fill if it's already the target color
  if (colorsMatch(targetRGB, fillRGB, 0)) return 0;

  const stack = [[startX, startY]];
  const visited = new Set();
  let filledPixels = 0;

  while (stack.length > 0) {
    const [px, py] = stack.pop();
    const key = `${px},${py}`;

    if (visited.has(key)) continue;
    if (px < 0 || px >= w || py < 0 || py >= h) continue;

    const idx = (py * w + px) * 4;
    const currentRGB = [data[idx], data[idx + 1], data[idx + 2]];

    if (!colorsMatch(currentRGB, targetRGB, tolerance)) continue;

    visited.add(key);

    data[idx] = fillRGB[0];
    data[idx + 1] = fillRGB[1];
    data[idx + 2] = fillRGB[2];
    data[idx + 3] = 255;

    filledPixels++;

    stack.push([px + 1, py], [px - 1, py], [px, py + 1], [px, py - 1]);
  }

  ctx.putImageData(imageData, 0, 0);
  return filledPixels;
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