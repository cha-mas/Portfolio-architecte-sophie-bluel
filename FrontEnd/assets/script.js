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

function displayEditingBanner() {
    const container = document.createElement("div");

    container.style.display = 'flex';
    container.style.gap = '8px';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.padding = '16px';
    container.style.background = '#000';
    container.style.color = '#fff';

    container.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="24px" height="24px">
    <!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.-->
    <path fill="currentColor" d="M505 122.9L517.1 135C526.5 144.4 526.5 159.6 517.1 168.9L488 198.1L441.9 152L471 122.9C480.4 113.5 495.6 113.5 504.9 122.9zM273.8 320.2L408 185.9L454.1 232L319.8 366.2C316.9 369.1 313.3 371.2 309.4 372.3L250.9 389L267.6 330.5C268.7 326.6 270.8 323 273.7 320.1zM437.1 89L239.8 286.2C231.1 294.9 224.8 305.6 221.5 317.3L192.9 417.3C190.5 425.7 192.8 434.7 199 440.9C205.2 447.1 214.2 449.4 222.6 447L322.6 418.4C334.4 415 345.1 408.7 353.7 400.1L551 202.9C579.1 174.8 579.1 129.2 551 101.1L538.9 89C510.8 60.9 465.2 60.9 437.1 89zM152 128C103.4 128 64 167.4 64 216L64 488C64 536.6 103.4 576 152 576L424 576C472.6 576 512 536.6 512 488L512 376C512 362.7 501.3 352 488 352C474.7 352 464 362.7 464 376L464 488C464 510.1 446.1 528 424 528L152 528C129.9 528 112 510.1 112 488L112 216C112 193.9 129.9 176 152 176L264 176C277.3 176 288 165.3 288 152C288 138.7 277.3 128 264 128L152 128z"/>
    </svg>
    <p style="font: 'inherit'">Mode édition</p>
    `

    document.body.prepend(container);
}

async function initializeApp() {
    try {
        const works = await fetchWorks();
        state.allWorks = works;
        state.currentWorks = works;

        if (!isAuthenticated()) {
            const categories = await fetchCategories();
            const buttons = createCategoryButtonsContainer(categories);
            setupCategoryButtons(buttons);
        } else {
            displayEditingBanner();
        }

        displayGallery();
    } catch (error) {
        console.error("Failed to initialize app:", error);
    }
}

window.addEventListener("load", initializeApp);
