// Constants 
const CONFIG = {
    API_BASE_URL: "http://localhost:5678/api",
    API_WORKS_URL: "http://localhost:5678/api/works",
    API_CATEGORIES_URL: "http://localhost:5678/api/categories",
    ALL_CATEGORY_ID: "0",
    SELECTED_CLASS: "selected-category-button"
};

// Content filtering
const state = {
    allWorks: [],
    currentWorks: []
};

// HTML Elements
const projectsElement = document.querySelector("#portfolio");
const galleryElement = document.querySelector(".gallery");

// API Requests
async function fetchWorks() {
    const response = await fetch(CONFIG.API_WORKS_URL);
    if (!response.ok) {
        throw new Error(`Error fetching works (${response.status} - ${response.statusText})`);
    }
    return response.json();
}

async function fetchCategories() {
    const response = await fetch(CONFIG.API_CATEGORIES_URL);
    if (!response.ok) {
        throw new Error(`Error fetching categories (${response.status} - ${response.statusText})`);
    }
    return response.json();
}

function filterWorksByCategory(categoryId) {
    if (categoryId === CONFIG.ALL_CATEGORY_ID) {
        state.currentWorks = state.allWorks;
    } else {
        const id = parseInt(categoryId, 10);
        state.currentWorks = state.allWorks.filter(work => work.category.id === id);
    }
}

function createGalleryItem(work) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const caption = document.createElement("figcaption");

    img.setAttribute("src", work.imageUrl);
    img.setAttribute("alt", work.title);
    caption.textContent = work.title;

    figure.appendChild(img);
    figure.appendChild(caption);

    return figure;
}

function buildGalleryNodes() {
    const fragment = document.createDocumentFragment();
    state.currentWorks.forEach(work => {
        fragment.appendChild(createGalleryItem(work));
    });
    return fragment;
}

function displayGallery() {
    galleryElement.innerHTML = '';
    galleryElement.appendChild(buildGalleryNodes());
}

function createCategoryButton(category) {
    const button = document.createElement("button");
    button.textContent = category.name;
    button.dataset.categoryId = category.id;
    return button;
}

function createAllButton() {
    const button = document.createElement("button");
    button.textContent = "Tous";
    button.dataset.categoryId = CONFIG.ALL_CATEGORY_ID;
    button.classList.add(CONFIG.SELECTED_CLASS);
    return button;
}

function createCategoryButtonsContainer(categories) {
    const container = document.createElement("div");
    container.classList.add("categories");

    const allButton = createAllButton();
    container.appendChild(allButton);

    categories.forEach(category => {
        container.appendChild(createCategoryButton(category));
    });

    const heading = projectsElement.querySelector("h2");
    heading.insertAdjacentElement("afterend", container);
    return container.querySelectorAll("button");
}

function setupCategoryButtons(buttons) {
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove(CONFIG.SELECTED_CLASS));
            button.classList.add(CONFIG.SELECTED_CLASS);

            filterWorksByCategory(button.dataset.categoryId);
            displayGallery();
        });
    });
}

async function initializeApp() {
    try {
        const works = await fetchWorks();
        state.allWorks = works;
        state.currentWorks = works;

        const categories = await fetchCategories();
        const buttons = createCategoryButtonsContainer(categories);
        setupCategoryButtons(buttons);

        displayGallery();
    } catch (error) {
        console.error("Failed to initialize app:", error);
    }
}

window.addEventListener("load", initializeApp);
