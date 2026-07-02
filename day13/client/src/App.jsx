import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { GameProvider, useGame } from './context/GameContext';
import Game from './components/Game';

const AppContent = () => {
  const { fetchScores } = useGame();

  useEffect(() => {
    fetchScores();
  }, [fetchScores]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-3xl shadow-2xl border border-slate-700">
        <h1 className="text-4xl font-bold text-center text-white mb-6">
          🚀 Skyride
        </h1>
        <Game />
        <Toaster position="bottom-center" />
      </div>
    </div>
  );
};

function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

export default App;