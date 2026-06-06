import { useEffect } from "react";
import { useTaskStore } from "./store/TaskStore";
import KanbanBoard from "./components/KanbanBoard";

function App() {
  const { fetchTasks } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden relative">
      {/* Artistic Background */}
      <div className="fixed inset-0 bg-[radial-gradient(at_top,#4f46e530_0%,transparent_50%)]" />
      <div className="fixed inset-0 bg-[radial-gradient(at_bottom_right,#7c3aed20_0%,transparent_60%)]" />
      
      <div className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative z-10">
        <header className="border-b border-white/10 py-7">
          <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/50">
                <span className="text-2xl font-bold">WF</span>
              </div>
              <h1 className="text-4xl font-light tracking-tighter">WorkFlow</h1>
            </div>
            <p className="text-gray-400 text-lg">Where tasks find their flow</p>
          </div>
        </header>

        <KanbanBoard />
      </div>
    </div>
  );
}

export default App;