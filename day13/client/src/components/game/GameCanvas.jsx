// src/components/game/GameCanvas.jsx
import React, { useEffect, useRef } from 'react';
import { drawSky, drawClouds, drawGround, drawPipes, drawVehicle, drawUI } from './Renderers';

const GameCanvas = ({ 
  gameState, 
  vehicle, 
  vehicleColor, 
  isMultiplayer, 
  multiplayerState,
  onCanvasClick 
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear and draw everything
    ctx.clearRect(0, 0, 700, 500);
    
    drawSky(ctx);
    drawClouds(ctx, gameState.frameCounter);
    drawPipes(ctx, gameState.pipes);
    drawGround(ctx, gameState.frameCounter);
    
    // Draw vehicles
    drawVehicle(ctx, gameState.bird, vehicle, vehicleColor, gameState.isInvincible, gameState.frameCounter, false);
    
    if (isMultiplayer && multiplayerState) {
      drawVehicle(ctx, multiplayerState.bird, vehicle, '#4ECDC4', false, gameState.frameCounter, true);
    }
    
    drawUI(ctx, gameState, vehicle, isMultiplayer, multiplayerState);
  }, [gameState, vehicle, vehicleColor, isMultiplayer, multiplayerState]);

  return (
    <canvas
      ref={canvasRef}
      width={700}
      height={500}
      onClick={onCanvasClick}
      className="game-canvas cursor-pointer rounded-3xl shadow-2xl transition-transform hover:scale-[1.002]"
    />
  );
};

export default GameCanvas;