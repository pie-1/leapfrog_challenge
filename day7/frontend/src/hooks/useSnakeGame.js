import { useState, useCallback, useEffect, useRef } from 'react';

const GRID_SIZE = 20;
const CELL_SIZE = 25;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 15, y: 15 };

const useSnakeGame = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(localStorage.getItem('naagHighScore') || 0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const gameInterval = useRef(null);

  const generateFood = useCallback((currentSnake) => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (currentSnake.some(s => s.x === newFood.x && s.y === newFood.y));
    return newFood;
  }, []);

  const moveSnake = useCallback(() => {
    setSnake(prevSnake => {
      const newSnake = [...prevSnake];
      const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };

      // Collision check
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE ||
          newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setIsGameOver(true);
        setIsPlaying(false);
        if (score > highScore) {
          localStorage.setItem('naagHighScore', score);
          setHighScore(score);
        }
        return prevSnake;
      }

      newSnake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        setScore(s => s + 10);
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, generateFood, score, highScore]);

  // Game Loop
  useEffect(() => {
    if (isPlaying) {
      gameInterval.current = setInterval(moveSnake, 160);
    } else {
      if (gameInterval.current) {
        clearInterval(gameInterval.current);
      }
    }

    return () => {
      if (gameInterval.current) clearInterval(gameInterval.current);
    };
  }, [isPlaying, moveSnake]);

  const startGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection({ x: 1, y: 0 });
    setScore(0);
    setIsGameOver(false);
    setIsPlaying(true);
  };

  const changeDirection = (newDir) => {
    if (newDir.x === -direction.x && newDir.y === -direction.y) return;
    setDirection(newDir);
  };

  return {
    snake,
    food,
    score,
    highScore,
    isGameOver,
    isPlaying,
    GRID_SIZE,
    CELL_SIZE,
    startGame,
    changeDirection,
  };
};

export default useSnakeGame;
export { useSnakeGame };