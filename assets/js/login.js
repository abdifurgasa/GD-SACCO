document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const btn = form.querySelector('.login-btn');
    const originalText = btn.innerHTML;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const emailVal = email.value.trim();
        const passVal = password.value.trim();
        if (!emailVal || !passVal) {
            alert('Please fill in both fields.');
            return;
        }
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';

        const result = await window.loginUser(emailVal, passVal);
        if (result.success) {
            window.location.href = 'pages/dashboard.html';
        } else {
            alert('Login failed: ' + result.message);
            btn.disabled = false;
            btn.innerHTML = originalText;
            password.value = '';
            password.focus();
        }
    });

    // Toggle password visibility
    document.getElementById('togglePassword').addEventListener('click', function() {
        const icon = this.querySelector('i');
        if (password.type === 'password') {
            password.type = 'text';
            icon.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            password.type = 'password';
            icon.classList.replace('fa-eye-slash', 'fa-eye');
        }
    });
});
