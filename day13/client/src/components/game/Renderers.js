// src/components/game/Renderers.js
import { VehicleRenderer } from './VehicleRenderer';

const FONT = '"Fredoka", sans-serif';

// Sky
export const drawSky = (ctx) => {
  const skyGradient = ctx.createLinearGradient(0, 0, 0, 500);
  skyGradient.addColorStop(0, '#6EC6FF');
  skyGradient.addColorStop(0.35, '#8FD9FF');
  skyGradient.addColorStop(0.7, '#BDEBFF');
  skyGradient.addColorStop(1, '#DFF6FF');
  ctx.fillStyle = skyGradient;
  ctx.fillRect(0, 0, 700, 500);
};

// Clouds
export const drawClouds = (ctx, frameCounter) => {
  const cloudPositions = [
    { x: 50, y: 70, size: 1 },
    { x: 180, y: 40, size: 0.8 },
    { x: 350, y: 60, size: 1.2 },
    { x: 500, y: 35, size: 0.9 },
    { x: 650, y: 80, size: 1.1 }
  ];

  cloudPositions.forEach((cloud, index) => {
    const offsetX = (index * 80 + frameCounter * 0.03) % 800 - 100;
    const x = cloud.x + offsetX;
    const y = cloud.y;
    const size = cloud.size;

    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.beginPath();
    ctx.arc(x, y, 28 * size, 0, Math.PI * 2);
    ctx.arc(x + 33 * size, y - 14 * size, 32 * size, 0, Math.PI * 2);
    ctx.arc(x + 66 * size, y, 24 * size, 0, Math.PI * 2);
    ctx.fill();
  });
};

// Pipes
export const drawPipes = (ctx, pipes) => {
  pipes.forEach(pipe => {
    ctx.shadowColor = 'rgba(30, 150, 90, 0.25)';
    ctx.shadowBlur = 18;

    const drawPipeBody = (x, y, w, h) => {
      const grad = ctx.createLinearGradient(x, 0, x + w, 0);
      grad.addColorStop(0, '#4ADE80');
      grad.addColorStop(0.5, '#22C55E');
      grad.addColorStop(1, '#4ADE80');
      ctx.fillStyle = grad;
      const r = 14;
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, r);
      ctx.fill();
    };

    // Top pipe
    drawPipeBody(pipe.x, 0, pipe.width, pipe.topHeight);
    ctx.fillStyle = '#16A34A';
    ctx.beginPath();
    ctx.roundRect(pipe.x - 8, pipe.topHeight - 32, pipe.width + 16, 32, 12);
    ctx.fill();
    ctx.fillStyle = '#34D399';
    ctx.beginPath();
    ctx.roundRect(pipe.x - 6, pipe.topHeight - 30, pipe.width + 12, 26, 10);
    ctx.fill();

    // Bottom pipe
    const bottomY = pipe.topHeight + pipe.gap;
    drawPipeBody(pipe.x, bottomY, pipe.width, 440 - bottomY);
    ctx.fillStyle = '#16A34A';
    ctx.beginPath();
    ctx.roundRect(pipe.x - 8, bottomY, pipe.width + 16, 32, 12);
    ctx.fill();
    ctx.fillStyle = '#34D399';
    ctx.beginPath();
    ctx.roundRect(pipe.x - 6, bottomY + 4, pipe.width + 12, 26, 10);
    ctx.fill();

    ctx.shadowBlur = 0;
  });
};

// Ground
export const drawGround = (ctx, frameCounter) => {
  const groundGradient = ctx.createLinearGradient(0, 440, 0, 500);
  groundGradient.addColorStop(0, '#8ED37B');
  groundGradient.addColorStop(0.35, '#6BBE58');
  groundGradient.addColorStop(1, '#4C9E3F');
  ctx.fillStyle = groundGradient;
  ctx.fillRect(0, 440, 700, 60);
  ctx.fillStyle = '#A6E893';
  ctx.fillRect(0, 440, 700, 4);

  // Flowers
  const flowerColors = ['#FF7AB6', '#FFD93D', '#7EE787', '#63B3FF', '#FF9F7A'];
  for (let i = 0; i < 20; i++) {
    const x = (i * 35 + frameCounter * 0.02) % 700;
    const y = 440 + 30 + Math.sin(i * 0.5) * 15;
    const color = flowerColors[i % flowerColors.length];

    for (let j = 0; j < 5; j++) {
      const angle = (j / 5) * Math.PI * 2 + frameCounter * 0.01;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x + Math.cos(angle) * 5, y + Math.sin(angle) * 5, 4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = '#FFE28A';
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
  }
};

// Vehicle
export const drawVehicle = (ctx, bird, vehicle, color, isInvincible, frameCounter, isPlayer2 = false) => {
  const vehicleMap = {
    car: VehicleRenderer.drawCar.bind(VehicleRenderer),
    bike: VehicleRenderer.drawBike.bind(VehicleRenderer),
    plane: VehicleRenderer.drawPlane.bind(VehicleRenderer),
    helicopter: VehicleRenderer.drawHelicopter.bind(VehicleRenderer)
  };

  const drawFunc = vehicleMap[vehicle] || VehicleRenderer.drawCar.bind(VehicleRenderer);
  const size = isPlayer2 ? 30 : 38;
  const x = isPlayer2 ? bird.x - 80 : bird.x;
  const y = isPlayer2 ? (bird.y || 250) : bird.y;
  
  // Safety check
  if (typeof drawFunc !== 'function') {
    console.warn('Vehicle renderer not found for:', vehicle);
    return;
  }

  // Apply invincibility flash
  if (isInvincible && Math.floor(frameCounter / 8) % 2 === 0) {
    ctx.save();
    ctx.shadowColor = '#FFD700';
    ctx.shadowBlur = 40;
    drawFunc(ctx, x, y, bird.rotation || 0, color, size, isPlayer2);
    ctx.restore();
  } else {
    drawFunc(ctx, x, y, bird.rotation || 0, color, size, isPlayer2);
  }
};

// UI
export const drawUI = (ctx, gameState, vehicle, isMultiplayer, multiplayerState) => {
  // Lives
  ctx.save();
  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.beginPath();
  ctx.roundRect(14, 14, 116, 40, 20);
  ctx.fill();

  const heartXs = [34, 68, 102];
  heartXs.forEach((x, index) => {
    ctx.font = '24px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (index < gameState.lives) {
      ctx.shadowColor = '#FF6B9E';
      ctx.shadowBlur = 10;
      ctx.fillText('❤️', x, 34);
    } else {
      ctx.shadowBlur = 0;
      ctx.fillText('🤍', x, 34);
    }
  });
  ctx.shadowBlur = 0;
  ctx.restore();

  // Score
  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.2)';
  ctx.shadowBlur = 16;
  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.beginPath();
  ctx.roundRect(250, 14, 200, 56, 28);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#1E3A2A';
  ctx.font = `bold 28px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`🏆 ${gameState.score}`, 350, 42);
  if (gameState.combo > 5) {
    ctx.fillStyle = '#E67E22';
    ctx.font = `bold 14px ${FONT}`;
    ctx.fillText(`🔥 ${gameState.combo}x Combo!`, 350, 62);
  }
  ctx.restore();

  // Multiplayer indicator
  if (isMultiplayer && multiplayerState) {
    ctx.save();
    ctx.fillStyle = 'rgba(255,200,0,0.3)';
    ctx.beginPath();
    ctx.roundRect(20, 95, 100, 40, 20);
    ctx.fill();
    ctx.fillStyle = '#FFD700';
    ctx.font = `bold 11px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('👥 2P Mode', 70, 116);
    ctx.restore();

    // Player 2 score
    ctx.save();
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.beginPath();
    ctx.roundRect(30, 135, 80, 30, 15);
    ctx.fill();
    ctx.fillStyle = '#1E3A2A';
    ctx.font = `bold 14px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`P2: ${multiplayerState.score || 0}`, 70, 151);
    ctx.restore();
  }

  // Speed indicator
  if (gameState.gameStarted && !gameState.gameOver) {
    ctx.save();
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.beginPath();
    ctx.roundRect(600, 18, 84, 32, 16);
    ctx.fill();
    const speedPercent = Math.round(gameState.speedMultiplier * 100);
    const speedColor = speedPercent < 150 ? '#22A85E' : speedPercent < 200 ? '#E6A700' : '#E64545';
    ctx.fillStyle = speedColor;
    ctx.font = `bold 14px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`⚡ ${speedPercent}%`, 642, 34);
    ctx.restore();
  }
};

// Polyfill for roundRect
if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
    if (r > w/2) r = w/2;
    if (r > h/2) r = h/2;
    this.moveTo(x + r, y);
    this.lineTo(x + w - r, y);
    this.quadraticCurveTo(x + w, y, x + w, y + r);
    this.lineTo(x + w, y + h - r);
    this.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    this.lineTo(x + r, y + h);
    this.quadraticCurveTo(x, y + h, x, y + h - r);
    this.lineTo(x, y + r);
    this.quadraticCurveTo(x, y, x + r, y);
    this.closePath();
    return this;
  };
}