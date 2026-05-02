/* Work creation form screen for the modal: handles photo upload and form submission */

let fileInputElement = null;
let titleInputElement = null;
let categorySelectElement = null;
let submitButtonElement = null;
let imagePreviewElement = null;
let fileInputIconElement = null;
let fileInputButtonElement = null;
let fileInputInfoElement = null;

function createFileInput() {
    const container = document.createElement('div');
    container.style.marginBottom = '24px';
    container.style.position = 'relative';
    container.style.borderRadius = '8px';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.backgroundColor = "#E8F1F6";
    container.style.padding = "24px"
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.cursor = 'pointer';
    container.style.overflow = 'hidden';

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/jpeg,image/png';
    input.id = 'file-input';
    input.style.display = 'none';

    const icon = document.createElement('div');
    icon.innerHTML = `
        <svg width="69" height="60" viewBox="0 0 69 60" fill="none" fill="#CBD6DC" xmlns="http://www.w3.org/2000/svg">
            <path d="M59.6207 6.38793C60.7918 6.38793 61.75 7.34612 61.75 8.51724V51.0768L61.0846 50.2118L42.9855 26.7894C42.3866 26.0042 41.4417 25.5517 40.4569 25.5517C39.4721 25.5517 38.5405 26.0042 37.9283 26.7894L26.8825 41.0824L22.8235 35.3998C22.2247 34.5614 21.2665 34.069 20.2284 34.069C19.1904 34.069 18.2322 34.5614 17.6334 35.4131L6.9868 50.3183L6.38793 51.1434V51.1034V8.51724C6.38793 7.34612 7.34612 6.38793 8.51724 6.38793H59.6207ZM8.51724 0C3.81945 0 0 3.81945 0 8.51724V51.1034C0 55.8012 3.81945 59.6207 8.51724 59.6207H59.6207C64.3185 59.6207 68.1379 55.8012 68.1379 51.1034V8.51724C68.1379 3.81945 64.3185 0 59.6207 0H8.51724ZM19.1638 25.5517C20.0027 25.5517 20.8333 25.3865 21.6083 25.0655C22.3834 24.7444 23.0876 24.2739 23.6807 23.6807C24.2739 23.0876 24.7444 22.3834 25.0655 21.6083C25.3865 20.8333 25.5517 20.0027 25.5517 19.1638C25.5517 18.3249 25.3865 17.4943 25.0655 16.7192C24.7444 15.9442 24.2739 15.24 23.6807 14.6468C23.0876 14.0537 22.3834 13.5831 21.6083 13.2621C20.8333 12.9411 20.0027 12.7759 19.1638 12.7759C18.3249 12.7759 17.4943 12.9411 16.7192 13.2621C15.9442 13.5831 15.24 14.0537 14.6468 14.6468C14.0537 15.24 13.5831 15.9442 13.2621 16.7192C12.9411 17.4943 12.7759 18.3249 12.7759 19.1638C12.7759 20.0027 12.9411 20.8333 13.2621 21.6083C13.5831 22.3834 14.0537 23.0876 14.6468 23.6807C15.24 24.2739 15.9442 24.7444 16.7192 25.0655C17.4943 25.3865 18.3249 25.5517 19.1638 25.5517Z" fill="#B9C5CC"/>
        </svg>
    `;

    icon.style.marginBottom = '16px';

    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = '+ Ajouter photo';
    button.style.padding = '12px 32px';
    button.style.backgroundColor = '#CBD6DC';
    button.style.color = '#306685';
    button.style.border = 'none';
    button.style.borderRadius = '30px';
    button.style.fontSize = '16px';
    button.style.fontWeight = '500';
    button.style.fontFamily = 'Work Sans';
    button.style.cursor = 'pointer';

    const info = document.createElement('p');
    info.textContent = 'jpg, png : 4mo max';
    info.style.fontSize = '12px';
    info.style.color = '#444444';
    info.style.marginTop = '8px';

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
        const file = files[0];
        if (file.size > 4 * 1024 * 1024) {
            alert('Le fichier est trop volumineux. Maximum 4 Mo.');
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
        imagePreviewElement.style.position = 'absolute';
        imagePreviewElement.style.top = '0';
        imagePreviewElement.style.left = '0';
        imagePreviewElement.style.width = '100%';
        imagePreviewElement.style.height = '100%';
        imagePreviewElement.style.backgroundSize = 'contain';
        imagePreviewElement.style.backgroundPosition = 'center';
        imagePreviewElement.style.backgroundRepeat = 'no-repeat';
        imagePreviewElement.style.zIndex = '1';

        const container = fileInputElement.parentElement;
        container.appendChild(imagePreviewElement, fileInputElement.nextSibling);
    }

    imagePreviewElement.style.backgroundImage = `url(${imageDataUrl})`;
    
    // Hide the file input area elements
    if (fileInputIconElement) fileInputIconElement.style.opacity = '0';
    if (fileInputButtonElement) fileInputButtonElement.style.opacity = '0';
    if (fileInputInfoElement) fileInputInfoElement.style.opacity = '0';
}

function clearImagePreview() {
    if (imagePreviewElement) {
        imagePreviewElement.style.backgroundImage = 'none';
    }
    
    // Show the file input area elements
    if (fileInputIconElement) fileInputIconElement.style.opacity = '1';
    if (fileInputButtonElement) fileInputButtonElement.style.opacity = '1';
    if (fileInputInfoElement) fileInputInfoElement.style.opacity = '1';
}

function createTitleInput() {
    const container = document.createElement('div');
    container.style.marginBottom = '24px';

    const label = document.createElement('label');
    label.textContent = 'Titre';
    label.style.display = 'block';
    label.style.marginBottom = '8px';
    label.style.fontSize = '16px';
    label.style.fontFamily = 'Work Sans';
    label.style.color = '#000';

    const input = document.createElement('input');
    input.type = 'text';
    input.style.width = '100%';
    input.style.padding = '16px';
    input.style.border = 'none';
    input.style.fontSize = '16px';
    input.style.fontFamily = 'Work Sans';
    input.style.boxSizing = 'border-box';
    input.style.backgroundColor = '#fff';
    input.style.boxShadow = '0px 4px 14px 0px #00000017';

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
    container.style.marginBottom = '24px';

    const label = document.createElement('label');
    label.textContent = 'Catégorie';
    label.style.display = 'block';
    label.style.marginBottom = '8px';
    label.style.fontSize = '16px';
    label.style.fontFamily = 'Work Sans';
    label.style.color = '#000';

    const select = document.createElement('select');
    select.style.width = '100%';
    select.style.padding = '16px';
    select.style.fontSize = '16px';
    select.style.border = 'none';
    select.style.fontFamily = 'Work Sans';
    select.style.boxSizing = 'border-box';
    select.style.backgroundColor = '#fff';
    select.style.cursor = 'pointer';
    select.style.boxShadow = '0px 4px 14px 0px #00000017';

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

    getState().categories.forEach(function (category) {
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

    button.style.display = 'block';
    button.style.padding = '12px 32px';
    button.style.backgroundColor = '#a7a7a7';
    button.style.color = '#fff';
    button.style.border = 'none';
    button.style.borderRadius = '30px';
    button.style.fontSize = '16px';
    button.style.fontFamily = 'Syne';
    button.style.fontWeight = '700'
    button.style.cursor = 'pointer';
    button.style.marginTop = '24px';
    button.style.marginLeft = 'auto';
    button.style.marginRight = 'auto';
    button.style.width = '230px';

    submitButtonElement = button;

    button.addEventListener('click', function () {
        handleFormSubmit();
    });

    return button;
}

function validateForm() {
    const isFileValid = fileInputElement.files && fileInputElement.files.length > 0;
    const isTitleValid = titleInputElement.value && titleInputElement.value.length >= 3;
    const isCategoryValid = categorySelectElement.value !== '';

    const isValid = isFileValid && isTitleValid && isCategoryValid;

    if (isValid) {
        submitButtonElement.style.backgroundColor = '#1a5f52';
        submitButtonElement.disabled = false;
    } else {
        submitButtonElement.style.backgroundColor = '#a7a7a7';
        submitButtonElement.disabled = true;
    }
}

function handleFormSubmit() {
    const formData = {
        image: fileInputElement.files[0],
        title: titleInputElement.value,
        categoryId: categorySelectElement.value
    };

    console.log('Form submitted:', formData);

    resetForm();
    validateForm();
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
}

function createSeparator() {
    const separator = document.createElement('hr');
    separator.style.border = 'none';
    separator.style.borderTop = '1px solid #ccc';
    separator.style.margin = '32px 0 0';
    return separator;
}

function createAddWorkScreen() {
    const screen = document.createElement('div');

    screen.style.width = '50%';
    screen.style.flexShrink = '0';
    screen.style.boxSizing = 'border-box';
    screen.style.padding = '0 min(64px, 10%) 16px min(64px, 10%)';


    const title = document.createElement('h3');
    title.textContent = 'Ajout photo';
    title.style.textAlign = 'center';
    title.style.fontFamily = 'Work Sans';
    title.style.fontSize = '26px';
    title.style.marginBottom = '24px';

    const fileInputContainer = createFileInput();
    const titleInputContainer = createTitleInput();
    const categorySelectContainer = createCategorySelect();
    const separator = createSeparator();
    const submitButton = createSubmitButton();


    screen.appendChild(title);
    screen.appendChild(fileInputContainer);
    screen.appendChild(titleInputContainer);
    screen.appendChild(categorySelectContainer);
    screen.appendChild(separator);
    screen.appendChild(submitButton);

    populateCategoryOptions()
    categorySelectElement.value = '';

    return screen;
}


window.createAddWorkScreen = createAddWorkScreen;
window.resetForm = resetForm;
window.clearImagePreview = clearImagePreview;
