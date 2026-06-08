import { Trophy } from "lucide-react";
import axios from "axios";
import { useState, useEffect } from "react";

const Leaderboard = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchScores = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/scores");
      setScores(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScores();
  }, []);

  return (
    <div className="mt-16 w-full max-w-md">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="text-yellow-400" size={32} />
        <h2 className="text-3xl font-bold tracking-wide">LEADERBOARD</h2>
      </div>

      <div className="bg-[#111] border border-yellow-500/30 rounded-3xl p-6">
        {loading ? (
          <p className="text-center py-12 text-gray-400">Loading...</p>
        ) : scores.length === 0 ? (
          <p className="text-center py-12 text-gray-400">No scores yet. Be the first!</p>
        ) : (
          <div className="space-y-3">
            {scores.map((entry, index) => (
              <div key={entry._id} className="flex justify-between items-center bg-black/60 px-6 py-4 rounded-2xl">
                <div className="flex items-center gap-4">
                  <span className="text-yellow-400 font-bold w-6">#{index + 1}</span>
                  <span className="text-lg">{entry.playerName}</span>
                </div>
                <span className="text-emerald-400 font-bold text-xl">{entry.score}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;