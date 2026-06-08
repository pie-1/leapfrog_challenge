import { useState } from "react";
import GameCanvas from "./components/GameCanvas";
import ScoreBoard from "./components/ScoreBoard";
import GameOverModal from "./components/GameOverModal";
import Leaderboard from "./components/Leaderboard";
import { useSnakeGame } from "./hooks/useSnakeGame";

function App() {
  const [showGameOver, setShowGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const game = useSnakeGame();

  const handleGameOver = (score) => {
    setFinalScore(score);
    setShowGameOver(true);
  };

  const handleRestart = () => {
    setShowGameOver(false);
    game.resetGame();
    game.startGame();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden relative">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,#22ff8820_0%,transparent_70%)]" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,#ff008820_0%,transparent_60%)]" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        <div className="text-center mb-8">
          <h1 className="text-7xl font-bold tracking-tighter neon-text">NAAG RUN</h1>
          <p className="text-emerald-400/70 text-xl">EAT • GROW • SURVIVE</p>
        </div>

        <ScoreBoard score={game.score} highScore={game.highScore} />

        <GameCanvas />

        {!game.isPlaying && !showGameOver && (
          <button
            onClick={game.startGame}
            className="mt-10 px-16 py-6 bg-gradient-to-r from-emerald-500 to-green-500 rounded-3xl text-2xl font-bold hover:scale-110 transition"
          >
            START GAME
          </button>
        )}

        {showGameOver && <GameOverModal score={finalScore} onRestart={handleRestart} />}

        <Leaderboard />
      </div>
    </div>
  );
}

export default App;