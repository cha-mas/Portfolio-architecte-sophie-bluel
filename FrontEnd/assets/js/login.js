/* Login page form handling and authentication submission */

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form[action="#"]');
    if (!loginForm) return;

    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!email || !password) {
            alert('Identifiants requis');
            return;
        }

        try {
            await loginUser(email, password);
            updateAuthMenu();
            window.location.replace('./index.html');
        } catch (error) {
            alert('Mauvais identifiants');
        }
    });
});