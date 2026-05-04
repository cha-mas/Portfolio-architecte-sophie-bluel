let fileInputElement = null;
let titleInputElement = null;
let categorySelectElement = null;
let submitButtonElement = null;
let imagePreviewElement = null;
let fileInputIconElement = null;
let fileInputButtonElement = null;
let fileInputInfoElement = null;
let formErrorElement = null;

function createFileInput() {
    const container = document.createElement('div');
    container.classList.add('js-file-input-container');

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/jpeg,image/png';
    input.id = 'file-input';
    input.classList.add('js-file-input-hidden');

    const icon = document.createElement('div');
    icon.innerHTML = `
        <svg width="69" height="60" viewBox="0 0 69 60" fill="none" fill="#CBD6DC" xmlns="http://www.w3.org/2000/svg">
            <path d="M59.6207 6.38793C60.7918 6.38793 61.75 7.34612 61.75 8.51724V51.0768L61.0846 50.2118L42.9855 26.7894C42.3866 26.0042 41.4417 25.5517 40.4569 25.5517C39.4721 25.5517 38.5405 26.0042 37.9283 26.7894L26.8825 41.0824L22.8235 35.3998C22.2247 34.5614 21.2665 34.069 20.2284 34.069C19.1904 34.069 18.2322 34.5614 17.6334 35.4131L6.9868 50.3183L6.38793 51.1434V51.1034V8.51724C6.38793 7.34612 7.34612 6.38793 8.51724 6.38793H59.6207ZM8.51724 0C3.81945 0 0 3.81945 0 8.51724V51.1034C0 55.8012 3.81945 59.6207 8.51724 59.6207H59.6207C64.3185 59.6207 68.1379 55.8012 68.1379 51.1034V8.51724C68.1379 3.81945 64.3185 0 59.6207 0H8.51724ZM19.1638 25.5517C20.0027 25.5517 20.8333 25.3865 21.6083 25.0655C22.3834 24.7444 23.0876 24.2739 23.6807 23.6807C24.2739 23.0876 24.7444 22.3834 25.0655 21.6083C25.3865 20.8333 25.5517 20.0027 25.5517 19.1638C25.5517 18.3249 25.3865 17.4943 25.0655 16.7192C24.7444 15.9442 24.2739 15.24 23.6807 14.6468C23.0876 14.0537 22.3834 13.5831 21.6083 13.2621C20.8333 12.9411 20.0027 12.7759 19.1638 12.7759C18.3249 12.7759 17.4943 12.9411 16.7192 13.2621C15.9442 13.5831 15.24 14.0537 14.6468 14.6468C14.0537 15.24 13.5831 15.9442 13.2621 16.7192C12.9411 17.4943 12.7759 18.3249 12.7759 19.1638C12.7759 20.0027 12.9411 20.8333 13.2621 21.6083C13.5831 22.3834 14.0537 23.0876 14.6468 23.6807C15.24 24.2739 15.9442 24.7444 16.7192 25.0655C17.4943 25.3865 18.3249 25.5517 19.1638 25.5517Z" fill="#B9C5CC"/>
        </svg>
    `;
    icon.classList.add('js-file-input-icon');

    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = '+ Ajouter photo';
    button.classList.add('js-file-input-btn');

    const info = document.createElement('p');
    info.textContent = 'jpg, png : 4mo max';
    info.classList.add('js-file-input-info');

    container.appendChild(input);
    container.appendChild(icon);
    container.appendChild(button);
    container.appendChild(info);

    fileInputElement = input;
    fileInputIconElement = icon;
    fileInputButtonElement = button;
    fileInputInfoElement = info;

    container.addEventListener('click', function () {
        input.click();
    });

    input.addEventListener('change', function () {
        handleFileSelect(input.files);
    });

    return container;
}

function handleFileSelect(files) {
    if (files && files.length > 0) {
        var fileContainer = fileInputElement.parentElement;
        var existing = fileContainer.parentNode.querySelectorAll(':scope > .js-error-text');
        existing.forEach(function (el) { el.remove(); });
        fileContainer.classList.remove('js-field-error');

        const file = files[0];
        if (file.size > 4 * 1024 * 1024) {
            showFieldError(fileContainer, 'Le fichier est trop volumineux. Maximum 4 Mo.');
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            showImagePreview(e.target.result);
            validateForm();
        };
        reader.readAsDataURL(file);
    }
}

function showImagePreview(imageDataUrl) {
    if (!imagePreviewElement) {
        imagePreviewElement = document.createElement('div');
        imagePreviewElement.classList.add('js-image-preview');

        const container = fileInputElement.parentElement;
        container.appendChild(imagePreviewElement, fileInputElement.nextSibling);
    }

    imagePreviewElement.style.backgroundImage = `url(${imageDataUrl})`;

    if (fileInputIconElement) fileInputIconElement.style.opacity = '0';
    if (fileInputButtonElement) fileInputButtonElement.style.opacity = '0';
    if (fileInputInfoElement) fileInputInfoElement.style.opacity = '0';
}

function clearImagePreview() {
    if (imagePreviewElement) {
        imagePreviewElement.style.backgroundImage = 'none';
    }

    if (fileInputIconElement) fileInputIconElement.style.opacity = '1';
    if (fileInputButtonElement) fileInputButtonElement.style.opacity = '1';
    if (fileInputInfoElement) fileInputInfoElement.style.opacity = '1';
}

function createTitleInput() {
    const container = document.createElement('div');
    container.classList.add('js-input-container');

    const label = document.createElement('label');
    label.textContent = 'Titre';
    label.classList.add('js-form-label');

    const input = document.createElement('input');
    input.type = 'text';
    input.classList.add('js-form-field', 'js-form-field-input');

    titleInputElement = input;

    input.addEventListener('input', function () {
        validateForm();
    });

    container.appendChild(label);
    container.appendChild(input);

    return container;
}

function createCategorySelect() {
    const container = document.createElement('div');
    container.classList.add('js-input-container');

    const label = document.createElement('label');
    label.textContent = 'Catégorie';
    label.classList.add('js-form-label');

    const select = document.createElement('select');
    select.classList.add('js-form-field', 'js-form-field-select');

    categorySelectElement = select;

    select.addEventListener('change', function () {
        validateForm();
    });

    container.appendChild(label);
    container.appendChild(select);

    return container;
}

function populateCategoryOptions() {
    const select = categorySelectElement;
    if (!select) return;

    select.innerHTML = '';

    getCategories().forEach(function (category) {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        select.appendChild(option);
    });
}

function createSubmitButton() {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Valider';
    button.disabled = true;
    button.classList.add('js-submit-btn', 'js-submit-btn-invalid');

    submitButtonElement = button;

    button.addEventListener('click', function () {
        handleFormSubmit();
    });

    return button;
}

function clearFormErrors() {
    titleInputElement.classList.remove('js-field-error');
    categorySelectElement.classList.remove('js-field-error');

    var fileContainer = fileInputElement.parentElement;
    var existing = fileContainer.parentNode.querySelectorAll(':scope > .js-error-text');
    existing.forEach(function (el) { el.remove(); });

    var titleContainer = titleInputElement.parentElement;
    existing = titleContainer.querySelectorAll('.js-error-text');
    existing.forEach(function (el) { el.remove(); });

    var categoryContainer = categorySelectElement.parentElement;
    existing = categoryContainer.querySelectorAll('.js-error-text');
    existing.forEach(function (el) { el.remove(); });

    if (formErrorElement) formErrorElement.textContent = '';
}

function showFieldError(field, message) {
    var container = field.classList ? field : field.parentElement;
    container.classList.add('js-field-error');
    var errorSpan = document.createElement('span');
    errorSpan.classList.add('js-error-text');
    errorSpan.textContent = message;
    field.parentElement.insertBefore(errorSpan, field.nextSibling);
}

function validateForm() {
    clearFormErrors();

    const isFileValid = fileInputElement.files && fileInputElement.files.length > 0;
    const isTitleValid = titleInputElement.value && titleInputElement.value.length >= 3;
    const isCategoryValid = categorySelectElement.value !== '';

    if (!isFileValid) {
        showFieldError(fileInputElement.parentElement, 'Veuillez sélectionner une image.');
    }
    if (!isTitleValid) {
        showFieldError(titleInputElement, 'Le titre doit contenir au moins 3 caractères.');
    }
    if (!isCategoryValid) {
        showFieldError(categorySelectElement, 'Veuillez sélectionner une catégorie.');
    }

    const isValid = isFileValid && isTitleValid && isCategoryValid;

    if (isValid) {
        submitButtonElement.classList.remove('js-submit-btn-invalid');
        submitButtonElement.classList.add('js-submit-btn-valid');
        submitButtonElement.disabled = false;
    } else {
        submitButtonElement.classList.remove('js-submit-btn-valid');
        submitButtonElement.classList.add('js-submit-btn-invalid');
        submitButtonElement.disabled = true;
    }
}

async function handleFormSubmit() {
    const imageFile = fileInputElement.files[0];
    const title = titleInputElement.value;
    const category = parseInt(categorySelectElement.value, 10);

    try {
        await createWork(imageFile, title, category);

        const works = await fetchWorks();
        setWorks(works);

        resetForm();
    } catch (error) {
        formErrorElement.textContent = 'Erreur lors de l\'ajout de la photo. Veuillez réessayer.';
    }
}

function resetForm() {
    if (fileInputElement) {
        fileInputElement.value = '';
    }
    if (titleInputElement) {
        titleInputElement.value = '';
    }
    if (categorySelectElement) {
        categorySelectElement.value = '';
    }
    clearImagePreview();
    clearFormErrors();
}

function createSeparator() {
    const separator = document.createElement('hr');
    separator.classList.add('js-separator');
    return separator;
}

function createAddWorkScreen() {
    const screen = document.createElement('div');
    screen.classList.add('js-screen-panel');

    const title = document.createElement('h3');
    title.textContent = 'Ajout photo';
    title.classList.add('js-add-work-title');

    const fileInputContainer = createFileInput();
    const titleInputContainer = createTitleInput();
    const categorySelectContainer = createCategorySelect();
    const separator = createSeparator();

    formErrorElement = document.createElement('span');
    formErrorElement.classList.add('js-error-text');

    const submitButton = createSubmitButton();

    screen.appendChild(title);
    screen.appendChild(fileInputContainer);
    screen.appendChild(titleInputContainer);
    screen.appendChild(categorySelectContainer);
    screen.appendChild(separator);
    screen.appendChild(formErrorElement);
    screen.appendChild(submitButton);

    populateCategoryOptions()
    categorySelectElement.value = '';

    return screen;
}


window.createAddWorkScreen = createAddWorkScreen;
window.resetForm = resetForm;
window.clearImagePreview = clearImagePreview;
