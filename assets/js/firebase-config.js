// assets/js/firebase-config.js

const firebaseConfig = {
    apiKey: "AIzaSyAZr7z4pFWnEdZGkcWhHkCgelhKFHY6Iuo",
    authDomain: "gd-sacco.firebaseapp.com",
    projectId: "gd-sacco",
    storageBucket: "gd-sacco.firebasestorage.app",
    messagingSenderId: "753510020841",
    appId: "1:753510020841:web:801f39cdaf183e5b43e278",
    measurementId: "G-W06351EVFV"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// ===== CRITICAL: Set persistence to LOCAL =====
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => console.log('✅ Auth persistence set to LOCAL'))
    .catch(err => console.warn('Persistence error:', err));

// Enable offline persistence for Firestore
db.enablePersistence()
    .catch(err => console.warn('Firestore persistence error:', err));

// Helpers
function getCurrentUser() { return auth.currentUser; }
function isAuthenticated() { return !!auth.currentUser; }

// Expose globally
window.auth = auth;
window.db = db;
window.getCurrentUser = getCurrentUser;
window.isAuthenticated = isAuthenticated;
