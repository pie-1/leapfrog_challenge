import { toast } from "react-toastify";
import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";

const Read = () => {
  const { notes, setNotes } = useContext(NoteContext);

  const deleteHandler = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
    toast.error("Note deleted");
  };

  return (
    <div className="w-full">
      <h1 className="text-5xl font-light text-violet-400 mb-10">
        My Notes <span className="text-white">({notes.length})</span>
      </h1>

      <div className="grid grid-cols-1 gap-6">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div
              key={note.id}
              className="bg-[#1e2a44] border border-gray-700 rounded-2xl p-6 hover:border-violet-500 transition group"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl text-white font-medium">{note.title}</h3>
                <span className="text-xs text-gray-400">{note.date}</span>
              </div>

              <p className="text-gray-300 leading-relaxed mb-6">{note.content}</p>

              <button
                onClick={() => deleteHandler(note.id)}
                className="text-red-400 hover:text-red-500 text-sm opacity-70 group-hover:opacity-100 transition"
              >
                Delete Note
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-xl">No notes yet. Create your first one! ✨</p>
        )}
      </div>
    </div>
  );
};

export default Read;