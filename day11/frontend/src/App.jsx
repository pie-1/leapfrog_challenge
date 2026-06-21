import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ColoringPage from './pages/ColoringPage';
import UploadPage from './pages/UploadPage';
import Gallery from './pages/Gallery';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/color/:id" element={<ColoringPage />} />
      <Route path="/upload" element={<UploadPage />} />
      <Route path="/gallery" element={<Gallery />} />
    </Routes>
  );
}

export default App;