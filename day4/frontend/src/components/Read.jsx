import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { NoteContext } from "../context/NoteContext";
import axios from 'axios';

const Read = () => {
  const { notes, fetchNotes } = useContext(NoteContext);
  const [editingNote, setEditingNote] = useState(null);

  const deleteHandler = async (id) => {
    if (!window.confirm("Delete this note?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`);
      toast.error("Note deleted ");
      fetchNotes();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const startEdit = (note) => setEditingNote(note);

  const updateNote = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/notes/${editingNote._id}`, {
        title: editingNote.title,
        content: editingNote.content
      });
      toast.success("Note updated successfully");
      setEditingNote(null);
      fetchNotes();
    } catch (error) {
      toast.error("Failed to update");
    }
  };

  return (
    <div className="w-1/2">
      <h1 className="text-6xl font-light text-violet-400 mb-12">
        Your Notes <span className="text-white">({notes.length})</span>
      </h1>

      <div className="space-y-6">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div key={note._id} className="bg-[#0d1a33] p-8 rounded-2xl border border-gray-700 hover:border-violet-500/30 transition-all group">
              {editingNote && editingNote._id === note._id ? (
                <form onSubmit={updateNote}>
                  <input
                    value={editingNote.title}
                    onChange={(e) => setEditingNote({...editingNote, title: e.target.value})}
                    className="w-full bg-transparent border-b border-gray-500 py-2 text-xl mb-4"
                  />
                  <textarea
                    value={editingNote.content}
                    onChange={(e) => setEditingNote({...editingNote, content: e.target.value})}
                    className="w-full bg-transparent border-b border-gray-500 py-2 text-lg"
                    rows="4"
                  />
                  <div className="mt-4 flex gap-3">
                    <button type="submit" className="text-green-400">Save</button>
                    <button type="button" onClick={() => setEditingNote(null)} className="text-gray-400">Cancel</button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex justify-between mb-4">
                    <h3 className="text-2xl text-white font-light">{note.title}</h3>
                    <span className="text-sm text-gray-500">{note.date}</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-[17px] mb-8">{note.content}</p>
                  <div className="flex gap-4">
                    <button onClick={() => startEdit(note)} className="text-blue-400 hover:text-blue-500">Edit</button>
                    <button onClick={() => deleteHandler(note._id)} className="text-red-400 hover:text-red-500">Delete</button>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-2xl font-light text-center py-20">No notes yet. Create one!</p>
        )}
      </div>
    </div>
  );
};

export default Read;