import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GAME_CONFIG } from '../constants/gameConfig';
import { checkCollisions } from '../utils/collision';
import { useGameLoop } from '../hooks/useGameLoop';
import { useSound } from '../hooks/useSound';
import { useGame } from '../context/GameContext';
import GameOver from './GameOver';
import Score from './Score';
import VehicleSelector from './VehicleSelector';

const FONT = '"Fredoka", sans-serif';

const Game = () => {
  const canvasRef = useRef(null);
  const [bird, setBird] = useState({
    x: 120,
    y: 250,
    radius: GAME_CONFIG.PLAYER_RADIUS,
    vy: 0,
    rotation: 0
  });
  const [pipes, setPipes] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [vehicle, setVehicle] = useState('car');
  const [pipeCounter, setPipeCounter] = useState(0);
  const [showGameOver, setShowGameOver] = useState(false);
  const [frameCounter, setFrameCounter] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [baseSpeed, setBaseSpeed] = useState(GAME_CONFIG.PIPE_SPEED);
  const [showStartMessage, setShowStartMessage] = useState(true);
  const [lives, setLives] = useState(GAME_CONFIG.MAX_LIVES);
  const [isInvincible, setIsInvincible] = useState(false);
  const [invincibleTimer, setInvincibleTimer] = useState(0);
  const [combo, setCombo] = useState(0);
  const [showLifeLost, setShowLifeLost] = useState(false);

  const { playSound, soundsLoaded } = useSound();
  const { saveScore, highScore, fetchScores } = useGame();

  const resetGame = useCallback(() => {
    setBird({
      x: 120,
      y: 250,
      radius: GAME_CONFIG.PLAYER_RADIUS,
      vy: 0,
      rotation: 0
    });
    setPipes([]);
    setScore(0);
    setGameOver(false);
    setShowGameOver(false);
    setPipeCounter(0);
    setFrameCounter(0);
    setGameStarted(false);
    setSpeedMultiplier(1);
    setBaseSpeed(GAME_CONFIG.PIPE_SPEED);
    setShowStartMessage(true);
    setLives(GAME_CONFIG.MAX_LIVES);
    setIsInvincible(false);
    setInvincibleTimer(0);
    setCombo(0);
    setShowLifeLost(false);
  }, []);

  const loseLife = useCallback(() => {
    if (isInvincible) return;

    setLives(prev => {
      const newLives = prev - 1;
      if (newLives <= 0) {
        setGameOver(true);
        playSound('die');
        setShowGameOver(true);
        return 0;
      }

      setShowLifeLost(true);
      setTimeout(() => setShowLifeLost(false), 500);

      setIsInvincible(true);
      setInvincibleTimer(0);
      setTimeout(() => setIsInvincible(false), 2000);

      setBird(prev => ({
        ...prev,
        y: 250,
        vy: 0
      }));

      setPipes([]);

      playSound('die');
      return newLives;
    });
  }, [isInvincible, playSound]);

  const flap = useCallback(() => {
    if (gameOver) {
      resetGame();
      return;
    }
    if (!gameStarted) {
      setGameStarted(true);
      setShowStartMessage(false);
    }
    setBird(prev => ({
      ...prev,
      vy: GAME_CONFIG.JUMP_FORCE
    }));
    playSound('flap');
  }, [gameOver, resetGame, playSound, gameStarted]);

  const handleScoreSubmit = useCallback(async (name) => {
    try {
      await saveScore(score, vehicle, name || 'Anonymous');
      await fetchScores(vehicle);
      setShowGameOver(false);
      resetGame();
    } catch (error) {
      console.error('Failed to save score:', error);
    }
  }, [score, vehicle, saveScore, fetchScores, resetGame]);

  const gameLoop = useCallback(() => {
    if (gameOver || !gameStarted) return;

    const newSpeedMultiplier = Math.min(1 + (score * 0.015), 3.5);
    setSpeedMultiplier(newSpeedMultiplier);

    setBird(prev => {
      const gravity = GAME_CONFIG.GRAVITY * (1 + score * 0.003);
      const newVy = prev.vy + gravity;
      const newY = prev.y + newVy;
      const rotation = Math.min(Math.max(newVy * 0.06, -0.6), 0.8);

      return {
        ...prev,
        y: newY,
        vy: newVy,
        rotation
      };
    });

    setPipeCounter(prev => {
      const spawnInterval = Math.max(55, GAME_CONFIG.PIPE_SPAWN_INTERVAL - score * 1.5);
      const newCounter = prev + 1;
      if (newCounter >= spawnInterval) {
        const minGapY = 80;
        const maxGapY = GAME_CONFIG.GROUND_Y - GAME_CONFIG.PIPE_GAP - 50;
        const gapY = Math.floor(Math.random() * (maxGapY - minGapY + 1)) + minGapY;

        setPipes(prevPipes => [...prevPipes, {
          x: 700,
          topHeight: gapY,
          gap: GAME_CONFIG.PIPE_GAP,
          scored: false,
          width: GAME_CONFIG.PIPE_WIDTH
        }]);
        return 0;
      }
      return newCounter;
    });

    setPipes(prevPipes => {
      const currentSpeed = baseSpeed * newSpeedMultiplier;
      const newPipes = prevPipes
        .map(pipe => ({
          ...pipe,
          x: pipe.x - currentSpeed
        }))
        .filter(pipe => pipe.x + pipe.width > -50);

      newPipes.forEach(pipe => {
        if (!pipe.scored && pipe.x + pipe.width < bird.x) {
          pipe.scored = true;
          setScore(prev => {
            const newScore = prev + 1;
            setCombo(prevCombo => prevCombo + 1);
            return newScore;
          });
          playSound('score');
        }
      });

      return newPipes;
    });

    setFrameCounter(prev => prev + 1);

    if (isInvincible) {
      setInvincibleTimer(prev => prev + 1);
    }

    if (!isInvincible) {
      const hasCollision = checkCollisions(bird, pipes, GAME_CONFIG.GROUND_Y);
      if (hasCollision) {
        loseLife();
      }
    }
  }, [bird, gameOver, pipes, playSound, gameStarted, score, baseSpeed, isInvincible, loseLife]);

  useGameLoop(gameLoop);

  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, 700, 500);

    // --- SKY: soft candy-pastel gradient, more "kids app" than "realistic sky" ---
    const skyGradient = ctx.createLinearGradient(0, 0, 0, 500);
    skyGradient.addColorStop(0, '#6EC6FF');
    skyGradient.addColorStop(0.35, '#8FD9FF');
    skyGradient.addColorStop(0.7, '#BDEBFF');
    skyGradient.addColorStop(1, '#DFF6FF');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, 700, 500);

    // --- SUN: friendly, flat, glowing ---
    ctx.save();
    const sunX = 600;
    const sunY = 60;

    for (let i = 0; i < 10; i++) {
      const angle = (i / 10) * Math.PI * 2 + frameCounter * 0.004;
      ctx.fillStyle = 'rgba(255,214,102,0.18)';
      ctx.beginPath();
      ctx.arc(sunX + Math.cos(angle) * 46, sunY + Math.sin(angle) * 46, 16, 0, Math.PI * 2);
      ctx.fill();
    }

    const sunGradient = ctx.createRadialGradient(sunX, sunY, 8, sunX, sunY, 55);
    sunGradient.addColorStop(0, '#FFFDE7');
    sunGradient.addColorStop(0.4, '#FFD666');
    sunGradient.addColorStop(1, 'rgba(255,214,102,0)');
    ctx.fillStyle = sunGradient;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 55, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FFF6D9';
    ctx.beginPath();
    ctx.arc(sunX, sunY, 26, 0, Math.PI * 2);
    ctx.fill();
    // simple smiley touch — subtle, not garish
    ctx.fillStyle = 'rgba(150,110,20,0.5)';
    ctx.beginPath();
    ctx.arc(sunX - 8, sunY - 4, 2.5, 0, Math.PI * 2);
    ctx.arc(sunX + 8, sunY - 4, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // --- CLOUDS ---
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

    // --- PIPES: candy-striped, rounded, friendlier than industrial green ---
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
      drawPipeBody(pipe.x, bottomY, pipe.width, GAME_CONFIG.GROUND_Y - bottomY);
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

    // --- GROUND ---
    const groundGradient = ctx.createLinearGradient(0, GAME_CONFIG.GROUND_Y, 0, 500);
    groundGradient.addColorStop(0, '#8ED37B');
    groundGradient.addColorStop(0.35, '#6BBE58');
    groundGradient.addColorStop(1, '#4C9E3F');
    ctx.fillStyle = groundGradient;
    ctx.fillRect(0, GAME_CONFIG.GROUND_Y, 700, 60);

    ctx.fillStyle = '#A6E893';
    ctx.fillRect(0, GAME_CONFIG.GROUND_Y, 700, 4);

    const flowerColors = ['#FF7AB6', '#FFD93D', '#7EE787', '#63B3FF', '#FF9F7A'];
    for (let i = 0; i < 20; i++) {
      const x = (i * 35 + frameCounter * 0.02) % 700;
      const y = GAME_CONFIG.GROUND_Y + 30 + Math.sin(i * 0.5) * 15;
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

    // --- VEHICLE ---
    const vehicleEmojis = {
      car: '🚗',
      bike: '🏍️',
      plane: '✈️',
      helicopter: '🚁'
    };

    ctx.save();

    if (isInvincible && Math.floor(frameCounter / 8) % 2 === 0) {
      ctx.shadowColor = '#FFD700';
      ctx.shadowBlur = 36;
    }

    ctx.shadowColor = 'rgba(0,0,0,0.25)';
    ctx.shadowBlur = 16;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 4;

    ctx.translate(bird.x, bird.y);
    ctx.rotate(bird.rotation);
    ctx.scale(-1, 1);

    ctx.font = '46px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(vehicleEmojis[vehicle] || '🚗', 0, 0);
    ctx.restore();

    // --- LIVES: rounded pill badge instead of loose hearts ---
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
      if (index < lives) {
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

    // --- LIFE LOST FLASH ---
    if (showLifeLost) {
      ctx.save();
      ctx.fillStyle = 'rgba(255,90,90,0.18)';
      ctx.fillRect(0, 0, 700, 500);

      ctx.fillStyle = '#FF6B6B';
      ctx.font = `bold 42px ${FONT}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = 'rgba(255,0,0,0.4)';
      ctx.shadowBlur = 20;
      ctx.fillText('💔 Oops! -1 Life', 350, 250);
      ctx.shadowBlur = 0;
      ctx.restore();
    }

    // --- SCORE PILL ---
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
    ctx.fillText(`🏆 ${score}`, 350, 42);

    if (combo > 5) {
      ctx.fillStyle = '#E67E22';
      ctx.font = `bold 14px ${FONT}`;
      ctx.fillText(`🔥 ${combo}x Combo!`, 350, 62);
    }
    ctx.restore();

    // --- SPEED PILL ---
    if (gameStarted && !gameOver) {
      ctx.save();
      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      ctx.beginPath();
      ctx.roundRect(600, 18, 84, 32, 16);
      ctx.fill();

      const speedPercent = Math.round(speedMultiplier * 100);
      const speedColor = speedPercent < 150 ? '#22A85E' : speedPercent < 200 ? '#E6A700' : '#E64545';

      ctx.fillStyle = speedColor;
      ctx.font = `bold 14px ${FONT}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`⚡ ${speedPercent}%`, 642, 34);
      ctx.restore();
    }

    // --- START MESSAGE ---
    if (!gameStarted && !gameOver && showStartMessage) {
      ctx.save();
      ctx.fillStyle = 'rgba(20,30,50,0.45)';
      ctx.fillRect(0, 0, 700, 500);

      const pulse = 0.8 + Math.sin(frameCounter * 0.05) * 0.2;

      ctx.shadowColor = 'rgba(0,0,0,0.3)';
      ctx.shadowBlur = 20;

      const colors = ['#FF7AB6', '#FFD93D', '#7EE787', '#63B3FF', '#FF9F7A'];
      ctx.font = `bold 50px ${FONT}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let i = 0; i < 5; i++) {
        ctx.fillStyle = colors[i];
        ctx.fillText(' Skyride', 350 + (i - 2) * 1.5, 180 + (i - 2) * 1.5);
      }
      ctx.fillStyle = '#ffffff';
      ctx.fillText(' Skyride', 350, 180);

      ctx.shadowBlur = 0;

      ctx.fillStyle = `rgba(255, 255, 255, ${pulse})`;
      ctx.font = `bold 26px ${FONT}`;
      ctx.fillText('👆 Tap to Fly!', 350, 250);

      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.font = `16px ${FONT}`;
      ctx.fillText('Press SPACE, ↑ or Click', 350, 300);

      const bounce = Math.sin(frameCounter * 0.04) * 5;
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.font = `15px ${FONT}`;
      ctx.fillText('Pick your ride below 👇', 350, 360 + bounce);

      ctx.restore();
    }

    // --- GAME OVER OVERLAY ---
    if (gameOver && !showGameOver) {
      ctx.save();
      ctx.fillStyle = 'rgba(20,20,35,0.65)';
      ctx.fillRect(0, 0, 700, 500);

      ctx.shadowColor = 'rgba(0,0,0,0.4)';
      ctx.shadowBlur = 20;

      ctx.fillStyle = '#FF6B6B';
      ctx.font = `bold 52px ${FONT}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('💥 Game Over', 350, 200);

      ctx.fillStyle = '#ffffff';
      ctx.font = `28px ${FONT}`;
      ctx.fillText(`Score: ${score}`, 350, 265);

      if (score === highScore && score > 0) {
        ctx.fillStyle = '#FFD700';
        ctx.font = `bold 22px ${FONT}`;
        ctx.fillText('🏆 New High Score! 🏆', 350, 310);
      }

      ctx.shadowBlur = 0;
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.font = `16px ${FONT}`;
      ctx.fillText('👆 Tap to restart', 350, 370);

      ctx.restore();
    }
  }, [bird, pipes, score, gameOver, vehicle, highScore, showGameOver, frameCounter, gameStarted, speedMultiplier, showStartMessage, lives, isInvincible, showLifeLost, combo]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space' || e.key === 'ArrowUp' || e.key === 'w') {
        e.preventDefault();
        flap();
      }
    };

    const handleCanvasClick = () => flap();
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('click', handleCanvasClick);
    }
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      if (canvas) {
        canvas.removeEventListener('click', handleCanvasClick);
      }
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [flap]);

  if (!soundsLoaded) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <div className="text-white text-2xl mb-4" style={{ fontFamily: FONT }}>Loading sounds...</div>
        <div className="w-16 h-16 border-4 border-sky-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={700}
          height={500}
          className="game-canvas cursor-pointer rounded-3xl shadow-2xl transition-transform hover:scale-[1.002]"
        />
        {showGameOver && (
          <GameOver
            score={score}
            onSave={handleScoreSubmit}
            onRestart={resetGame}
          />
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 w-full max-w-2xl">
        <VehicleSelector
          selected={vehicle}
          onSelect={setVehicle}
        />
        <Score score={score} highScore={highScore} />
      </div>
    </div>
  );
};

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

export default Game;