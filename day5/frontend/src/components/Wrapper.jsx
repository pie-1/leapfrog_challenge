import { ToastContainer } from "react-toastify";
import PokemonProvider from "../context/PokemonContext";   // ← Default Import

const Wrapper = ({ children }) => {
  return (
    <PokemonProvider>
      {children}
      <ToastContainer position="top-center" autoClose={1500} theme="dark" />
    </PokemonProvider>
  );
};

export default Wrapper;