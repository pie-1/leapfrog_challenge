import React, { useState, useEffect, useCallback } from 'react';
import { GAME_CONFIG } from '../constants/gameConfig';
import { useSound } from '../hooks/useSound';
import { useGame } from '../context/GameContext';
import GameOver from './GameOver';
import Score from './Score';
import VehicleSelector from './VehicleSelector';
import VehicleCustomizer from './VehicleCustomizer';
import MultiplayerMode from './MultiplayerMode';
import GameCanvas from './game/GameCanvas';
import { GameLogic } from './game/GameLogic';
import { PipeManager } from './game/PipeManager';

const FONT = '"Fredoka", sans-serif';

const Game = () => {
  // Game logic instances
  const [gameLogic] = useState(() => new GameLogic());
  const [pipeManager] = useState(() => new PipeManager());
  
  // UI State
  const [vehicle, setVehicle] = useState('car');
  const [vehicleColor, setVehicleColor] = useState('#FF6B6B');
  const [isMultiplayer, setIsMultiplayer] = useState(false);
  const [multiplayerState, setMultiplayerState] = useState(null);
  const [showGameOver, setShowGameOver] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);
  
  const { playSound, soundsLoaded } = useSound();
  const { saveScore, highScore, fetchScores } = useGame();

  // Force re-render for canvas updates
  const triggerUpdate = useCallback(() => {
    setForceUpdate(prev => prev + 1);
  }, []);

  // Reset game
  const resetGame = useCallback(() => {
    gameLogic.reset();
    pipeManager.reset();
    setShowGameOver(false);
    setIsMultiplayer(false);
    setMultiplayerState(null);
    triggerUpdate();
  }, [gameLogic, pipeManager, triggerUpdate]);

  // Handle life loss
  const handleLoseLife = useCallback(() => {
    if (gameLogic.isInvincible) return;
    
    gameLogic.loseLife();
    triggerUpdate();
    
    if (gameLogic.lives <= 0) {
      setShowGameOver(true);
      playSound('die');
    }
  }, [gameLogic, playSound, triggerUpdate]);

  // Flap / Jump
  const flap = useCallback(() => {
    if (gameLogic.gameOver) {
      resetGame();
      return;
    }
    
    const success = gameLogic.flap();
    if (success) {
      if (!gameLogic.gameStarted) {
        gameLogic.gameStarted = true;
      }
      playSound('flap');
      triggerUpdate();
    }
  }, [gameLogic, resetGame, playSound, triggerUpdate]);

  // Handle score submission
  const handleScoreSubmit = useCallback(async (name) => {
    try {
      await saveScore(gameLogic.score, vehicle, name || 'Anonymous');
      await fetchScores(vehicle);
      setShowGameOver(false);
      resetGame();
    } catch (error) {
      console.error('Failed to save score:', error);
    }
  }, [gameLogic.score, vehicle, saveScore, fetchScores, resetGame]);

  // Multiplayer handlers
  const handlePlayerJoin = useCallback((name) => {
    setIsMultiplayer(true);
    setMultiplayerState({
      name: name || 'Player 2',
      score: 0,
      bird: {
        x: 40,
        y: 250,
        vy: 0,
        rotation: 0
      }
    });
  }, []);

  const handlePlayerLeave = useCallback(() => {
    setIsMultiplayer(false);
    setMultiplayerState(null);
  }, []);

  // Vehicle customization
  const handleVehicleCustomize = useCallback((customization) => {
    setVehicleColor(customization.color);
  }, []);

  // Game loop update
  const updateGame = useCallback(() => {
    if (gameLogic.gameOver || !gameLogic.gameStarted) return;

    // Update game logic
    gameLogic.update();
    
    // Update multiplayer
    if (isMultiplayer && multiplayerState) {
      // Auto-play for player 2 with delay
      const targetY = gameLogic.bird.y + (gameLogic.bird.vy * 0.6);
      const currentVy = multiplayerState.bird.vy || 0;
      const newVy = currentVy + (GAME_CONFIG.GRAVITY * 0.85) + (targetY - multiplayerState.bird.y) * 0.015;
      multiplayerState.bird.y = multiplayerState.bird.y + newVy;
      multiplayerState.bird.vy = newVy;
      multiplayerState.bird.rotation = Math.min(Math.max(newVy * 0.05, -0.5), 0.7);
    }

    // Spawn pipes
    if (pipeManager.shouldSpawn(gameLogic.score)) {
      const pipe = pipeManager.spawnPipe(gameLogic.score);
      gameLogic.pipes.push(pipe);
    }

    // Update pipes
    const scoredCount = pipeManager.update(gameLogic.speedMultiplier);
    if (scoredCount > 0) {
      gameLogic.score += scoredCount;
      gameLogic.combo += scoredCount;
      playSound('score');
      
      // Update multiplayer score
      if (isMultiplayer && multiplayerState) {
        multiplayerState.score += scoredCount;
      }
    }

    // Check collision
    if (!gameLogic.isInvincible) {
      const hasCollision = gameLogic.checkCollisions();
      if (hasCollision) {
        handleLoseLife();
      }
    }

    // Update frame counter
    gameLogic.frameCounter++;
    
    triggerUpdate();
  }, [gameLogic, pipeManager, isMultiplayer, multiplayerState, playSound, handleLoseLife, triggerUpdate]);

  // Set up game loop
  useEffect(() => {
    const interval = setInterval(updateGame, 1000 / 60);
    return () => clearInterval(interval);
  }, [updateGame]);

  // Keyboard and click handlers
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space' || e.key === 'ArrowUp' || e.key === 'w') {
        e.preventDefault();
        flap();
      }
    };

    const handleCanvasClick = () => flap();
    window.addEventListener('keydown', handleKeyPress);
    document.addEventListener('click', handleCanvasClick);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('click', handleCanvasClick);
    };
  }, [flap]);

  // Loading state
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
        <GameCanvas
          gameState={{
            bird: gameLogic.bird,
            pipes: gameLogic.pipes,
            score: gameLogic.score,
            gameOver: gameLogic.gameOver,
            gameStarted: gameLogic.gameStarted,
            lives: gameLogic.lives,
            isInvincible: gameLogic.isInvincible,
            combo: gameLogic.combo,
            speedMultiplier: gameLogic.speedMultiplier,
            frameCounter: gameLogic.frameCounter
          }}
          vehicle={vehicle}
          vehicleColor={vehicleColor}
          isMultiplayer={isMultiplayer}
          multiplayerState={multiplayerState}
          onCanvasClick={flap}
        />
        {showGameOver && (
          <GameOver
            score={gameLogic.score}
            onSave={handleScoreSubmit}
            onRestart={resetGame}
          />
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 w-full max-w-3xl">
        <VehicleSelector
          selected={vehicle}
          onSelect={setVehicle}
        />
        <VehicleCustomizer 
          vehicle={vehicle}
          onCustomize={handleVehicleCustomize}
        />
        <MultiplayerMode 
          players={isMultiplayer ? [{ name: 'Player 1' }, multiplayerState] : [{ name: 'Player 1' }]}
          onPlayerJoin={handlePlayerJoin}
          onPlayerLeave={handlePlayerLeave}
        />
        <Score score={gameLogic.score} highScore={highScore} />
      </div>

      {/* Keyboard shortcuts hint */}
      <div className="text-white/40 text-xs font-medium tracking-wide" style={{ fontFamily: FONT }}>
        🎮 Space / ↑ / Click to fly  ·  ❤️ {gameLogic.lives} lives left
      </div>
    </div>
  );
};

export default Game;