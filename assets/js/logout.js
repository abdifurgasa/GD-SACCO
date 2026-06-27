document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async function() {
            if (confirm('Are you sure you want to log out?')) {
                const result = await window.logoutUser();
                if (result.success) {
                    window.location.href = '../login.html';
                } else {
                    alert('Logout failed: ' + result.message);
                }
            }
        });
    }
});
