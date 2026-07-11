import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4 bg-white">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-primary-200/30">
          <div className="text-center mb-8">
            <img src="/Buddy-logo.png" alt="CollegeBuddy" className="h-12 mx-auto mb-4" />
            <h2 className="font-display text-3xl font-bold text-primary-800">Welcome Back</h2>
            <p className="text-primary-500/60 mt-1">Sign in to continue</p>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary-700 mb-1.5">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-700 mb-1.5">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
              />
            </div>
            <button type="submit" className="w-full btn-primary py-3 text-base">
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-primary-500/60 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-500 font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login