import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Pages
import Home from "./pages/Home";
import RoutesPage from "./pages/Routes";
import Safety from "./pages/Safety";
import Permits from "./pages/Permits";
import Guides from "./pages/Guides";
import Dashboard from "./pages/Dashboard";
import Profiles from "./pages/Profiles";

// Note: Results page is not used - can be deleted later

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/permits" element={<Permits />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profiles" element={<Profiles />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;