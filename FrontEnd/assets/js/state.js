class EventEmitter {
    constructor() {
        this._listeners = {};
    }

    on(event, fn) {
        if (!this._listeners[event]) {
            this._listeners[event] = [];
        }
        this._listeners[event].push(fn);
    }

    emit(event, ...args) {
        if (this._listeners[event]) {
            this._listeners[event].forEach(function (fn) {
                fn(...args);
            });
        }
    }
}

const appState = {
    allWorks: [],
    currentWorks: [],
    categories: []
};

const modalState = {
    isVisible: false,
    currentScreen: 1
};

const stateEvents = new EventEmitter();

function getAllWorks() {
    return appState.allWorks;
}

function getCurrentWorks() {
    return appState.currentWorks;
}

function getCategories() {
    return appState.categories;
}

function isModalVisible() {
    return modalState.isVisible;
}

function getCurrentScreen() {
    return modalState.currentScreen;
}

function setModalVisible(visible) {
    modalState.isVisible = visible;
}

function setCurrentScreen(screenNumber) {
    modalState.currentScreen = screenNumber;
}

function setWorks(works) {
    appState.allWorks = works;
    appState.currentWorks = works;
    stateEvents.emit('works:changed');
}

function filterWorksByCategory(categoryId) {
    if (categoryId === CATEGORY_IDS.ALL) {
        appState.currentWorks = appState.allWorks;
    } else {
        const id = parseInt(categoryId, 10);
        appState.currentWorks = appState.allWorks.filter(function (work) {
            return work.category.id === id;
        });
    }
    stateEvents.emit('works:changed');
}

function removeWork(workId) {
    const allIndex = appState.allWorks.findIndex(function (work) {
        return work.id === workId;
    });
    if (allIndex !== -1) {
        appState.allWorks.splice(allIndex, 1);
    }

    const currentIndex = appState.currentWorks.findIndex(function (work) {
        return work.id === workId;
    });
    if (currentIndex !== -1) {
        appState.currentWorks.splice(currentIndex, 1);
    }
    stateEvents.emit('works:changed');
}

function setCategories(categories) {
    appState.categories = categories;
}

window.stateEvents = stateEvents;
window.getAllWorks = getAllWorks;
window.getCurrentWorks = getCurrentWorks;
window.getCategories = getCategories;
window.isModalVisible = isModalVisible;
window.getCurrentScreen = getCurrentScreen;
window.setModalVisible = setModalVisible;
window.setCurrentScreen = setCurrentScreen;
window.setWorks = setWorks;
window.filterWorksByCategory = filterWorksByCategory;
window.removeWork = removeWork;
window.setCategories = setCategories;
