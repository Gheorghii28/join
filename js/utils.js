/**

This function clears the values of input fields based on the provided array of element IDs.
@param {Array} arr - An array of element IDs representing the input fields to be cleared.
*/
function clearInputValues(arrIds) {
    arrIds.forEach(id => document.getElementById(id).value = "");
}


/**

This function modifies the class of elements based on their IDs using the specified method and class name.
@param {string} method - The method to be used for modifying the class. It can be 'add', 'remove', or 'toggle'.
@param {string} className - The name of the class to be modified.
@param {Array} arrIds - An array of element IDs representing the elements to be modified.
*/
function modifyClassById(method, className, arrIds) {
    arrIds.forEach(id => document.getElementById(id).classList[method](className));
}

/**

Generates a random RGB color.
Returns a string representing the RGB color in the format "rgb(red, green, blue)".
*/
function getRandomRGBColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
}

/**

Function that takes a name as a parameter and returns the initials of each word in the name.
It splits the name into individual words using the space character as the delimiter.
Then, it maps over the words and extracts the first character of each word.
Finally, it joins the extracted initials into a string and returns the result.
@param {string} name - The name from which to extract initials.
@returns {string} The initials of each word in the name.
*/
function getInitials(name) {
    const words = name.split(" ");
    const initials = words.map(word => word.charAt(0));
    return initials.join("");
}

/**

Function that adds an element to an array only if it doesn't already exist in the array.
It checks if the element is already present in the array using the 'includes()' method.
If the element is not found, it is added to the array using the 'push()' method.
@param {Array} array - The array to which the element should be added.
@param {*} element - The element to be added to the array.
*/
function addUniqueElement(array, element) {
    if (!array.includes(element)) {
        array.push(element);
    }
}

/**

This function sets the minimum date for a date input element.
It retrieves the date input element by its ID, then creates a new Date object representing the current date.
The current date is formatted as a string in ISO 8601 format (yyyy-mm-dd) and assigned to the 'min' attribute of the date input element.
*/
function setMinDate(inputId) {
    const dateInput = document.getElementById(inputId);
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    dateInput.setAttribute("min", formattedDate);
}

function setInputValue(inputId, inputValue) {
    document.getElementById(inputId).value = inputValue;
}

function getInputValue(inputId) {
    const inputValue = document.getElementById(inputId).value;
    return inputValue;
}

function getContactIndex(contactId, currentUser) {
    let contactIndex;
    const contacts = currentUser[`contacts`];
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i][`id`] === contactId) {
            contactIndex = i;
            break;
        }
    }
    return contactIndex;
}

function showScreenWithTaskForm() {
    modifyClassById("remove", "animation-move-reverse-tasktForm", ["task-form-w3"]);
    modifyClassById("remove", "d-none", ["sreen-task-form"]);
    modifyClassById("add", "animation-move-taskForm", ["task-form-w3"]);
}

function closeTaskForm() {
    modifyClassById("add", "animation-move-reverse-tasktForm", ["task-form-w3"]);
    setTimeout(() => {
        modifyClassById("add", "d-none", ["sreen-task-form"]);
        modifyClassById("remove", "animation-move-taskForm", ["task-form-w3"]);
    }, 500);
}

function scrollToSelected(contactId) {
    const selectedLi = document.getElementById(`contact-li-${contactId}`);
    selectedLi.scrollIntoView({ behavior: "smooth" });
}