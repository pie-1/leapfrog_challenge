import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";

const Create = () => {
  const { notes, setNotes } = useContext(NoteContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitHandler = (data) => {
    const newNote = {
      id: nanoid(),
      title: data.title,
      content: data.content,
      date: new Date().toISOString().split("T")[0],
    };

    setNotes([...notes, newNote]);
    toast.success("Note created successfully!");
    reset();
  };

  return (
    <div className="w-full max-w-lg">
      <h1 className="text-5xl font-light text-white mb-8">
        Create New <span className="text-violet-400">Note</span>
      </h1>

      <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
        <div>
          <input
            {...register("title", { required: "Title is required" })}
            type="text"
            placeholder="Note Title"
            className="w-full bg-[#1e2a44] border border-gray-600 rounded-xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500 transition"
          />
          <small className="text-red-400 mt-1 block">{errors?.title?.message}</small>
        </div>

        <div>
          <textarea
            {...register("content", { required: "Content is required" })}
            placeholder="Write your note here..."
            rows="6"
            className="w-full bg-[#1e2a44] border border-gray-600 rounded-xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500 transition resize-none"
          />
          <small className="text-red-400 mt-1 block">{errors?.content?.message}</small>
        </div>

        <button
          type="submit"
          className="w-full bg-violet-600 hover:bg-violet-700 text-white py-4 rounded-xl text-xl font-medium transition-all active:scale-95"
        >
          Save Note
        </button>
      </form>
    </div>
  );
};

export default Create;