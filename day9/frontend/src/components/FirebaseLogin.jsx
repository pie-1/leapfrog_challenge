import { useState, useEffect } from "react";
import { 
  signInWithPopup, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";

const FirebaseLogin = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Track auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // Save user to backend when user logs in
      if (currentUser) {
        saveUserToDatabase(currentUser);
      }
    });
    return () => unsubscribe();
  }, []);

  // Save user to backend after login
  const saveUserToDatabase = async (user) => {
    try {
      const response = await fetch('http://localhost:5000/api/users/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          name: user.displayName || user.email,
          role: 'traveller' // default role
        })
      });
      const data = await response.json();
      console.log('User saved to backend:', data);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await saveUserToDatabase(result.user);
      setShowModal(false);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      let result;
      if (isLogin) {
        result = await signInWithEmailAndPassword(auth, email, password);
      } else {
        result = await createUserWithEmailAndPassword(auth, email, password);
      }
      await saveUserToDatabase(result.user);
      setShowModal(false);
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  // If user is logged in
  if (user) {
    return (
      <div className="flex items-center gap-3">
        {user.photoURL && (
          <img src={user.photoURL} alt="profile" className="w-8 h-8 rounded-full" />
        )}
        <span className="text-white text-sm hidden md:inline">
          👋 {user.displayName || user.email}
        </span>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-sm"
        >
          Logout
        </button>
      </div>
    );
  }

  // If user is not logged in - Show login button and modal
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-gradient-to-r from-green-600 to-green-700 text-white px-5 py-2 rounded-full hover:from-green-700 hover:to-green-800 transition"
      >
        Login / Signup
      </button>

      {/* Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="bg-white rounded-2xl p-6 w-96 max-w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{isLogin ? "Login" : "Sign Up"}</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="w-full mb-4 bg-white border border-gray-300 text-gray-700 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              Continue with Google
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>

            <form onSubmit={handleEmailLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-lg mb-3"
                required
              />
              <input
                type="password"
                placeholder="Password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded-lg mb-3"
                required
              />
              {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                {isLogin ? "Login" : "Create Account"}
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-4">
              {isLogin ? "No account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-1 text-green-600 hover:underline"
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default FirebaseLogin;