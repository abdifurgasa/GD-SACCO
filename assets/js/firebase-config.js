// Your Firebase configuration (provided)
const firebaseConfig = {
    apiKey: "AIzaSyAZr7z4pFWnEdZGkcWhHkCgelhKFHY6Iuo",
    authDomain: "gd-sacco.firebaseapp.com",
    projectId: "gd-sacco",
    storageBucket: "gd-sacco.firebasestorage.app",
    messagingSenderId: "753510020841",
    appId: "1:753510020841:web:801f39cdaf183e5b43e278",
    measurementId: "G-W06351EVFV"
};

// Initialize Firebase (compat)
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// Enable offline persistence
db.enablePersistence().catch(err => console.warn('Persistence error:', err));

// Helpers
function getCurrentUser() { return auth.currentUser; }
function isAuthenticated() { return !!auth.currentUser; }

// Expose globally
window.auth = auth;
window.db = db;
window.getCurrentUser = getCurrentUser;
window.isAuthenticated = isAuthenticated;
