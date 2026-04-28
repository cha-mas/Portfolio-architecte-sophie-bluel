
/* API URLS CONSTANTS */
const BASE_API_URL = "http://localhost:5678/api";
const API_WORKS_URL = `${BASE_API_URL}/works`;


/* HTML ELEMENTS NODES */
var galleryElement = null

async function getWorks() {
    const response = await fetch(API_WORKS_URL);

    if (!response.ok) throw new Error(`Error fetching works (${response.status} - ${response.statusText})`);

    const data = await response.json();

    return data;
}

const buildGalleryNodes = (items) => items.map(item => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const caption = document.createElement("figcaption");

    img.setAttribute("src", item.imageUrl);
    img.setAttribute("alt", item.title);

    caption.innerText = item.title;

    figure.appendChild(img);
    figure.appendChild(caption);

    return figure;
})

document.addEventListener("DOMContentLoaded", async () => {
    galleryElement = document.querySelector("div.gallery");
    galleryElement.innerHTML = "";

    const works = await getWorks();
    const galleryNodes = buildGalleryNodes(works);

    galleryNodes.forEach(node => galleryElement.appendChild(node));

})