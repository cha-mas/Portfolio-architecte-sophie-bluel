/* Work creation form screen for the modal: handles photo upload and form submission */

function createAddWorkScreen() {
    const screen = document.createElement('div');

    screen.style.width = '50%';
    screen.style.flexShrink = '0';
    screen.style.boxSizing = 'border-box';
    screen.style.padding = '32px';

    const title = document.createElement('h3');
    title.textContent = 'Ajout photo';
    title.style.textAlign = 'center';
    title.style.fontFamily = 'Work Sans';
    title.style.fontSize = '26px';

    screen.appendChild(title);

    return screen;
}

window.createAddWorkScreen = createAddWorkScreen;