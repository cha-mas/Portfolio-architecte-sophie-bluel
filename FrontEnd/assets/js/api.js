/* API functions for fetching works, categories, and handling user authentication */

async function fetchWorks() {
    const response = await fetch(API_ENDPOINTS.WORKS);
    if (!response.ok) {
        throw new Error(`Error fetching works (${response.status} - ${response.statusText})`);
    }
    return response.json();
}

async function fetchCategories() {
    const response = await fetch(API_ENDPOINTS.CATEGORIES);
    if (!response.ok) {
        throw new Error(`Error fetching categories (${response.status} - ${response.statusText})`);
    }
    return response.json();
}

async function loginUser(email, password) {
    const response = await fetch(API_ENDPOINTS.LOGIN, {
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
    sessionStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.token);
    sessionStorage.setItem(STORAGE_KEYS.USER_ID, data.userId.toString());
    
    return data;
}