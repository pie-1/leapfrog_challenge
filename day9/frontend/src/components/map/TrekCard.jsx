const TrekCard = ({ trek }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105">
      <img src={trek.image} alt={trek.name} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{trek.name}</h3>
        <p className="text-gray-600">{trek.location}</p>
        <p className="text-gray-600">{trek.duration} days</p>
        <p className="text-green-600 font-bold mt-2">NPR {trek.budget.toLocaleString()}</p>
        <span className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-semibold
          ${trek.difficulty === "Easy" ? "bg-green-100 text-green-700" : ""}
          ${trek.difficulty === "Moderate" ? "bg-yellow-100 text-yellow-700" : ""}
          ${trek.difficulty === "Hard" ? "bg-red-100 text-red-700" : ""}
        `}>
          {trek.difficulty}
        </span>
      </div>
    </div>
  );
};

export default TrekCard;