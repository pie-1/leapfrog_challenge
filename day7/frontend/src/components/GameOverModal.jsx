import { useState } from "react";
import { saveScore as saveScoreAPI } from "../api/scores";

const GameOverModal = ({ score, onRestart }) => {
  const [playerName, setPlayerName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveScore = async () => {
    if (!playerName.trim()) return alert("Enter name");

    setIsSaving(true);

    try {
      await saveScoreAPI({
        playerName: playerName.trim(),
        score,
      });

      alert("Score saved!");
      onRestart();
    } catch (err) {
      console.log(err);
      alert("Backend not reachable");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div className="bg-[#111] border-2 border-red-500/60 rounded-3xl p-10 w-full max-w-md text-center">
        <h2 className="text-5xl font-bold text-red-500 mb-4">GAME OVER</h2>
        <p className="text-6xl font-bold text-emerald-400 mb-8">{score}</p>

        <input
          type="text"
          placeholder="ENTER YOUR NAME"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="w-full bg-black border border-emerald-500/50 rounded-2xl py-5 px-6 text-center text-xl mb-6"
          maxLength={12}
        />

        <button
          onClick={handleSaveScore}
          disabled={isSaving}
          className="w-full py-5 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl text-xl font-bold mb-4 hover:scale-105 transition"
        >
          {isSaving ? "SAVING..." : "SAVE SCORE"}
        </button>

        <button
          onClick={onRestart}
          className="w-full py-5 border border-white/30 rounded-2xl hover:bg-white/10 transition"
        >
          PLAY AGAIN
        </button>
      </div>
    </div>
  );
};

export default GameOverModal;