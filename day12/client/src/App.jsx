import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import WeddingDetails from "./pages/WeddingDetails";
import GuestList from "./pages/GuestList"; // ✅ NEW

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/wedding/:id"
                element={
                  <ProtectedRoute>
                    <WeddingDetails />
                  </ProtectedRoute>
                }
              />
              {/* ✅ NEW: Guest List Route */}
              <Route
                path="/guests"
                element={
                  <ProtectedRoute>
                    <GuestList />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
          <BackToTop />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;