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

  // Detect Game Over
  useEffect(() => {
    if (!game.isPlaying && game.score > 0) {
      setFinalScore(game.score);
      setShowGameOver(true);
    }
  }, [game.isPlaying, game.score]);

  const handleRestart = () => {
    setShowGameOver(false);
    if (game.resetGame) game.resetGame();
  };

  // Prevent page scrolling when playing game
  useEffect(() => {
    const preventScroll = (e) => {
      if (game.isPlaying && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', preventScroll);
    return () => window.removeEventListener('keydown', preventScroll);
  }, [game.isPlaying]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden relative">
      
      {/* Neon Background */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,#22ff8820_0%,transparent_70%)]" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,#ff008820_0%,transparent_60%)]" />

      <div className="relative z-10 min-h-screen flex flex-col items-center py-10 px-4">
        
        <div className="text-center mb-8">
          <h1 className="text-7xl md:text-8xl font-bold tracking-tighter neon-text bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            NAAG RUN
          </h1>
          <p className="text-emerald-400/70 text-xl mt-2">EAT • GROW • SURVIVE</p>
        </div>

        <ScoreBoard score={game.score} highScore={0} />

        <GameCanvas game={game} />

        {!game.isPlaying && !showGameOver && (
          <button
            onClick={game.startGame}
            className="mt-8 px-14 py-6 bg-gradient-to-r from-emerald-500 to-green-500 rounded-3xl text-2xl font-bold hover:scale-110 transition-all shadow-lg shadow-emerald-500/50"
          >
            START GAME
          </button>
        )}

        {showGameOver && (
          <GameOverModal score={finalScore} onRestart={handleRestart} />
        )}

        {/* Leaderboard - Always visible without scrolling much */}
        <div className="mt-16 w-full max-w-md">
          <Leaderboard />
        </div>
      </div>
    </div>
  );
}

export default App;