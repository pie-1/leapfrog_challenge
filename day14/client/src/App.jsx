import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Providers from './pages/Providers';
import ProviderProfile from './pages/ProviderProfile';
import MyHistory from './pages/MyHistory';
import PostJob from './pages/PostJob';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/providers" element={<Providers />} />
      <Route path="/provider/:id" element={<ProviderProfile />} />
      <Route path="/my-history" element={<MyHistory />} />
      <Route path="/post-job" element={<PostJob />} />
    </Routes>
  );
}

export default App;