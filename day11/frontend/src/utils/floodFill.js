/**
 * Scanline flood fill - much faster and more reliable than stack-based
 * Works better on anti-aliased edges
 */
export const floodFill = (ctx, startX, startY, fillColor, tolerance = 50) => {
  const canvas = ctx.canvas;
  const w = canvas.width;
  const h = canvas.height;

  // Get image data
  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;

  // Convert colors
  const fillRGB = hexToRgb(fillColor);
  const startIdx = (startY * w + startX) * 4;
  const targetRGB = [data[startIdx], data[startIdx + 1], data[startIdx + 2]];

  // Skip if clicking on white background
  if (targetRGB[0] > 240 && targetRGB[1] > 240 && targetRGB[2] > 240) return 0;
  if (colorsMatch(targetRGB, fillRGB, 0)) return 0;

  const visited = new Uint8Array(w * h);
  const stack = [];
  let filledPixels = 0;

  // Start from the clicked point
  stack.push([startX, startY]);

  while (stack.length > 0) {
    const [px, py] = stack.pop();
    const key = py * w + px;

    if (visited[key]) continue;
    if (px < 0 || px >= w || py < 0 || py >= h) continue;

    // Find the left edge of the scanline
    let left = px;
    while (left > 0) {
      const idx = (py * w + (left - 1)) * 4;
      const rgb = [data[idx], data[idx + 1], data[idx + 2]];
      if (!colorsMatch(rgb, targetRGB, tolerance)) break;
      left--;
    }

    // Find the right edge of the scanline
    let right = px;
    while (right < w - 1) {
      const idx = (py * w + (right + 1)) * 4;
      const rgb = [data[idx], data[idx + 1], data[idx + 2]];
      if (!colorsMatch(rgb, targetRGB, tolerance)) break;
      right++;
    }

    // Fill the scanline
    for (let x = left; x <= right; x++) {
      const idx = (py * w + x) * 4;
      data[idx] = fillRGB[0];
      data[idx + 1] = fillRGB[1];
      data[idx + 2] = fillRGB[2];
      data[idx + 3] = 255;
      visited[py * w + x] = 1;
      filledPixels++;
    }

    // Check rows above and below for new scanlines
    for (let y = py - 1; y <= py + 1; y += 2) {
      if (y < 0 || y >= h) continue;
      
      let x = left;
      while (x <= right) {
        // Skip already visited
        while (x <= right && visited[y * w + x]) x++;
        if (x > right) break;

        // Find start of new scanline
        const idx = (y * w + x) * 4;
        const rgb = [data[idx], data[idx + 1], data[idx + 2]];
        if (colorsMatch(rgb, targetRGB, tolerance)) {
          stack.push([x, y]);
        }
        x++;
      }
    }
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