import { useState, useEffect } from "react";
import GameCanvas from "./components/GameCanvas";
import ScoreBoard from "./components/ScoreBoard";
import GameOverModal from "./components/GameOverModal";
import Leaderboard from "./components/Leaderboard";
import { useSnakeGame } from "./hooks/useSnakeGame";

function App() {
  const game = useSnakeGame();
  const [showGameOver, setShowGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  // detect game over
  useEffect(() => {
    if (!game.isPlaying && game.score > 0) {
      setFinalScore(game.score);
      setShowGameOver(true);
    }
  }, [game.isPlaying]);

  const handleRestart = () => {
    setShowGameOver(false);
    game.resetGame();
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
      <h1 className="text-4xl mb-4">Naag Run</h1>

      <ScoreBoard score={game.score} highScore={0} />

      <GameCanvas game={game} />

      {!game.isPlaying && !showGameOver && (
        <button
          onClick={game.startGame}
          className="mt-6 px-6 py-3 bg-green-500"
        >
          Start Game
        </button>
      )}

      {showGameOver && (
        <GameOverModal score={finalScore} onRestart={handleRestart} />
      )}

      <Leaderboard />
    </div>
  );
}

export default App;