/* Authentication utilities for checking login status, managing session, and updating UI */

function isAuthenticated() {
    const token = sessionStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    return token !== null && token !== '';
}

function getAuthToken() {
    return sessionStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
}

function getUserId() {
    return sessionStorage.getItem(STORAGE_KEYS.USER_ID);
}

function logoutUser() {
    sessionStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    sessionStorage.removeItem(STORAGE_KEYS.USER_ID);
    updateAuthMenu();
    window.location.reload();
}

function updateAuthMenu() {
    const authLink = document.querySelector('nav ul li a[href*="login.html"]');
    if (!authLink) return;

    if (isAuthenticated()) {
        authLink.textContent = 'logout';
    } else {
        authLink.textContent = 'login';
    }
}

function setupAuthMenuListener() {
    const authLink = document.querySelector('nav ul li a[href*="login.html"]');
    if (!authLink) return;

    authLink.addEventListener('click', function (event) {
        if (isAuthenticated()) {
            event.preventDefault();
            logoutUser();
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    updateAuthMenu();
    setupAuthMenuListener();
});

window.getAuthToken = getAuthToken;