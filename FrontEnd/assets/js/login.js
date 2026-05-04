document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form[action="#"]');
    if (!loginForm) return;

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const submitButton = loginForm.querySelector('input[type="submit"]');

    const errorSpan = document.createElement('span');
    errorSpan.classList.add('js-error-text');
    submitButton.parentNode.insertBefore(errorSpan, submitButton);

    function clearLoginErrors() {
        errorSpan.textContent = '';
        emailInput.classList.remove('js-field-error');
        passwordInput.classList.remove('js-field-error');
    }

    emailInput.addEventListener('input', clearLoginErrors);
    passwordInput.addEventListener('input', clearLoginErrors);

    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        clearLoginErrors();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!email || !password) {
            errorSpan.textContent = 'Veuillez remplir tous les champs.';
            if (!email) emailInput.classList.add('js-field-error');
            if (!password) passwordInput.classList.add('js-field-error');
            return;
        }

        try {
            await loginUser(email, password);
            updateAuthMenu();
            window.location.replace('./index.html');
        } catch (error) {
            errorSpan.textContent = 'Identifiants incorrects.';
            emailInput.classList.add('js-field-error');
            passwordInput.classList.add('js-field-error');
        }
    });
});