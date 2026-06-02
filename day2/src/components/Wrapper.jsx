import { ToastContainer } from "react-toastify";
import { ExpenseProvider } from "../context/ExpenseContext";

const Wrapper = ({ children }) => {
  return (
    <ExpenseProvider>
      {children}
      <ToastContainer position="top-center" autoClose={2000} />
    </ExpenseProvider>
  );
};

export default Wrapper;