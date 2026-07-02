import { GAME_CONFIG } from '../constants/gameConfig';

export const rectCircleCollision = (cx, cy, radius, rx, ry, rw, rh) => {
  const nearestX = Math.max(rx, Math.min(cx, rx + rw));
  const nearestY = Math.max(ry, Math.min(cy, ry + rh));
  const dx = cx - nearestX;
  const dy = cy - nearestY;
  return (dx * dx + dy * dy) < (radius * radius);
};

export const checkCollisions = (bird, pipes, groundY) => {
  // Ground collision
  if (bird.y + bird.radius > groundY) return true;
  
  // Ceiling collision
  if (bird.y - bird.radius < 0) return true;
  
  // Pipe collisions
  for (const pipe of pipes) {
    // Top pipe
    if (rectCircleCollision(
      bird.x, bird.y, bird.radius,
      pipe.x, 0, GAME_CONFIG.PIPE_WIDTH, pipe.topHeight
    )) return true;
    
    // Bottom pipe
    if (rectCircleCollision(
      bird.x, bird.y, bird.radius,
      pipe.x, pipe.topHeight + pipe.gap, 
      GAME_CONFIG.PIPE_WIDTH, groundY - (pipe.topHeight + pipe.gap)
    )) return true;
  }
  
  return false;
};