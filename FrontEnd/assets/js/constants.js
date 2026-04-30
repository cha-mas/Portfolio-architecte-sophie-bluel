/* Application constants: API URLs, storage keys, CSS class names, and category IDs */

const API_BASE_URL = 'http://localhost:5678/api';

const API_ENDPOINTS = {
    WORKS: `${API_BASE_URL}/works`,
    CATEGORIES: `${API_BASE_URL}/categories`,
    LOGIN: `${API_BASE_URL}/users/login`
};

const STORAGE_KEYS = {
    AUTH_TOKEN: 'authToken',
    USER_ID: 'userId'
};

const CSS_CLASSES = {
    SELECTED_CATEGORY: 'selected-category-button'
};

const CATEGORY_IDS = {
    ALL: '0'
};