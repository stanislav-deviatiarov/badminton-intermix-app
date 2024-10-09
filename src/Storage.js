const playersListStorageKey = 'badmintonPlayersList';
const courtsSorageKey = 'courtsList';

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorage(key) {
    let valueString = localStorage.getItem(key);
    return valueString === null ? [] : JSON.parse(valueString);
}

export function savePlayersToStorage(players) {
    saveToStorage(playersListStorageKey, players);
}

export function loadPlayersFromStorage() {
    return loadFromStorage(playersListStorageKey);
}

export function saveCourtsToStorage(courts) {
    saveToStorage(courtsSorageKey, courts);
}

export function loadCourtsFromStorage() {
    return loadFromStorage(courtsSorageKey);
}