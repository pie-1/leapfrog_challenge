
import { useContext, lazy, Suspense } from "react";
import { PokemonContext } from "./context/PokemonContext";
import Pagination from "./components/Pagination";

const PokemonCard = lazy(() => import("./components/PokemonCard"));

const App = () => {
  const {
    pokemons,
    currentPage,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
  } = useContext(PokemonContext);

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-blue-200 to-yellow-100 relative overflow-hidden">

      {/* Pokéball Background Pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, #ef4444 0 12px, white 12px 24px, transparent 24px)",
          backgroundSize: "100px 100px",
        }}
      />

      {/* Floating Pokémon Elements */}
      <div className="absolute top-16 left-10 text-5xl animate-bounce">
        ⚡
      </div>

      <div className="absolute top-32 right-16 text-5xl animate-pulse">
        🔥
      </div>

      <div className="absolute bottom-20 left-20 text-5xl animate-bounce">
        💧
      </div>

      <div className="absolute bottom-32 right-12 text-5xl animate-pulse">
        🌿
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 relative z-10">

        {/* Pokedex Outer Frame */}
        <div className="bg-red-500 border-[10px] border-red-700 rounded-[40px] p-8 shadow-2xl">

          {/* Header */}
          <header className="text-center mb-10">

            {/* Pokédex Lights */}
            <div className="flex justify-center gap-4 mb-6">
              <div className="w-6 h-6 rounded-full bg-blue-300 border-2 border-white animate-pulse" />
              <div className="w-4 h-4 rounded-full bg-yellow-300" />
              <div className="w-4 h-4 rounded-full bg-green-300" />
              <div className="w-4 h-4 rounded-full bg-red-300" />
            </div>

            <h1
              className="
                text-5xl
                md:text-7xl
                font-extrabold
                text-yellow-300
                tracking-wider
                drop-shadow-[4px_4px_0px_#1e40af]
              "
            >
              POKÉMON
            </h1>

            <h2 className="text-2xl md:text-3xl font-bold text-white mt-3">
              Explorer
            </h2>

            <p className="text-yellow-100 mt-2 text-lg">
              Gotta Catch 'Em All!
            </p>
          </header>

          {/* Pokedex Screen */}
          <div className="bg-cyan-100 border-8 border-gray-800 rounded-3xl p-8 shadow-inner">

            {/* Search */}
            <div className="flex justify-center mb-10">
              <input
                type="text"
                placeholder="🔍 Search Pokémon..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="
                  w-full
                  max-w-xl
                  px-6
                  py-4
                  rounded-full
                  bg-white
                  border-4
                  border-yellow-400
                  shadow-lg
                  text-black
                  text-lg
                  font-bold
                  focus:outline-none
                  focus:ring-4
                  focus:ring-red-400
                  transition-all
                "
              />
            </div>

            {/* Pokemon Grid */}
            <Suspense
              fallback={
                <div className="text-center py-20">
                  <div className="text-7xl animate-spin mb-6">⚪🔴</div>
                  <p className="text-2xl font-bold text-red-600">
                    Searching the Pokédex...
                  </p>
                </div>
              }
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

                {filteredPokemons.length > 0 ? (
                  filteredPokemons.map((pokemon) => (
                    <PokemonCard
                      key={pokemon.id}
                      pokemon={pokemon}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-20">
                    <div className="text-7xl mb-4">😵</div>

                    <h3 className="text-3xl font-bold text-red-500 mb-2">
                      No Pokémon Found!
                    </h3>

                    <p className="text-gray-600 text-lg">
                      Try searching for another Pokémon.
                    </p>
                  </div>
                )}

              </div>
            </Suspense>

            {/* Pagination */}
            <div className="mt-12">
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>

          {/* Bottom Pokedex Buttons */}
          <div className="flex justify-center gap-6 mt-8">
            <div className="w-14 h-14 rounded-full bg-blue-500 border-4 border-blue-800" />
            <div className="w-14 h-14 rounded-full bg-yellow-400 border-4 border-yellow-700" />
            <div className="w-14 h-14 rounded-full bg-green-500 border-4 border-green-800" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default App;

