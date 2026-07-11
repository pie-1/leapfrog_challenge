import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4 bg-white">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-primary-200/30">
          <div className="text-center mb-8">
            <img src="/Buddy-logo.png" alt="CollegeBuddy" className="h-12 mx-auto mb-4" />
            <h2 className="font-display text-3xl font-bold text-primary-800">Create Account</h2>
            <p className="text-primary-500/60 mt-1">Join the community</p>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary-700 mb-1.5">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-700 mb-1.5">Email</label>
              <input
                type="email"
                placeholder="your@college.edu"
                className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-700 mb-1.5">Password</label>
              <input
                type="password"
                placeholder="Min 8 characters"
                className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
              />
            </div>
            <button type="submit" className="w-full btn-primary py-3 text-base">
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-primary-500/60 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-500 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register