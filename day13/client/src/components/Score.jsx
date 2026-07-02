import React from 'react';

const Score = ({ score, highScore }) => {
  return (
    <div className="flex items-center gap-4 bg-slate-800/50 backdrop-blur-sm px-6 py-2 rounded-full border border-slate-700">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🏆</span>
        <span className="text-2xl font-bold text-white">{score}</span>
      </div>
      {highScore > 0 && (
        <div className="flex items-center gap-2 border-l border-slate-600 pl-4">
          <span className="text-sm text-slate-400">Best</span>
          <span className="text-xl font-bold text-yellow-400">{highScore}</span>
        </div>
      )}
    </div>
  );
};

export default Score;