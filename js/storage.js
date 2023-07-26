const STORAGE_TOKEN = 'ZG7RPG1R9P2RSJ5I75CRHS6POMFNL0N1B28WRGXW';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

/**
* This asynchronous function sets an item in the storage by making a POST request to a specified URL.
* @param {string} key - The key of the item to be set.
* @param {any} value - The value of the item to be set.
* @returns {Promise} - A promise that resolves to the response JSON data from the server.
*/
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}

/**
* This asynchronous function retrieves an item from the storage by making a GET request to a specified URL.
* @param {string} key - The key of the item to be retrieved.
* @returns {Promise} - A promise that resolves to the value of the retrieved item, or throws an error if the item is not found.
*/
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) {
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}

/**
 * Asynchronously updates the added contact to the currentUser object and saves the updated data to the storage.
 * @param {object} contact - The contact object to be added to the currentUser's contacts array.
 * @param {object} currentUser - The currentUser object that contains the user's data.
 * @returns {Promise} - A promise that resolves when the data is successfully saved to the storage.
 */
async function updateAddedContactToCurrentUser(contact, currentUser) {
    currentUser.contacts.push(contact);
    await setItem('currentUser', JSON.stringify(currentUser));
}

/**
 * Asynchronously updates the added task to the currentUser object and saves the updated data to the storage.
 * @param {object} task - The task object to be added to the currentUser's tasks array.
 * @param {object} currentUser - The currentUser object that contains the user's data.
 * @returns {Promise} - A promise that resolves when the data is successfully saved to the storage.
 */
async function updateAddedTaskCurrentUser(task, currentUser) {
    currentUser.tasks.push(task);
    await setItem('currentUser', JSON.stringify(currentUser));
}

/**
 * Asynchronously updates the currentUser object in the users array and saves the updated array to the storage.
 * @param {Array} users - An array of user objects representing all users.
 * @param {object} currentUser - The currentUser object that needs to be updated in the users array.
 * @returns {Promise} - A promise that resolves when the updated users array is successfully saved to the storage.
 */
async function updateCurrentUserFromUsers(users, currentUser) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === currentUser.email && users[i].password === currentUser.password) {
            users[i] = currentUser;
            break;
        }
    }
    await setItem('users', JSON.stringify(users));
}

/**
 * Asynchronously updates the currentUser object in the storage.
 * @param {object} currentUser - The updated currentUser object to be saved in the storage.
 * @returns {Promise} - A promise that resolves when the updated currentUser object is successfully saved to the storage.
 */
async function updateCurrentUser(currentUser) {
    await setItem('currentUser', JSON.stringify(currentUser));
}