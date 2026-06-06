import { useState } from "react";
import { Plus } from "lucide-react";
import { useTaskStore } from "../store/TaskStore";

const AddTask = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");

  const { addTask } = useTaskStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      title: title.trim(),
      description: description.trim(),
      status: "todo",
      priority,
      order: Date.now(),
    };

    const success = await addTask(newTask);

    if (success) {
      setTitle("");
      setDescription("");
      setIsOpen(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-8 mt-10">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 px-8 py-5 rounded-3xl transition-all group text-lg"
        >
          <Plus className="group-hover:rotate-90 transition-transform" size={24} />
          <span>Add New Task</span>
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="bg-[#16161e] border border-white/10 rounded-3xl p-8 max-w-lg">
          <h3 className="text-2xl mb-6">Create New Task</h3>

          <input
            type="text"
            placeholder="Task Title *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent border-b border-white/20 py-4 text-xl outline-none mb-6"
            required
          />

          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-transparent border-b border-white/20 py-4 text-lg outline-none resize-none h-28 mb-6"
          />

          <div className="mb-8">
            <label className="block text-sm text-gray-400 mb-2">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="bg-[#1f1f28] border border-white/10 rounded-2xl px-5 py-3 w-full"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex-1 py-4 border border-white/20 rounded-2xl hover:bg-white/5 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-4 bg-violet-600 hover:bg-violet-700 rounded-2xl transition font-medium"
            >
              Create Task
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddTask;