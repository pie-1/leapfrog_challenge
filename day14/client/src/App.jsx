import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Providers from './pages/Providers';
import ProviderProfile from './pages/ProviderProfile';
import ProviderRegistration from './pages/ProviderRegistration';
import MyHistory from './pages/MyHistory';
import PostJob from './pages/PostJob';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/providers" element={<Providers />} />
        <Route path="/provider/:id" element={<ProviderProfile />} />
        <Route path="/provider/register" element={<ProviderRegistration />} />
        <Route path="/my-history" element={<MyHistory />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;