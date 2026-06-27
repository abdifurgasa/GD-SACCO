// assets/js/auth.js

async function loginUser(email, password) {
    try {
        const cred = await auth.signInWithEmailAndPassword(email, password);
        return { success: true, user: cred.user };
    } catch (error) {
        let msg = 'Login failed.';
        switch (error.code) {
            case 'auth/user-not-found': msg = 'No account found.'; break;
            case 'auth/wrong-password': msg = 'Incorrect password.'; break;
            case 'auth/invalid-email': msg = 'Invalid email.'; break;
            case 'auth/too-many-requests': msg = 'Too many attempts. Try later.'; break;
            default: msg = error.message;
        }
        return { success: false, message: msg };
    }
}

async function logoutUser() {
    try {
        await auth.signOut();
        return { success: true };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

function onAuthStateChanged(callback) {
    return auth.onAuthStateChanged(callback);
}

// ===== GUARDED ROUTE WITH LOADING STATE =====
function requireAuth(redirectUrl = '../login.html') {
    return new Promise((resolve) => {
        // Show a loading spinner or message
        const loadingEl = document.getElementById('auth-loading');
        if (loadingEl) loadingEl.style.display = 'flex';

        const unsubscribe = auth.onAuthStateChanged((user) => {
            unsubscribe(); // Only run once
            if (loadingEl) loadingEl.style.display = 'none';
            if (!user) {
                window.location.href = redirectUrl;
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

// ===== REDIRECT IF ALREADY LOGGED IN (for login page) =====
function redirectIfLoggedIn(redirectUrl = 'pages/dashboard.html') {
    return new Promise((resolve) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            unsubscribe();
            if (user) {
                window.location.href = redirectUrl;
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}

// Expose
window.loginUser = loginUser;
window.logoutUser = logoutUser;
window.onAuthStateChanged = onAuthStateChanged;
window.requireAuth = requireAuth;
window.redirectIfLoggedIn = redirectIfLoggedIn;
