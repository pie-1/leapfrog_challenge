import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RoutesPage from "./pages/Routes";
import Results from "./pages/Results";
import Safety from "./pages/Safety";
import Permits from "./pages/Permits";
import Guides from "./pages/Guides";
import Dashboard from "./pages/Dashboard";
// Temporary Login component that redirects to home
const Login = () => {
  window.location.href = "/";
  return null;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/routes" element={<RoutesPage />} />
        <Route path="/results" element={<Results />} />
        <Route path="/safety" element={<Safety />} />
        <Route path="/permits" element={<Permits />} />
        <Route path="/guides" element={<Guides />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;