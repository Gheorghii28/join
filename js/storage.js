const STORAGE_TOKEN = 'ZG7RPG1R9P2RSJ5I75CRHS6POMFNL0N1B28WRGXW';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

/**

This asynchronous function sets an item in the storage by making a POST request to a specified URL.
@param {string} key - The key of the item to be set.
@param {any} value - The value of the item to be set.
@returns {Promise} - A promise that resolves to the response JSON data from the server.
*/
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}

/**

This asynchronous function retrieves an item from the storage by making a GET request to a specified URL.
@param {string} key - The key of the item to be retrieved.
@returns {Promise} - A promise that resolves to the value of the retrieved item, or throws an error if the item is not found.
*/
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) {
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}