const firebase = require('firebase/app');
require('firebase/auth');

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  // ... other config (you can reuse from frontend .env)
};

firebase.initializeApp(firebaseConfig);

// We don't export the app, we'll just use the auth directly in middleware