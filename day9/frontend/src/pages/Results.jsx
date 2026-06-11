import { useEffect, useState } from "react";
import { MapPinned, Wallet, CalendarDays, Activity } from "lucide-react";

const Results = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("trekData"));
    setData(savedData);
  }, []);

  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white text-2xl">
        Loading Trek Route...
      </div>
    );

  let recommendation = {
    name: "Everest Base Camp",
    days: "14 Days",
    altitude: "5364m",
    difficulty: "Hard",
    cost: "NPR 80,000+",
    description:
      "Experience the legendary route to the base of the world's highest mountain.",
  };

  if (data.budget < 30000) {
    recommendation = {
      name: "Ghorepani Poon Hill",
      days: "5 Days",
      altitude: "3210m",
      difficulty: "Easy",
      cost: "NPR 20,000",
      description:
        "Perfect beginner trek with stunning sunrise mountain views.",
    };
  }

  if (data.budget > 70000) {
    recommendation = {
      name: "Annapurna Circuit",
      days: "15 Days",
      altitude: "5416m",
      difficulty: "Moderate",
      cost: "NPR 75,000+",
      description:
        "One of Nepal's most diverse trekking adventures through mountains and villages.",
    };
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/images/mountain.jpg')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-center text-white text-5xl md:text-7xl font-extrabold mb-4">
          Your Trek Route
        </h1>

        <p className="text-center text-gray-300 text-lg mb-12">
          Personalized recommendation generated from your preferences
        </p>

        {/* Recommendation Card */}
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-4xl font-bold text-green-400 mb-4">
            {recommendation.name}
          </h2>

          <p className="text-gray-200 text-lg mb-8">
            {recommendation.description}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 rounded-2xl p-5">
              <CalendarDays className="text-green-400 mb-3" />
              <h3 className="text-white font-semibold">Duration</h3>
              <p className="text-gray-300">{recommendation.days}</p>
            </div>

            <div className="bg-white/10 rounded-2xl p-5">
              <MapPinned className="text-green-400 mb-3" />
              <h3 className="text-white font-semibold">Altitude</h3>
              <p className="text-gray-300">{recommendation.altitude}</p>
            </div>

            <div className="bg-white/10 rounded-2xl p-5">
              <Activity className="text-green-400 mb-3" />
              <h3 className="text-white font-semibold">Difficulty</h3>
              <p className="text-gray-300">{recommendation.difficulty}</p>
            </div>

            <div className="bg-white/10 rounded-2xl p-5">
              <Wallet className="text-green-400 mb-3" />
              <h3 className="text-white font-semibold">Estimated Cost</h3>
              <p className="text-gray-300">{recommendation.cost}</p>
            </div>
          </div>
        </div>

        {/* User Preferences */}
        <div className="mt-10 backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6">
            Your Preferences
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 p-5 rounded-xl">
              <h3 className="text-green-400 font-semibold">
                Fitness Level
              </h3>
              <p className="text-white mt-2">{data.fitness}</p>
            </div>

            <div className="bg-white/10 p-5 rounded-xl">
              <h3 className="text-green-400 font-semibold">
                Budget
              </h3>
              <p className="text-white mt-2">
                NPR {Number(data.budget).toLocaleString()}
              </p>
            </div>

            <div className="bg-white/10 p-5 rounded-xl">
              <h3 className="text-green-400 font-semibold">
                Available Days
              </h3>
              <p className="text-white mt-2">{data.days} Days</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button
            onClick={() => window.history.back()}
            className="px-8 py-4 rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold transition duration-300"
          >
            Plan Another Trek
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;