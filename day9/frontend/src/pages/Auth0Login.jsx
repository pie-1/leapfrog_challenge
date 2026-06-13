import { useAuth0 } from '@auth0/auth0-react';

const Auth0Login = () => {
  const { 
    loginWithRedirect, 
    logout, 
    user, 
    isAuthenticated, 
    isLoading,
    error 
  } = useAuth0();

  // Debug - check what's happening
  console.log("isAuthenticated:", isAuthenticated);
  console.log("user:", user);
  console.log("error:", error);

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-sm">Error: {error.message}</div>;
  }

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-4">
        {user.picture && (
          <img 
            src={user.picture} 
            alt="profile" 
            className="w-8 h-8 rounded-full"
          />
        )}
        <span className="text-white text-sm hidden md:inline">
          👋 {user.name || user.email || user.nickname}
        </span>
        <button
          onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => loginWithRedirect()}
      className="bg-gradient-to-r from-green-600 to-green-700 text-white px-5 py-2 rounded-full hover:from-green-700 hover:to-green-800 transition"
    >
      Login / Signup
    </button>
  );
};

export default Auth0Login;