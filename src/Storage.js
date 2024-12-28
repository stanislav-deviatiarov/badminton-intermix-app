const playersListStorageKey = 'badmintonPlayersList';
const courtsSorageKey = 'courtsList';
const mixedStorageKey = 'mixedObject';
const deviceIdKey = 'deviceId';

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorage(key) {
    let valueString = localStorage.getItem(key);
    return valueString === null ? [] : JSON.parse(valueString);
}

function loadSingleValueFromStorage(key) {
    let valueString = localStorage.getItem(key);
    return valueString === null ? '' : JSON.parse(valueString);
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

export function saveDeviceIdToStorage(deviceId) {
    saveToStorage(deviceIdKey, deviceId);
}

export function loadDeviceIdFromStorage() {
    return loadSingleValueFromStorage(deviceIdKey);
}

export function saveMixedObjectToStorage(mixedObject) {
    saveToStorage(mixedStorageKey, mixedObject);
}