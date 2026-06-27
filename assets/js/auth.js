// Authentication functions
async function loginUser(email, password) {
    try {
        const cred = await auth.signInWithEmailAndPassword(email, password);
        return { success: true, user: cred.user };
    } catch (error) {
        let message = 'Login failed.';
        switch (error.code) {
            case 'auth/user-not-found': message = 'No account found.'; break;
            case 'auth/wrong-password': message = 'Incorrect password.'; break;
            case 'auth/invalid-email': message = 'Invalid email.'; break;
            case 'auth/too-many-requests': message = 'Too many attempts. Try later.'; break;
            default: message = error.message;
        }
        return { success: false, message };
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

function requireAuth(redirectUrl = '../login.html') {
    if (!auth.currentUser) {
        window.location.href = redirectUrl;
        return false;
    }
    return true;
}

function redirectIfLoggedIn(redirectUrl = 'pages/dashboard.html') {
    if (auth.currentUser) {
        window.location.href = redirectUrl;
        return true;
    }
    return false;
}

// Expose globally
window.loginUser = loginUser;
window.logoutUser = logoutUser;
window.onAuthStateChanged = onAuthStateChanged;
window.requireAuth = requireAuth;
window.redirectIfLoggedIn = redirectIfLoggedIn;
