
// Import state from script.js via window object
const getModalState = () => window.state || { allWorks: [], currentWorks: [] };

const modalState = {
    isVisible: false,
    currentScreen: 1
};


let backdropElement = null;
let modalElement = null;
let screenContainerElement = null;
let closeButtonElement = null;
let backButtonElement = null;
let galleryContentElement = null;


function createBackdrop() {
    const backdrop = document.createElement("div");

    backdrop.style.position = "fixed";
    backdrop.style.top = "0";
    backdrop.style.left = "0";
    backdrop.style.right = "0";
    backdrop.style.bottom = "0";
    backdrop.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    backdrop.style.display = "flex";
    backdrop.style.justifyContent = "center";
    backdrop.style.alignItems = "center";
    backdrop.style.zIndex = "1000";

    backdrop.addEventListener("click", closeModal);

    return backdrop;
}


function createModalContainer() {
    const modal = document.createElement("div");

    modal.style.backgroundColor = "#fff";
    modal.style.borderRadius = "8px";
    modal.style.width = "630px";
    modal.style.maxHeight = "90vh";
    modal.style.position = "relative";
    modal.style.overflow = "hidden";

    modal.addEventListener("click", (event) => {
        event.stopPropagation();
    });

    return modal;
}


function createCloseButton() {
    const button = document.createElement("button");
    button.type = "button";

    button.style.border = "none";
    button.style.background = "transparent";
    button.style.cursor = "pointer";
    button.style.lineHeight = "1";
    button.style.padding = "4px";

    button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="16px" height="16px">
            <path fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
        </svg>
    `;

    button.addEventListener("click", (event) => {
        event.stopPropagation();
        closeModal();
    });

    return button;
}


function createBackButton() {
    const button = document.createElement("button");
    button.type = "button";

    button.style.border = "none";
    button.style.background = "transparent";
    button.style.cursor = "pointer";
    button.style.lineHeight = "1";
    button.style.padding = "4px";
    button.style.visibility = "hidden";

    button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16px" height="16px">
            <path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 282.6 416 282.6c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
        </svg>
    `;

    button.addEventListener("click", (event) => {
        event.stopPropagation();
        navigateToScreen(1);
    });

    return button;
}


function createModalHeader() {
    const header = document.createElement("div");

    header.style.display = "flex";
    header.style.justifyContent = "space-between";
    header.style.alignItems = "center";
    header.style.padding = "20px";

    return header;
}


function createScreenContainer() {
    const container = document.createElement("div");

    container.style.display = "flex";
    container.style.transition = "transform 0.3s ease";
    container.style.width = "200%";

    return container;
}


function createPreviewImage(work) {
    const container = document.createElement("div");
    container.style.position = "relative";

    const img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;
    img.style.objectFit = "cover";
    img.style.borderRadius = "4px";
    img.style.width = "100%";
    img.style.display = "block";

    container.appendChild(img);

    return container;
}

function createDeleteButton() {
    const button = document.createElement("button");
    button.type = "button";
    button.style.position = "absolute";
    button.style.top = "8px";
    button.style.right = "8px";
    button.style.border = "none";
    button.style.background = "#000";
    button.style.cursor = "pointer";
    button.style.padding = "4px";
    button.style.borderRadius = "4px";
    button.style.display = "flex";
    button.style.alignItems = "center";
    button.style.justifyContent = "center";

    button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16px" height="16px">
            <path fill="#fff" d="M135.2 17.7L128 32H32C14.9 32 0 46.9 0 64s14.9 32 32 32H96v41.4c0 10.1 .6 25.4 2.1 46.6C104.9 243.7 153.2 384 215.2 464c10.5 13.6 31.1 13.6 41.6 0 62-80 110.3-220.3 117.1-300 1.5-21.2 2.1-36.5 2.1-46.6V96h64c17.1 0 32-14.9 32-32s-14.9-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM160 96H128V64h32V96zm96 0H224V64h32V96zM161.1 144H192c8.8 0 16 7.2 16 16V368c0 8.8-7.2 16-16 16H161.1c-8.8 0-16-7.2-16-16V160c0-8.8 7.2-16 16-16zm96 0H288c8.8 0 16 7.2 16 16V368c0 8.8-7.2 16-16 16H257.1c-8.8 0-16-7.2-16-16V160c0-8.8 7.2-16 16-16z"/>
        </svg>
    `;

    return button;
}

function createPreviewItem(work) {
    const container = createPreviewImage(work);
    const deleteButton = createDeleteButton();

    deleteButton.addEventListener("click", (event) => {
        event.stopPropagation();
        handleDeleteWork(work.id, container);
    });

    container.appendChild(deleteButton);

    return container;
}

function handleDeleteWork(workId, element) {
    alert(`Delete work with id: ${workId}`);

    const state = getModalState();
    const index = state.allWorks.findIndex(work => work.id === workId);
    if (index !== -1) {
        state.allWorks.splice(index, 1);
    }

    // Update currentWorks to reflect the deletion
    const currentIndex = state.currentWorks.findIndex(work => work.id === workId);
    if (currentIndex !== -1) {
        state.currentWorks.splice(currentIndex, 1);
    }

    rebuildGallery();

    // Rebuild the main gallery on the page
    if (typeof window.displayGallery === 'function') {
        window.displayGallery();
    }
}

function buildGalleryGrid() {
    const state = getModalState();
    const fragment = document.createDocumentFragment();

    state.allWorks.forEach(work => {
        fragment.appendChild(createPreviewItem(work));
    });

    return fragment;
}

function rebuildGallery() {
    if (!galleryContentElement) return;

    galleryContentElement.innerHTML = '';
    galleryContentElement.appendChild(buildGalleryGrid());
}

function createAddPhotoButton() {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Ajouter une photo";

    button.style.display = "block";
    button.style.margin = "32px auto 0";
    button.style.padding = "12px 32px";
    button.style.backgroundColor = "#1a5f52";
    button.style.color = "#fff";
    button.style.border = "none";
    button.style.borderRadius = "30px";
    button.style.fontSize = "16px";
    button.style.fontFamily = "Work Sans";
    button.style.cursor = "pointer";
    button.style.width = "300px";

    button.addEventListener("click", (event) => {
        event.stopPropagation();
        navigateToScreen(2);
    });

    return button;
}

function createGallerySeparator() {
    const separator = document.createElement("hr");
    separator.style.border = "none";
    separator.style.borderTop = "1px solid #ccc";
    separator.style.margin = "32px 0 0";
    return separator;
}

function createGalleryContent() {
    const content = document.createElement("div");
    content.style.display = "grid";
    content.style.gridTemplateColumns = "repeat(5, 1fr)";
    content.style.gap = "8px";
    content.style.marginTop = "24px";

    galleryContentElement = content;

    return content;
}

function createGalleryScreen() {
    const screen = document.createElement("div");

    screen.style.width = "50%";
    screen.style.flexShrink = "0";
    screen.style.boxSizing = "border-box";
    screen.style.padding = "32px";

    const title = document.createElement("h3");
    title.textContent = "Galerie photo";
    title.style.textAlign = "center";
    title.style.fontFamily = "Work Sans";
    title.style.fontSize = '26px';

    screen.appendChild(title);

    const galleryContent = createGalleryContent();
    galleryContent.appendChild(buildGalleryGrid());
    screen.appendChild(galleryContent);

    const separator = createGallerySeparator();
    screen.appendChild(separator);

    const addPhotoButton = createAddPhotoButton();
    screen.appendChild(addPhotoButton);

    return screen;
}

function createAddWorkScreen() {
    const screen = document.createElement("div");

    screen.style.width = "50%";
    screen.style.flexShrink = "0";
    screen.style.boxSizing = "border-box";
    screen.style.padding = "32px";

    // TODO: Add Form

    const title = document.createElement("h3");
    title.textContent = "Ajout photo";
    title.style.textAlign = "center";
    title.style.fontFamily = "Work Sans";
    title.style.fontSize = '26px';

    screen.appendChild(title);

    return screen;
}


function navigateToScreen(screenNumber) {
    modalState.currentScreen = screenNumber;

    const translateX = (screenNumber - 1) * -50;
    screenContainerElement.style.transform = `translateX(${translateX}%)`;


    if (screenNumber === 1) {
        backButtonElement.style.visibility = "hidden";
    } else {
        backButtonElement.style.visibility = "visible";
    }
}

function buildModal() {
    backdropElement = createBackdrop();

    modalElement = createModalContainer();

    closeButtonElement = createCloseButton();
    backButtonElement = createBackButton();

    const header = createModalHeader();
    header.appendChild(backButtonElement);
    header.appendChild(closeButtonElement);

    screenContainerElement = createScreenContainer();

    const galleryScreen = createGalleryScreen();
    const addWorkScreen = createAddWorkScreen();

    screenContainerElement.appendChild(galleryScreen);
    screenContainerElement.appendChild(addWorkScreen);

    modalElement.appendChild(header);
    modalElement.appendChild(screenContainerElement);

    backdropElement.appendChild(modalElement);

    return backdropElement;
}

function toggleModal() {
    if (modalState.isVisible) {
        closeModal();
    } else {
        openModal();
    }
}

function openModal() {
    if (!backdropElement) {
        buildModal();
        document.body.appendChild(backdropElement);
    } else {
        backdropElement.style.display = "flex";
    }

    modalState.isVisible = true;
    modalState.currentScreen = 1;
    navigateToScreen(1);

    document.addEventListener("keydown", handleEscapeKey);
}

function closeModal() {
    if (backdropElement) {
        backdropElement.style.display = "none";
    }

    modalState.isVisible = false;
    modalState.currentScreen = 1;

    document.removeEventListener("keydown", handleEscapeKey);
}

function handleEscapeKey(event) {
    if (event.key === "Escape") {
        closeModal();
    }
}

function initModal(triggerButton) {
    if (triggerButton) {
        triggerButton.addEventListener("click", toggleModal);
    }
}