import { toast } from "react-toastify";
import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

const Read = () => {
  const { expenses, setExpenses } = useContext(ExpenseContext);

  const deleteHandler = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
    toast.error("🗑️ Expense deleted");
  };

  return (
    <div className="w-1/2">
      <h1 className="text-6xl font-light text-pink-400 mb-10">
        Recent <span className="text-white">Expenses</span>
      </h1>

      <div className="space-y-4">
        {expenses.length > 0 ? (
          expenses.map((exp) => (
            <div
              key={exp.id}
              className="bg-[#0d1a33] p-5 flex justify-between items-center rounded-xl hover:bg-[#132a4d] transition"
            >
              <div>
                <p className="text-xl text-gray-200">{exp.description}</p>
                <p className="text-gray-400 text-sm">{exp.category}</p>
              </div>

              <div className="flex items-center gap-6">
                <span className="text-2xl font-medium text-red-400">
                  ₹{exp.amount}
                </span>
                <button
                  onClick={() => deleteHandler(exp.id)}
                  className="text-red-400 hover:text-red-500 transition text-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-lg">No expenses yet</p>
        )}
      </div>
    </div>
  );
};

export default Read;