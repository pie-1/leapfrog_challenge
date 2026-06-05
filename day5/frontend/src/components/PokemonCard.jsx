import { motion } from "framer-motion";

const PokemonCard = ({ pokemon }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1, y: -10 }}
      whileTap={{ scale: 0.95 }}
      className="bg-gradient-to-b from-[#1e3a8a] to-[#1e2937] border-4 border-yellow-400 rounded-3xl p-6 text-center shadow-2xl relative overflow-hidden group"
    >
      {/* Pokeball Top Accent */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-red-500 rounded-full border-4 border-white flex items-center justify-center">
        <div className="w-6 h-6 bg-white rounded-full"></div>
      </div>

      <img 
        src={pokemon.image} 
        alt={pokemon.name}
        className="w-44 h-44 mx-auto mt-6 drop-shadow-2xl transition-transform group-hover:scale-110"
      />

      <h3 className="text-3xl font-bold text-white capitalize mt-6 mb-1 drop-shadow-md">
        {pokemon.name}
      </h3>
      
      <p className="text-yellow-300 text-lg font-medium">
        #{pokemon.id.toString().padStart(3, '0')}
      </p>

      <div className="flex justify-center gap-3 mt-6">
        {pokemon.types.map((type, i) => (
          <span 
            key={i}
            className="px-5 py-2 text-sm font-bold rounded-2xl border-2 border-white/30 bg-black/30 text-white"
          >
            {type.toUpperCase()}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default PokemonCard;