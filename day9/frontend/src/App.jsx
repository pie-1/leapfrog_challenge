import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RoutesPage from "./pages/Routes";
import Results from "./pages/Results";
import Safety from "./pages/Safety";  
import Permits from "./pages/Permits";
import Guides from "./pages/Guides";
import Auth from "./pages/Auth0Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/routes" element={<RoutesPage />} />
        <Route path="/results" element={<Results />} />
        <Route path="/safety" element={<Safety />} />  
        <Route path="/permits" element={<Permits />} />
        <Route path="/guides" element={<Guides />} />
        <Route path="/login" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;