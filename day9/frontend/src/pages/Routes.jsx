import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import RouteMap from "../components/map/RouteMap/index";
import PopularTreks from "../components/home/PopularTreks";


const RoutesPage = () => {
  const [selectedTrek, setSelectedTrek] = useState(null);
  const location = useLocation();
  const [filters, setFilters] = useState({});

  useEffect(() => {
    // Parse URL query parameters
    const params = new URLSearchParams(location.search);
    const maxBudget = params.get("maxBudget");
    if (maxBudget) {
      setFilters({ maxBudget });
    }
  }, [location]);

  return (
    <div className="pb-24">
      <Navbar />
      <div className="pt-24">
        <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20 text-center">
          <h1 className="text-6xl font-bold mb-4 animate-fade-in">
            Explore Nepal
          </h1>
          <p className="mt-4 text-gray-300 text-xl">
            Discover routes across the Himalayas
          </p>
          {filters.maxBudget && (
            <div className="mt-4 inline-block bg-green-600 px-4 py-2 rounded-full text-sm">
              Budget: ₹{filters.maxBudget} NPR
            </div>
          )}
        </section>
        <RouteMap selectedTrek={selectedTrek} />
        <PopularTreks 
          initialFilters={filters} 
          onSelectTrek={setSelectedTrek} 
        />
      </div>
    </div>
  );
};

export default RoutesPage;