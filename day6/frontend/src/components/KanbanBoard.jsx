import { DndContext, closestCorners } from "@dnd-kit/core";
import { useTaskStore } from "../store/TaskStore";
import Column from "./Column";
import AddTask from "./AddTask";

const columns = [
  { id: "todo", title: "To Do", color: "bg-blue-500" },
  { id: "inprogress", title: "In Progress", color: "bg-yellow-500" },
  { id: "review", title: "Review", color: "bg-purple-500" },
  { id: "done", title: "Done", color: "bg-emerald-500" },
];

const KanbanBoard = () => {
  const { tasks, updateTask } = useTaskStore();

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    updateTask(active.id, { 
      status: over.id,
      order: Date.now()
    });
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="flex gap-6 overflow-x-auto pb-8">
          {columns.map((column) => {
            const columnTasks = tasks
              .filter((task) => task.status === column.id)
              .sort((a, b) => a.order - b.order);

            return (
              <Column
                key={column.id}
                column={column}
                tasks={columnTasks}
              />
            );
          })}
        </div>

        {/* AddTask Component - This was probably missing */}
        <AddTask />
      </div>
    </DndContext>
  );
};

export default KanbanBoard;