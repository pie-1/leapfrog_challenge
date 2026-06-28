import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import GuestList from "./pages/GuestList";
import Planner from "./pages/Planner";
import Budget from "./pages/Budget";
import Checklist from "./pages/Checklist";
import Vendors from "./pages/Vendors";

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
                path="/planner"
                element={
                  <ProtectedRoute>
                    <Planner />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/budget"
                element={
                  <ProtectedRoute>
                    <Budget />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/checklist"
                element={
                  <ProtectedRoute>
                    <Checklist />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/vendors"
                element={
                  <ProtectedRoute>
                    <Vendors />
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
              
              <Route
                path="/guests"
                element={
                  <ProtectedRoute>
                    <GuestList />
                  </ProtectedRoute>
                }
              />
              
              {/* Catch all - redirect to dashboard */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
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