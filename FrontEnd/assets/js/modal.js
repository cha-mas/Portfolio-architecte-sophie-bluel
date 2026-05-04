let backdropElement = null;
let modalElement = null;
let screenContainerElement = null;
let closeButtonElement = null;
let backButtonElement = null;

function createBackdrop() {
    const backdrop = document.createElement('div');
    backdrop.classList.add('js-backdrop');

    backdrop.addEventListener('click', closeModal);

    return backdrop;
}

function createModalContainer() {
    const modal = document.createElement('div');
    modal.classList.add('js-modal-container');

    modal.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    return modal;
}

function createCloseButton() {
    const button = document.createElement('button');
    button.type = 'button';
    button.classList.add('js-icon-button');

    button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="16px" height="16px">
            <path fill="currentColor" d="M342.6 150.6c12.5 12.5 12.5 32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
        </svg>
    `;

    button.addEventListener('click', function(event) {
        event.stopPropagation();
        closeModal();
    });

    return button;
}

function createBackButton() {
    const button = document.createElement('button');
    button.type = 'button';
    button.classList.add('js-icon-button', 'js-hidden');

    button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16px" height="16px">
            <path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 282.6 416 282.6c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
        </svg>
    `;

    button.addEventListener('click', function(event) {
        event.stopPropagation();
        navigateToScreen(1);
    });

    return button;
}

function createModalHeader() {
    const header = document.createElement('div');
    header.classList.add('js-modal-header');

    return header;
}

function createScreenContainer() {
    const container = document.createElement('div');
    container.classList.add('js-screen-container');

    return container;
}

function navigateToScreen(screenNumber) {
    setCurrentScreen(screenNumber);

    const translateX = (screenNumber - 1) * -50;
    screenContainerElement.style.transform = `translateX(${translateX}%)`;

    if (screenNumber === 1) {
        backButtonElement.style.visibility = 'hidden';
        if (typeof resetForm === 'function') {
            resetForm();
        }
    } else {
        backButtonElement.style.visibility = 'visible';
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
    if (isModalVisible()) {
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
        backdropElement.style.display = 'flex';
    }

    setModalVisible(true);
    setCurrentScreen(1);
    navigateToScreen(1);

    document.addEventListener('keydown', handleEscapeKey);
}

function closeModal() {
    if (backdropElement) {
        backdropElement.style.display = 'none';
    }

    setModalVisible(false);
    setCurrentScreen(1);

    if (typeof resetForm === 'function') {
        resetForm();
    }

    document.removeEventListener('keydown', handleEscapeKey);
}

function handleEscapeKey(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
}

function initModal(triggerButton) {
    if (triggerButton) {
        triggerButton.addEventListener('click', toggleModal);
    }
}

window.navigateToScreen = navigateToScreen;
window.toggleModal = toggleModal;
window.openModal = openModal;
window.closeModal = closeModal;
window.initModal = initModal;
