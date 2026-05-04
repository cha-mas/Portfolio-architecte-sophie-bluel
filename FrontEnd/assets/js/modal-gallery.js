let galleryContentElement = null;

function createPreviewImage(work) {
    const container = document.createElement('div');
    container.classList.add('js-preview-container');

    const img = document.createElement('img');
    img.src = work.imageUrl;
    img.alt = work.title;
    img.classList.add('js-preview-image');

    container.appendChild(img);
    return container;
}

function createDeleteButton() {
    const button = document.createElement('button');
    button.type = 'button';
    button.classList.add('js-delete-btn');

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

async function handleDeleteWork(workId, element) {
    try {
        await deleteWork(workId);
        removeWork(workId);
    } catch (error) {
        var errorSpan = document.createElement('span');
        errorSpan.classList.add('js-error-text');
        errorSpan.textContent = 'Erreur lors de la suppression. Veuillez réessayer.';
        galleryContentElement.prepend(errorSpan);
        setTimeout(function () { errorSpan.remove(); }, 3000);
    }
}

function buildGalleryGrid() {
    const fragment = document.createDocumentFragment();

    getAllWorks().forEach(function (work) {
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
    content.classList.add('js-gallery-grid');

    galleryContentElement = content;
    return content;
}

function createGallerySeparator() {
    const separator = document.createElement('hr');
    separator.classList.add('js-separator');
    return separator;
}

function createAddPhotoButton() {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Ajouter une photo';
    button.classList.add('js-add-photo-btn');

    button.addEventListener('click', function (event) {
        event.stopPropagation();
        window.navigateToScreen(2);
    });

    return button;
}

function createGalleryScreen() {
    const screen = document.createElement('div');
    screen.classList.add('js-screen-panel');

    const title = document.createElement('h3');
    title.textContent = 'Galerie photo';
    title.classList.add('js-modal-screen-title');

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

stateEvents.on('works:changed', rebuildModalGallery);

window.rebuildModalGallery = rebuildModalGallery;
window.createGalleryScreen = createGalleryScreen;
