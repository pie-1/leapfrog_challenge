import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useContext } from "react";

import { ExpenseContext } from "../context/ExpenseContext";

const Create = () => {
  const { expenses, setExpenses } = useContext(ExpenseContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitHandler = (data) => {
    const newExpense = {
      id: nanoid(),
      description: data.description,
      amount: Number(data.amount),
      category: data.category,
    };

    setExpenses([...expenses, newExpense]);
    toast.success(" Expense added successfully!");
    reset();
  };

  return (
    <div className="w-1/2 text-white">
      <h1 className="text-6xl font-light leading-tight">
        Track Your <span className="text-red-400">Expenses</span>
        <br />
        easily
      </h1>

      <form onSubmit={handleSubmit(submitHandler)} className="mt-20">
        <input
          {...register("description", { required: "Description is required" })}
          type="text"
          placeholder="Expense description"
          className="w-full bg-transparent border-b border-gray-500 py-3 text-xl outline-none text-gray-200 placeholder:text-gray-400 mb-6"
        />

        <div className="flex gap-6">
          <div className="flex-1">
            <input
              {...register("amount", { required: "Amount is required" })}
              type="number"
              placeholder="Amount"
              className="w-full bg-transparent border-b border-gray-500 py-3 text-xl outline-none text-gray-200 placeholder:text-gray-400"
            />
            <small className="font-thin text-red-400 block mt-1">
              {errors?.amount?.message}
            </small>
          </div>

          <div className="flex-1">
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full bg-blue-500 border-b border-gray-500 py-3 text-xl outline-none text-gray-200"
            >
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Utility">Utility</option>
              <option value="Shopping">Shopping</option>
              <option value="Other">Other</option>
            </select>
            <small className="font-thin text-red-400 block mt-1">
              {errors?.category?.message}
            </small>
          </div>
        </div>

        <button
          type="submit"
          className="mt-12 border border-gray-400 px-10 py-4 text-xl hover:bg-white hover:text-black transition-all"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default Create;