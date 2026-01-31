/**
 * Utility helper functions
 */

/**
 * Converts milliseconds to minutes:seconds format
 * @param {number} millis - Duration in milliseconds
 * @returns {string} Formatted string like "3:45"
 */
export function formatDuration(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

/**
 * Gets data from localStorage by key
 * @param {string} key - Storage key
 * @returns {any|null} Parsed data or null
 */
export function getFromStorage(key) {
    const item = localStorage.getItem(key);
    if (!item) {
        return null;
    }
    return JSON.parse(item);
}

/**
 * Saves data to localStorage
 * @param {string} key - Storage key
 * @param {any} data - Data to store
 */
export function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
