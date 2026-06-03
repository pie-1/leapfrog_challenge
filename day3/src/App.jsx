import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Create from "./components/Create";
import Read from "./components/Read";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-[#0f172a] text-white px-8 py-12">
        {/* Navigation */}
        <nav className="flex justify-center mb-16">
          <div className="bg-[#1e2a44] px-8 py-3 rounded-full flex gap-8 border border-gray-700">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-lg px-6 py-2 rounded-full transition ${isActive ? "bg-violet-600 text-white" : "text-gray-300 hover:text-white"}`
              }
            >
              Create Note
            </NavLink>
            <NavLink
              to="/notes"
              className={({ isActive }) =>
                `text-lg px-6 py-2 rounded-full transition ${isActive ? "bg-violet-600 text-white" : "text-gray-300 hover:text-white"}`
              }
            >
              My Notes
            </NavLink>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<Create />} />
            <Route path="/notes" element={<Read />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;