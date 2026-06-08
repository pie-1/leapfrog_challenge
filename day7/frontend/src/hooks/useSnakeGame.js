import { useState, useRef, useCallback, useEffect } from "react";

const GRID_SIZE = 20;

const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
];

const INITIAL_FOOD = { x: 15, y: 15 };

export const useSnakeGame = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const intervalRef = useRef(null);

  const generateFood = (snakeBody) => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snakeBody.some((s) => s.x === newFood.x && s.y === newFood.y));

    return newFood;
  };

  const moveSnake = useCallback(() => {
    setSnake((prev) => {
      const head = {
        x: prev[0].x + direction.x,
        y: prev[0].y + direction.y,
      };

      // collision
      if (
        head.x < 0 ||
        head.x >= GRID_SIZE ||
        head.y < 0 ||
        head.y >= GRID_SIZE ||
        prev.some((s) => s.x === head.x && s.y === head.y)
      ) {
        setIsPlaying(false);
        clearInterval(intervalRef.current);
        return prev;
      }

      const newSnake = [head, ...prev];

      // food eaten
      if (head.x === food.x && head.y === food.y) {
        setScore((s) => s + 10);
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(moveSnake, 150);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, moveSnake]);

  const startGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection({ x: 1, y: 0 });
    setScore(0);
    setIsPlaying(true);
  };

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection({ x: 1, y: 0 });
    setScore(0);
    setIsPlaying(false);
  };

  const changeDirection = (dir) => {
    setDirection((prev) => {
      if (prev.x === -dir.x && prev.y === -dir.y) return prev;
      return dir;
    });
  };

  return {
    snake,
    food,
    score,
    isPlaying,
    GRID_SIZE,
    startGame,
    resetGame,
    changeDirection,
  };
};

