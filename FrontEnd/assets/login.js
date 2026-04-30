const loginForm = document.querySelector('form[action="#"]');

loginForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
        alert("Identifiants requis");
        return;
    }

    try {
        await loginUser(email, password);
        window.location.replace("./index.html")
    } catch (error) {
        alert("Mauvais identifiants");
    }
});
