/**
 * Authentication Script
 * Handles login/logout functionality and session management across all pages
 */

const TOKEN_KEY = 'authToken';
const USER_ID_KEY = 'userId';

const API_BASE_URL = 'http://localhost:5678/api';
const LOGIN_ENDPOINT = `${API_BASE_URL}/users/login`;

async function loginUser(email, password) {
    try {
        const response = await fetch(LOGIN_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Authentication failed (${response.status})`);
        }

        const data = await response.json();
        
        sessionStorage.setItem(TOKEN_KEY, data.token);
        sessionStorage.setItem(USER_ID_KEY, data.userId.toString());

        updateAuthMenu();

        return data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

function logoutUser() {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_ID_KEY);
    updateAuthMenu();
}

function isAuthenticated() {
    const token = sessionStorage.getItem(TOKEN_KEY);
    return token !== null && token !== '';
}

function getAuthToken() {
    return sessionStorage.getItem(TOKEN_KEY);
}

function getUserId() {
    return sessionStorage.getItem(USER_ID_KEY);
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

    authLink.addEventListener('click', function(event) {
        if (isAuthenticated()) {
            event.preventDefault();
            logoutUser();
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    updateAuthMenu();
    setupAuthMenuListener();
});
