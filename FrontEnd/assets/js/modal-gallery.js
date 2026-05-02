/* Gallery management screen for the modal: displays works grid with delete functionality */

let galleryContentElement = null;

function createPreviewImage(work) {
    const container = document.createElement('div');
    container.style.position = 'relative';

    const img = document.createElement('img');
    img.src = work.imageUrl;
    img.alt = work.title;
    img.style.objectFit = 'cover';
    img.style.borderRadius = '4px';
    img.style.width = '100%';
    img.style.display = 'block';

    container.appendChild(img);
    return container;
}

function createDeleteButton() {
    const button = document.createElement('button');
    button.type = 'button';
    button.style.position = 'absolute';
    button.style.top = '8px';
    button.style.right = '8px';
    button.style.border = 'none';
    button.style.background = '#000';
    button.style.cursor = 'pointer';
    button.style.padding = '4px';
    button.style.borderRadius = '4px';
    button.style.display = 'flex';
    button.style.alignItems = 'center';
    button.style.justifyContent = 'center';

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

    deleteButton.addEventListener('click', function (event) {
        event.stopPropagation();
        handleDeleteWork(work.id, container);
    });

    container.appendChild(deleteButton);
    return container;
}

function handleDeleteWork(workId, element) {
    alert(`Delete work with id: ${workId}`);
    removeWork(workId);
    rebuildModalGallery();

    if (typeof window.displayGallery === 'function') {
        window.displayGallery();
    }
}

function buildGalleryGrid() {
    const state = getState();
    const fragment = document.createDocumentFragment();

    state.allWorks.forEach(function (work) {
        fragment.appendChild(createPreviewItem(work));
    });

    return fragment;
}

function rebuildModalGallery() {
    if (!galleryContentElement) return;

    galleryContentElement.innerHTML = '';
    galleryContentElement.appendChild(buildGalleryGrid());
}

function createGalleryContent() {
    const content = document.createElement('div');
    content.style.display = 'grid';
    content.style.gridTemplateColumns = 'repeat(5, 1fr)';
    content.style.gap = '8px';
    content.style.marginTop = '24px';

    galleryContentElement = content;
    return content;
}

function createGallerySeparator() {
    const separator = document.createElement('hr');
    separator.style.border = 'none';
    separator.style.borderTop = '1px solid #ccc';
    separator.style.margin = '32px 0 0';
    return separator;
}

function createAddPhotoButton() {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Ajouter une photo';

    button.style.display = 'block';
    button.style.margin = '32px auto 0';
    button.style.padding = '12px 32px';
    button.style.backgroundColor = '#1a5f52';
    button.style.color = '#fff';
    button.style.border = 'none';
    button.style.borderRadius = '30px';
    button.style.fontSize = '16px';
    button.style.fontFamily = 'Syne';
    button.style.fontWeight = '700';
    button.style.cursor = 'pointer';
    button.style.width = '300px';

    button.addEventListener('click', function (event) {
        event.stopPropagation();
        window.navigateToScreen(2);
    });

    return button;
}

function createGalleryScreen() {
    const screen = document.createElement('div');

    screen.style.width = '50%';
    screen.style.flexShrink = '0';
    screen.style.boxSizing = 'border-box';
    screen.style.padding = '0 min(64px, 10%) 16px min(64px, 10%)';


    const title = document.createElement('h3');
    title.textContent = 'Galerie photo';
    title.style.textAlign = 'center';
    title.style.fontFamily = 'Work Sans';
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

window.rebuildModalGallery = rebuildModalGallery;
window.createGalleryScreen = createGalleryScreen;