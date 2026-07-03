import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { GameProvider, useGame } from './context/GameContext';
import Game from './components/game/Game';
import { GAME_CONFIG } from './constants/gameConfig';

// Custom hook for window resize
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

const AppContent = () => {
  const { fetchScores, highScore, isLoading } = useGame();
  const { width } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(width < 768);
  }, [width]);

  useEffect(() => {
    // Fetch initial scores
    fetchScores();
    
    // Fetch scores every 30 seconds for real-time updates
    const interval = setInterval(() => {
      fetchScores();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchScores]);

  // Get current vehicle emoji for title
  const getVehicleEmoji = () => {
    const vehicles = GAME_CONFIG.VEHICLES;
    const keys = Object.keys(vehicles);
    const randomVehicle = keys[Math.floor(Math.random() * keys.length)];
    return vehicles[randomVehicle].emoji;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
      <div className="relative w-full max-w-4xl">
        {/* Decorative background elements */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative bg-white/5 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/10">
          {/* Header with animated title */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-3">
              <div className="text-4xl sm:text-5xl animate-bounce">
                {getVehicleEmoji()}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Skyride
              </h1>
              {isMobile && (
                <span className="text-xs bg-yellow-400/20 text-yellow-300 px-2 py-1 rounded-full">
                  📱 Mobile
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              {highScore > 0 && (
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                  <span className="text-yellow-400">⭐</span>
                  <span className="text-white font-semibold">{highScore}</span>
                  <span className="text-white/60 text-sm">Best</span>
                </div>
              )}
              {isLoading && (
                <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              )}
            </div>
          </div>

          {/* Main Game Component */}
          <div className="flex justify-center">
            <Game />
          </div>

          {/* Footer with stats and info */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-white/50 text-sm">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span className="text-green-400">●</span> Online
              </span>
              <span className="flex items-center gap-1">
                <span className="text-yellow-400">❤️</span> {GAME_CONFIG.MAX_LIVES} Lives
              </span>
              <span className="flex items-center gap-1">
                <span className="text-purple-400">🎮</span> v2.0
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <a 
                href="https://github.com/pie-1/leapfrog_challenge" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <span>🐙</span> GitHub
              </a>
              <span className="hidden sm:inline">|</span>
              <span className="hidden sm:inline">🚀 #60DaysOfLearning</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Toast notifications */}
      <Toaster 
        position="bottom-center"
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#f1f5f9',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.1)',
          },
          success: {
            iconTheme: {
              primary: '#4ade80',
              secondary: '#1e293b',
            },
          },
          error: {
            iconTheme: {
              primary: '#f87171',
              secondary: '#1e293b',
            },
          },
        }}
      />
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