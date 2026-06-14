import { useEffect, useState } from "react";
import TrekCard from "../map/TrekCard";

const PopularTreks = ({ initialFilters = {}, onSelectTrek }) => {
  const [treks, setTreks] = useState([]);
  const [search, setSearch] = useState(initialFilters.search || "");
  const [difficulty, setDifficulty] = useState(initialFilters.difficulty || "");
  const [maxBudget, setMaxBudget] = useState(initialFilters.maxBudget || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let url = "http://localhost:5000/api/treks/filter?";
    const params = [];
    if (difficulty) params.push(`difficulty=${difficulty}`);
    if (maxBudget) params.push(`maxBudget=${maxBudget}`);
    if (params.length) url += params.join("&");
    else url = "http://localhost:5000/api/treks";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTreks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching treks:", error);
        setLoading(false);
      });
  }, [difficulty, maxBudget]);

  const filteredTreks = treks.filter((trek) =>
    trek.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="py-20 bg-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-8">Popular Treks</h2>

        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <input
            type="text"
            placeholder="Search trek..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Moderate">Moderate</option>
            <option value="Hard">Hard</option>
          </select>
          <input
            type="number"
            placeholder="Max Budget (NPR)"
            value={maxBudget}
            onChange={(e) => setMaxBudget(e.target.value)}
            className="p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="mt-4 text-gray-600">Loading treks...</p>
          </div>
        ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTreks.map((trek) => (
            <div 
              key={trek._id || trek.id}
              onClick={() => onSelectTrek && onSelectTrek(trek)}
              className="cursor-pointer transition-transform hover:scale-105"
            >
              <TrekCard trek={trek} />
            </div>
          ))}
        </div>
        )}

        {!loading && filteredTreks.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No treks found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularTreks;