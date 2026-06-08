import { useState } from "react";
import axios from "axios";

const GameOverModal = ({ score, onRestart }) => {
  const [playerName, setPlayerName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const saveScore = async () => {
    if (!playerName.trim()) return alert("Please enter your name");

    setIsSaving(true);
    try {
      await axios.post("http://localhost:5000/api/scores", {
        playerName: playerName.trim(),
        score: score,
      });
      alert("Score saved successfully!");
      onRestart();
    } catch (error) {
      alert("Failed to save score");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50">
      <div className="bg-[#111] border border-red-500/50 rounded-3xl p-10 w-full max-w-md text-center">
        <h2 className="text-5xl font-bold text-red-500 mb-2">GAME OVER</h2>
        <p className="text-emerald-400 text-6xl font-bold mb-8">{score}</p>

        <input
          type="text"
          placeholder="YOUR NAME"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="w-full bg-black border border-emerald-500/50 rounded-2xl py-5 px-6 text-center text-xl mb-6 focus:outline-none"
          maxLength={10}
        />

        <button
          onClick={saveScore}
          disabled={isSaving}
          className="w-full py-5 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl text-xl font-bold mb-4 hover:scale-105 transition disabled:opacity-70"
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