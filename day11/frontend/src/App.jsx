import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ColoringPage from './pages/ColoringPage';
import UploadPage from './pages/UploadPage';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-pink/30 via-pastel-yellow/30 to-pastel-sky/30">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/color/:id" element={<ColoringPage />} />
        <Route path="/upload" element={<UploadPage />} />
      </Routes>
    </div>
  );
}

export default App;