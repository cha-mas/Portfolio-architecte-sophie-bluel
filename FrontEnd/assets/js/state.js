/* Centralized application state management for works, categories, and modal state */

const appState = {
    allWorks: [],
    currentWorks: [],
    categories: []
};

const modalState = {
    isVisible: false,
    currentScreen: 1
};

function getState() {
    return appState;
}

function getModalState() {
    return modalState;
}

function setWorks(works) {
    appState.allWorks = works;
    appState.currentWorks = works;
}

function filterWorksByCategory(categoryId) {
    if (categoryId === CATEGORY_IDS.ALL) {
        appState.currentWorks = appState.allWorks;
    } else {
        const id = parseInt(categoryId, 10);
        appState.currentWorks = appState.allWorks.filter(work => work.category.id === id);
    }
}

function removeWork(workId) {
    const allIndex = appState.allWorks.findIndex(work => work.id === workId);
    if (allIndex !== -1) {
        appState.allWorks.splice(allIndex, 1);
    }
    
    const currentIndex = appState.currentWorks.findIndex(work => work.id === workId);
    if (currentIndex !== -1) {
        appState.currentWorks.splice(currentIndex, 1);
    }
}

function setCategories(categories) {
    appState.categories = categories;
}

window.appState = appState;
window.modalState = modalState;
window.getState = getState;
window.getModalState = getModalState;
window.setWorks = setWorks;
window.filterWorksByCategory = filterWorksByCategory;
window.removeWork = removeWork;
window.setCategories = setCategories;