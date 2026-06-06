import { useDraggable } from "@dnd-kit/core";
import { motion } from "framer-motion";
import { Trash2, Edit } from "lucide-react";
import { useTaskStore } from "../store/TaskStore";

const TaskCard = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });

  const { deleteTask, updateTask } = useTaskStore();

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  const priorityColors = {
    high: "text-red-400 border-red-500/30",
    medium: "text-yellow-400 border-yellow-500/30",
    low: "text-emerald-400 border-emerald-500/30",
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.97 }}
      className="bg-[#16161e] border border-white/10 rounded-2xl p-5 cursor-grab active:cursor-grabbing group hover:border-violet-500/50 transition-all duration-300"
    >
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-medium leading-tight pr-6">{task.title}</h3>
        <span className={`text-xs px-3 py-1 rounded-full border ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="text-gray-400 text-sm mt-3 line-clamp-3">{task.description}</p>
      )}

      <div className="flex justify-end gap-3 mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => updateTask(task._id, { status: task.status })}
          className="text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-xl transition"
        >
          <Edit size={18} />
        </button>
        <button
          onClick={() => deleteTask(task._id)}
          className="text-gray-400 hover:text-red-500 p-2 hover:bg-white/10 rounded-xl transition"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default TaskCard;