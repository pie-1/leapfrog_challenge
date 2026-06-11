import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  Shield,
  BarChart3,
} from "lucide-react";

import { useAuthStore } from "../store/useAuthStore";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    setTimeout(async () => {
      const fakeUser = {
        id: 1,
        name: "Alex Rivera",
        username: "alexrivera",
        email,
        avatar: "",
        bio: "Building products on the internet.",
        totalLinks: 12,
        totalClicks: 430,
      };

      await login(fakeUser);

      navigate("/dashboard");

      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* ================= LEFT SIDE ================= */}

      <div className="hidden lg:flex flex-col justify-between p-14 border-r border-zinc-900">
        <div>
          <Link
            to="/"
            className="text-xl font-bold"
          >
            LinkSphere
          </Link>
        </div>

        <div>
          <div className="badge mb-8">
            <div className="badge-dot" />
            Personal Dashboard Platform
          </div>

          <h1 className="text-6xl font-bold leading-tight">
            Your digital
            <br />
            headquarters.
          </h1>

          <p className="text-zinc-400 text-xl mt-8 max-w-lg leading-relaxed">
            Organize links, manage your profile,
            track analytics and build your
            personal internet presence from one
            place.
          </p>

          <div className="space-y-5 mt-12">
            <div className="flex items-center gap-4">
              <Shield size={20} />
              <span className="text-zinc-300">
                Secure authentication
              </span>
            </div>

            <div className="flex items-center gap-4">
              <BarChart3 size={20} />
              <span className="text-zinc-300">
                Analytics dashboard
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Sparkles size={20} />
              <span className="text-zinc-300">
                Custom themes & branding
              </span>
            </div>
          </div>
        </div>

        <p className="text-zinc-600 text-sm">
          Built with React, Zustand and Tailwind.
        </p>
      </div>

      {/* ================= RIGHT SIDE ================= */}

      <div className="flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h2 className="text-4xl font-bold">
              Welcome back
            </h2>

            <p className="text-zinc-500 mt-3">
              Sign in to access your dashboard.
            </p>
          </div>

          <div className="card p-8">
            <form
              onSubmit={handleLogin}
              className="space-y-6"
            >
              {/* EMAIL */}

              <div>
                <label className="block text-sm text-zinc-400 mb-2">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-4 text-zinc-500"
                  />

                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="input pl-11"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              {/* PASSWORD */}

              <div>
                <label className="block text-sm text-zinc-400 mb-2">
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-4 text-zinc-500"
                  />

                  <input
                    type="password"
                    placeholder="••••••••"
                    className="input pl-11"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              {/* BUTTON */}

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full"
              >
                {isLoading
                  ? "Signing In..."
                  : "Sign In"}

                <ArrowRight size={18} />
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-zinc-800">
              <p className="text-sm text-zinc-500">
                Demo Login
              </p>

              <p className="text-sm text-zinc-400 mt-2">
                Enter any email and password to
                continue.
              </p>
            </div>
          </div>

          <p className="text-center text-zinc-500 mt-8">
            Don't have an account?{" "}
            <Link
              to="/"
              className="text-white hover:text-zinc-300 transition"
            >
              Return Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;