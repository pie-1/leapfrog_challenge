/**
 * Flood fill algorithm - non-recursive (stack-based)
 * Fills an enclosed area with a given color
 */
export const floodFill = (ctx, startX, startY, fillColor, tolerance = 30) => {
  const canvas = ctx.canvas;
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const w = canvas.width;
  const h = canvas.height;

  // Convert colors to RGB
  const fillRGB = hexToRgb(fillColor);
  const startIdx = (startY * w + startX) * 4;
  const targetRGB = [
    data[startIdx],
    data[startIdx + 1],
    data[startIdx + 2]
  ];

  // If target and fill are same, return
  if (matchColor(targetRGB, fillRGB, 0)) return;

  const stack = [[startX, startY]];
  const visited = new Set();

  while (stack.length > 0) {
    const [px, py] = stack.pop();
    const key = `${px},${py}`;

    if (visited.has(key)) continue;
    if (px < 0 || px >= w || py < 0 || py >= h) continue;

    const idx = (py * w + px) * 4;
    const currentRGB = [data[idx], data[idx + 1], data[idx + 2]];

    if (!matchColor(currentRGB, targetRGB, tolerance)) continue;

    visited.add(key);

    // Fill pixel
    data[idx] = fillRGB[0];
    data[idx + 1] = fillRGB[1];
    data[idx + 2] = fillRGB[2];
    data[idx + 3] = 255;

    // Push neighbors
    stack.push([px + 1, py], [px - 1, py], [px, py + 1], [px, py - 1]);
  }

  ctx.putImageData(imageData, 0, 0);
  return visited.size;
};

// Helper: Convert hex to RGB array
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result 
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] 
    : [0, 0, 0];
};

// Helper: Check if two colors match within tolerance
const matchColor = (c1, c2, tolerance) => {
  return Math.abs(c1[0] - c2[0]) < tolerance &&
         Math.abs(c1[1] - c2[1]) < tolerance &&
         Math.abs(c1[2] - c2[2]) < tolerance;
};