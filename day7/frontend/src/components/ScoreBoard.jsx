import { Zap, Trophy } from "lucide-react";

const ScoreBoard = ({ score, highScore }) => {
  return (
    <div className="flex gap-8 mb-8">
      <div className="bg-black/70 border border-emerald-500/50 rounded-2xl px-8 py-4 flex items-center gap-4">
        <Zap className="text-emerald-400" size={28} />
        <div>
          <p className="text-xs text-emerald-400/70">SCORE</p>
          <p className="text-4xl font-bold text-emerald-400">{score}</p>
        </div>
      </div>

      <div className="bg-black/70 border border-yellow-400/50 rounded-2xl px-8 py-4 flex items-center gap-4">
        <Trophy className="text-yellow-400" size={28} />
        <div>
          <p className="text-xs text-yellow-400/70">HIGH SCORE</p>
          <p className="text-4xl font-bold text-yellow-400">{highScore}</p>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;