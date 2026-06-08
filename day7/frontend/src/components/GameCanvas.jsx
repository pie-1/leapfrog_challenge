import { useRef, useEffect, useCallback } from 'react';
import { useSnakeGame } from '../hooks/useSnakeGame';

const GameCanvas = () => {
  const canvasRef = useRef(null);
  const { snake, food, isPlaying, GRID_SIZE, CELL_SIZE, changeDirection } = useSnakeGame();

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#0a0a0f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    snake.forEach((segment, i) => {
      ctx.fillStyle = i === 0 ? '#22ff88' : '#00cc66';
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#22ff88';
      ctx.fillRect(segment.x * CELL_SIZE + 2, segment.y * CELL_SIZE + 2, CELL_SIZE - 4, CELL_SIZE - 4);
    });

    ctx.fillStyle = '#ff0088';
    ctx.shadowBlur = 25;
    ctx.shadowColor = '#ff0088';
    ctx.beginPath();
    ctx.arc(food.x * CELL_SIZE + CELL_SIZE/2, food.y * CELL_SIZE + CELL_SIZE/2, CELL_SIZE/2 - 4, 0, Math.PI * 2);
    ctx.fill();
  }, [snake, food]);

  useEffect(() => {
    draw();
  }, [draw]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isPlaying) return;
      switch (e.key.toLowerCase()) {
        case 'arrowup':
        case 'w':
          changeDirection({ x: 0, y: -1 });
          break;
        case 'arrowdown':
        case 's':
          changeDirection({ x: 0, y: 1 });
          break;
        case 'arrowleft':
        case 'a':
          changeDirection({ x: -1, y: 0 });
          break;
        case 'arrowright':
        case 'd':
          changeDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, changeDirection]);

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={GRID_SIZE * CELL_SIZE}
        height={GRID_SIZE * CELL_SIZE}
        className="border-4 border-emerald-500 rounded-3xl bg-black shadow-2xl"
      />
    </div>
  );
};

export default GameCanvas;