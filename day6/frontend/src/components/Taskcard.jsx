import { useDraggable } from "@dnd-kit/core";
import { motion } from "framer-motion";
import { Trash2, Edit2 } from "lucide-react";
import { useTaskStore } from "../store/TaskStore";

const TaskCard = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });

  const { deleteTask } = useTaskStore();

  const style = transform 
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } 
    : undefined;

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      whileHover={{ scale: 1.03 }}
      className="bg-[#16161e] border border-white/10 rounded-2xl p-5 cursor-grab active:cursor-grabbing group hover:border-violet-500/50 transition-all"
    >
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-medium leading-tight pr-8">{task.title}</h3>
        <span className={`text-xs px-3 py-1 rounded-full border 
          ${task.priority === 'high' ? 'text-red-400 border-red-500/30' : 
            task.priority === 'medium' ? 'text-yellow-400 border-yellow-500/30' : 
            'text-emerald-400 border-emerald-500/30'}`}>
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="text-gray-400 text-sm mt-3 line-clamp-3">{task.description}</p>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end gap-2 mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();        
                        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="... touch-action"   
            ></div>
            alert("Edit feature coming soon!");
          }}
          className="p-2 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition"
        >
          <Edit2 size={18} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();        
            if (window.confirm("Delete this task?")) {
              deleteTask(task._id);
            }
          }}
          className="p-2 hover:bg-white/10 rounded-xl text-gray-400 hover:text-red-500 transition"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default TaskCard;