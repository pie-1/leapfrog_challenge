import { useRef, useEffect, useCallback } from "react";

const GameCanvas = ({ game }) => {
  const canvasRef = useRef(null);
  const CELL = 25;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // snake
    game.snake.forEach((s, i) => {
      ctx.fillStyle = i === 0 ? "lime" : "green";
      ctx.fillRect(s.x * CELL, s.y * CELL, CELL - 2, CELL - 2);
    });

    // food
    ctx.fillStyle = "red";
    ctx.fillRect(
      game.food.x * CELL,
      game.food.y * CELL,
      CELL - 2,
      CELL - 2
    );
  }, [game.snake, game.food]);

  useEffect(() => {
    const interval = setInterval(draw, 60);
    return () => clearInterval(interval);
  }, [draw]);

  useEffect(() => {
    const handleKey = (e) => {
      switch (e.key) {
        case "ArrowUp":
          game.changeDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          game.changeDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          game.changeDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          game.changeDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [game]);

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={500}
      className="border border-white"
    />
  );
};

export default GameCanvas;