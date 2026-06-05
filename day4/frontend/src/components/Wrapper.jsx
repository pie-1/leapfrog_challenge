import { ToastContainer } from "react-toastify";
import NoteProvider from "../context/NoteContext";   

const Wrapper = ({ children }) => {
  return (
    <NoteProvider>                                 
      {children}
      <ToastContainer 
        position="top-center" 
        autoClose={2000} 
        theme="dark"
      />
    </NoteProvider>
  );
};

export default Wrapper;