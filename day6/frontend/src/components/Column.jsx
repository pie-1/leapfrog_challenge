import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./Taskcard";

const Column = ({ column, tasks }) => {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  return (
    <div className="min-w-[350px]">
      <div className="flex items-center justify-between mb-6 px-2">
        <div className="flex items-center gap-3">
          <div className={`w-4 h-4 rounded-full ${column.color}`} />
          <h2 className="text-2xl font-light">{column.title}</h2>
          <span className="bg-white/10 text-white/70 text-sm px-3 py-1 rounded-full font-mono">
            {tasks.length}
          </span>
        </div>
      </div>

      <div
        ref={setNodeRef}
        className={`min-h-[620px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 transition-all
          ${isOver ? 'border-violet-400 bg-violet-500/10' : 'hover:border-white/20'}`}
      >
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}

        {tasks.length === 0 && (
          <div className="h-40 flex items-center justify-center text-gray-500 text-sm">
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
};

export default Column;