import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFAF6] font-['Inter']">
      <Navbar />

      <div className="pt-32 pb-16 max-w-md mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl border border-[#E4DFD1] p-8 shadow-sm"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#1C1B18] font-['Space_Grotesk']">Welcome Back</h1>
            <p className="text-[#6B6558] mt-1 text-sm">Sign in to continue to ServicePulse</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#1C1B18] mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8371]" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#E4DFD1] bg-[#FBFAF6] text-[#1C1B18] focus:outline-none focus:border-[#1F3D2B] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1C1B18] mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8371]" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#E4DFD1] bg-[#FBFAF6] text-[#1C1B18] focus:outline-none focus:border-[#1F3D2B] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#1F3D2B] text-white rounded-xl font-semibold hover:bg-[#2F5940] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <LogIn size={18} />
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-[#6B6558] text-sm mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#E8A33D] font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;