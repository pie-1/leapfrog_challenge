import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";
import axios from 'axios';

const Create = () => {
  const { fetchNotes } = useContext(NoteContext);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const submitHandler = async (data) => {
    try {
      await axios.post('http://localhost:5000/api/notes', data);
      toast.success("Note saved successfully ✨");
      reset();
      fetchNotes(); // Refresh list
    } catch (error) {
      toast.error("Failed to save note");
    }
  };

  return (
    <div className="w-1/2 text-white">
      <h1 className="text-6xl font-light leading-tight">
        Capture Your <span className="text-violet-400">Thoughts</span>
        <br />
        in elegant notes
      </h1>

      <form onSubmit={handleSubmit(submitHandler)} className="mt-20">
        <input
          {...register("title", { required: "Give your note a title" })}
          type="text"
          placeholder="Note title..."
          className="w-full bg-transparent border-b border-gray-500 py-4 text-2xl outline-none text-gray-200 placeholder:text-gray-400"
        />
        <small className="font-thin text-red-400 mt-2 block">{errors?.title?.message}</small>

        <textarea
          {...register("content", { required: "Write something meaningful" })}
          placeholder="Pour your thoughts here..."
          rows="6"
          className="w-full bg-transparent border-b border-gray-500 py-4 text-xl outline-none text-gray-200 placeholder:text-gray-400 mt-10 resize-none"
        />
        <small className="font-thin text-red-400 mt-2 block">{errors?.content?.message}</small>

        <button
          type="submit"
          className="mt-12 border border-gray-400 px-12 py-4 text-xl hover:bg-white hover:text-black transition-all duration-300"
        >
          Save Note
        </button>
      </form>
    </div>
  );
};

export default Create;