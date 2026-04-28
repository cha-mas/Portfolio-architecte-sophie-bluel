const BASE_API_URL = "http://localhost:5678/api";
const API_WORKS_URL = `${BASE_API_URL}/works`;
const API_CATEGORIES_URL = `${BASE_API_URL}/categories`;

const projectsElement = document.querySelector("#portfolio")
const galleryElement = document.createElement("div")
galleryElement.classList.add("gallery")

var ALL_WORKS = new Set();
var SELECTED_WORKS = new Set();

async function getWorks() {
    const response = await fetch(API_WORKS_URL);
    if (!response.ok) throw new Error(`Error fetching works (${response.status} - ${response.statusText})`);

    const data = await response.json();
    return data;
}

async function getCategories() {
    const response = await fetch(API_CATEGORIES_URL);
    if (!response.ok) throw new Error(`Error fetching categories (${response.status} - ${response.statusText})`);

    const data = await response.json();
    return data;
}

const buildGalleryNodes = () => {
    const arr = []

    SELECTED_WORKS.forEach(item => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const caption = document.createElement("figcaption");

        img.setAttribute("src", item.imageUrl);
        img.setAttribute("alt", item.title);

        caption.innerText = item.title;

        figure.appendChild(img);
        figure.appendChild(caption);

        arr.push(figure);
    })

    return arr;
}

window.onload = async () => {

    // FETCHES ALL WORKS AND SETS INITIAL SELECTED WORKS TO ALL WORKS
    const works = await getWorks();
    works.forEach(work => ALL_WORKS.add(work))
    SELECTED_WORKS = ALL_WORKS;

    // FETCHES ALL CATEGORIES AND ADDS FILTER BUTTONS TO THE PAGE
    const categories = await getCategories();
    const categoryButtonsContainer = document.createElement("div");
    categoryButtonsContainer.classList.add("categories");
    for (const category of categories) {
        const categoryButton = document.createElement("button");
        categoryButton.innerText = category.name;
        categoryButtonsContainer.appendChild(categoryButton);
    }
    const allButton = document.createElement("button");
    allButton.innerText = "Tous";
    allButton.classList.add("selected-category-button");
    categoryButtonsContainer.prepend(allButton);
    projectsElement.appendChild(categoryButtonsContainer);


    // BUILDS AND DISPLAYS GALLERY OF SELECTED WORKS
    const galleryNodes = buildGalleryNodes();
    galleryNodes.forEach(node => galleryElement.appendChild(node));

    projectsElement.appendChild(galleryElement)
}