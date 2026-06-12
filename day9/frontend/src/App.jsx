import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";
import RoutePage from "./pages/Routes"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="/routes" element={<RoutePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;