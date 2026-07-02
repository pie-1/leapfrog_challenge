import React, { useState } from 'react';

const GameOver = ({ score, onSave, onRestart }) => {
  const [name, setName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    await onSave(name);
    setIsSaving(false);
  };

  const stars = score >= 50 ? 3 : score >= 30 ? 2 : score >= 10 ? 1 : 0;
  const encouragement =
    stars === 3 ? "Wow, superstar! 🌟" :
    stars === 2 ? "Awesome flying!" :
    stars === 1 ? "Nice run!" :
    "Keep going, champ!";

  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm rounded-3xl"
      style={{ fontFamily: '"Fredoka", sans-serif' }}
    >
      <div className="bg-gradient-to-b from-amber-300 via-pink-400 to-sky-400 p-[3px] rounded-[2rem] max-w-sm w-full mx-4 shadow-2xl animate-bounce-in">
        <div className="bg-white rounded-[1.9rem] px-8 py-9 text-center">

          <div className="text-5xl mb-1">🎉</div>
          <h2 className="text-3xl font-bold text-slate-800 mb-1">
            {encouragement}
          </h2>
          <p className="text-slate-400 text-sm mb-5">Here's how you did</p>

          <div className="inline-flex flex-col items-center bg-gradient-to-b from-amber-50 to-orange-50 rounded-2xl px-8 py-4 mb-2 border-2 border-amber-200">
            <span className="text-5xl font-bold text-orange-500 leading-none">{score}</span>
            <span className="text-sm text-orange-400 font-medium mt-1">points</span>
          </div>

          <div className="text-2xl mb-6 tracking-wide">
            {stars >= 1 ? '🌟' : '⭐️'}
            {stars >= 2 ? '🌟' : '⭐️'}
            {stars >= 3 ? '🌟' : '⭐️'}
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="text-left">
              <label className="block text-sm font-semibold text-slate-500 mb-1.5 ml-1">
                👤 What's your name?
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={20}
                placeholder="Type here..."
                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-amber-200 focus:border-amber-300 transition-all text-center font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-orange-400 text-white font-bold rounded-2xl hover:from-amber-500 hover:to-orange-500 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 text-lg shadow-lg shadow-orange-200"
            >
              {isSaving ? '💾 Saving...' : '💾 Save My Score'}
            </button>

            <button
              type="button"
              onClick={onRestart}
              className="w-full py-3.5 bg-gradient-to-r from-sky-400 to-blue-500 text-white font-bold rounded-2xl hover:from-sky-500 hover:to-blue-600 transition-all transform hover:scale-105 active:scale-95 text-lg shadow-lg shadow-sky-200"
            >
              🔄 Play Again
            </button>
          </form>

          <div className="mt-5 flex items-center justify-center gap-1.5 text-slate-400 text-sm">
            <span>❤️❤️❤️</span>
            <span>3 lives per run</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameOver;