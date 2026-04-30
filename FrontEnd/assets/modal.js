
const modalState = {
    isVisible: false,
    currentScreen: 1
};


let backdropElement = null;
let modalElement = null;
let screenContainerElement = null;
let closeButtonElement = null;
let backButtonElement = null;


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

    button.style.position = "absolute";
    button.style.top = "20px";
    button.style.right = "20px";
    button.style.border = "none";
    button.style.background = "transparent";
    button.style.cursor = "pointer";
    button.style.fontSize = "20px";
    button.style.lineHeight = "1";
    button.style.padding = "4px";
    button.style.zIndex = "10";

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

    button.style.position = "absolute";
    button.style.top = "20px";
    button.style.left = "20px";
    button.style.border = "none";
    button.style.background = "transparent";
    button.style.cursor = "pointer";
    button.style.fontSize = "20px";
    button.style.lineHeight = "1";
    button.style.padding = "4px";
    button.style.display = "none";
    button.style.zIndex = "10";

    button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="16px" height="16px">
            <path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/>
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

    header.style.position = "relative";
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


function createGalleryScreen() {
    const screen = document.createElement("div");

    screen.style.width = "50%";
    screen.style.flexShrink = "0";
    screen.style.boxSizing = "border-box";
    screen.style.padding = "32px";

    // TODO: Add works management

    const title = document.createElement("h3");
    title.textContent = "Galerie photo";
    title.style.textAlign = "center";
    title.style.fontFamily = "Work Sans";
    title.style.fontSize = '26px';

    screen.appendChild(title);

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
        backButtonElement.style.display = "none";
    } else {
        backButtonElement.style.display = "block";
    }
}

function buildModal() {
    backdropElement = createBackdrop();

    modalElement = createModalContainer();

    closeButtonElement = createCloseButton();
    backButtonElement = createBackButton();

    const header = createModalHeader();

    screenContainerElement = createScreenContainer();

    const galleryScreen = createGalleryScreen();
    const addWorkScreen = createAddWorkScreen();

    screenContainerElement.appendChild(galleryScreen);
    screenContainerElement.appendChild(addWorkScreen);

    modalElement.appendChild(closeButtonElement);
    modalElement.appendChild(backButtonElement);
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