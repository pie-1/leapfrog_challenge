import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const PokemonContext = createContext();

// Default Export (Important for Vite Fast Refresh)
const PokemonProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 12;

  const fetchPokemons = async (page) => {
    setLoading(true);
    try {
      const offset = (page - 1) * itemsPerPage;
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${offset}`
      );

      const detailedPokemons = await Promise.all(
        res.data.results.map(async (pokemon) => {
          const detail = await axios.get(pokemon.url);
          return {
            id: detail.data.id,
            name: detail.data.name,
            image: detail.data.sprites.other['official-artwork'].front_default,
            types: detail.data.types.map(t => t.type.name),
          };
        })
      );

      setPokemons(detailedPokemons);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons(currentPage);
  }, [currentPage]);

  return (
    <PokemonContext.Provider value={{
      pokemons,
      currentPage,
      setCurrentPage,
      loading,
      searchTerm,
      setSearchTerm,
      itemsPerPage
    }}>
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonProvider;