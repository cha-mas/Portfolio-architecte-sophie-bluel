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
    setAuthToken(data.token);
    setUserId(data.userId.toString());

    return data;
}

async function deleteWork(workId) {
    const token = getAuthToken()

    if (!token) {
        throw new Error('No authentication token found. Please log in first.');
    }

    const response = await fetch(`${API_ENDPOINTS.WORKS}/${workId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Unauthorized. Please log in again.');
        }
        throw new Error(`Error deleting work (${response.status} - ${response.statusText})`);
    }

    return true;
}

async function createWork(imageFile, title, category) {
    const token = getAuthToken();

    if (!token) {
        throw new Error('No authentication token found. Please log in first.');
    }

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('title', title);
    formData.append('category', category);

    const response = await fetch(API_ENDPOINTS.WORKS, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    });

    if (!response.ok) {
        if (response.status === 400) {
            throw new Error('Bad Request. Please check the form data.');
        }
        if (response.status === 401) {
            throw new Error('Unauthorized. Please log in again.');
        }
        throw new Error(`Error creating work (${response.status} - ${response.statusText})`);
    }

    return response.json();
}

window.fetchWorks = fetchWorks;
window.fetchCategories = fetchCategories;
window.loginUser = loginUser;
window.deleteWork = deleteWork;
window.createWork = createWork;