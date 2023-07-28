/**
* This function clears the values of input fields based on the provided array of element IDs.
* @param {Array} arr - An array of element IDs representing the input fields to be cleared.
*/
function clearInputValues(arrIds) {
    arrIds.forEach(id => document.getElementById(id).value = "");
}


/**
* This function modifies the class of elements based on their IDs using the specified method and class name.
* @param {string} method - The method to be used for modifying the class. It can be 'add', 'remove', or 'toggle'.
* @param {string} className - The name of the class to be modified.
* @param {Array} arrIds - An array of element IDs representing the elements to be modified.
*/
function modifyClassById(method, className, arrIds) {
    arrIds.forEach(id => document.getElementById(id).classList[method](className));
}

/**
* Generates a random RGB color.
* Returns a string representing the RGB color in the format "rgb(red, green, blue)".
*/
function getRandomRGBColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
}

/**
* Function that takes a name as a parameter and returns the initials of each word in the name.
* It splits the name into individual words using the space character as the delimiter.
* Then, it maps over the words and extracts the first character of each word.
* Finally, it joins the extracted initials into a string and returns the result.
* @param {string} name - The name from which to extract initials.
* @returns {string} The initials of each word in the name.
*/
function getInitials(name) {
    const words = name.split(" ");
    const initials = words.map(word => word.charAt(0));
    return initials.join("");
}

/**
* Function that adds an element to an array only if it doesn't already exist in the array.
* It checks if the element is already present in the array using the 'includes()' method.
* If the element is not found, it is added to the array using the 'push()' method.
* @param {Array} array - The array to which the element should be added.
* @param {*} element - The element to be added to the array.
*/
function addUniqueElement(array, element) {
    if (!array.includes(element)) {
        array.push(element);
    }
}

/**
* This function sets the minimum date for a date input element.
* It retrieves the date input element by its ID, then creates a new Date object representing the current date.
* The current date is formatted as a string in ISO 8601 format (yyyy-mm-dd) and assigned to the 'min' attribute of the date input element.
*/
function setMinDate(inputId) {
    const dateInput = document.getElementById(inputId);
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    dateInput.setAttribute("min", formattedDate);
}

/**
 * Sets the value of the input element identified by the given inputId.
 * @param {string} inputId - The unique identifier (ID) of the input element.
 * @param {string} inputValue - The value to be set for the input element.
 */
function setInputValue(inputId, inputValue) {
    document.getElementById(inputId).value = inputValue;
}

/**
 * Gets the current value of the input element identified by the given inputId.
 * @param {string} inputId - The unique identifier (ID) of the input element.
 * @returns {string} The current value of the input element.
 */
function getInputValue(inputId) {
    const inputValue = document.getElementById(inputId).value;
    return inputValue;
}

/**
 * Finds the index of a contact with the specified contactId in the contacts array of the currentUser.
 * @param {string} contactId - The unique identifier of the contact to find the index for.
 * @param {object} currentUser - The object representing the current user, containing a 'contacts' array.
 * @returns {number} The index of the contact in the 'contacts' array. Returns -1 if the contact is not found.
 */
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

/**
 * Displays the screen with the task form by applying CSS class modifications and animations.
 * Also updates the statusTask variable with the provided currentStatusTask.
 * @param {string} currentStatusTask - The current status of the task to be displayed in the form.
 */
function showScreenWithTaskForm(currentStatusTask) {
    modifyClassById("remove", "animation-move-reverse-tasktForm", ["task-form-w3"]);
    modifyClassById("remove", "d-none", ["sreen-task-form"]);
    modifyClassById("add", "animation-move-taskForm", ["task-form-w3"]);
    statusTask = currentStatusTask;
}

/**
 * Closes the task form by applying CSS class modifications and animations.
 */
function closeTaskForm() {
    modifyClassById("add", "animation-move-reverse-tasktForm", ["task-form-w3"]);
    setTimeout(() => {
        modifyClassById("add", "d-none", ["sreen-task-form"]);
        modifyClassById("remove", "animation-move-taskForm", ["task-form-w3"]);
    }, 500);
}

/**
 * Scrolls the page to the selected contact element identified by the given contactId.
 * @param {string} contactId - The unique identifier of the contact element to scroll to.
 */
function scrollToSelected(contactId) {
    const selectedLi = document.getElementById(`contact-li-${contactId}`);
    selectedLi.scrollIntoView({ behavior: "smooth" });
}



/**
 * Get the limited text for a task.
 * @param {string} text - The full text text of the task.
 * @param {number} nr - The maximum number of characters for the limited text.
 * @returns {string} The limited text text with a maximum of 100 characters,
 *                  preserving the last complete word and adding "..." if the text is truncated.
 */
function getLimitedtext(text, nr) {
    let limitedText = text.substring(0, nr);
    if (text.length > nr && /\w/.test(text[100])) {
        let lastSpaceIndex = limitedText.lastIndexOf(" ");
        if (lastSpaceIndex !== -1) {
            limitedText = limitedText.substring(0, lastSpaceIndex);
        }
    }
    if (text.length > nr) {
        limitedText += "...";
    }
    return limitedText;
}

/**
 * Generates a greeting based on the current time.
 * @returns {string} The appropriate greeting based on the current time.
 */
function getGreeting() {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
        return "Good morning, ";
    } else if (currentHour >= 12 && currentHour < 18) {
        return "Good afternoon, ";
    } else if (currentHour >= 18 && currentHour < 22) {
        return "Good evening, ";
    } else {
        return "Good night, ";
    }
}

/**
 * Converts a phone number by replacing the leading '+' with '00'.
 * If the phone number already starts with '00', it remains unchanged.
 * @param {string} phoneNumber - The input phone number to be converted.
 * @returns {string} The converted phone number with '00' instead of '+'.
 */
function convertPhoneNumber(phoneNumber) {
    if (phoneNumber.startsWith('+')) {
        return '00' + phoneNumber.slice(1);
    }
    return JSON.parse(phoneNumber);
}

/**
 * Gets the converted value of a phone number input by replacing the leading '00' with '+'.
 * If the phone number does not start with '00', it returns the original phone number.
 * @param {string} inputId - The ID of the input element containing the phone number to be converted.
 * @returns {string} The converted phone number with '+' instead of '00' at the beginning, or the original phone number.
 */
function getConvertedInputValue(inputId) {
    const phoneNumberInput = document.getElementById(inputId);
    let phoneNumber = phoneNumberInput.value.toString();
    if (phoneNumber.startsWith('00')) {
        phoneNumber = '+' + phoneNumber.slice(2);
    }
    return phoneNumber;
}

/**
 * Function to set the background color of an element based on the color of a specific contact.
 * It retrieves the contact's color based on the provided contact ID from the current user's contacts.
 * Then, it sets the background color of the specified element to the contact's color.
 * @param {number} contactId - The ID of the contact whose color will be used.
 * @param {string} elId - The ID of the element to which the background color will be applied.
 * @param {object} currentUser - The object representing the current user.
 */
function setContactColorToElement(contactId, elId, currentUser) {
    const contactIndex = getContactIndex(contactId, currentUser);
    const contactColor = currentUser[`contacts`][contactIndex][`color`];
    document.getElementById(elId).style.backgroundColor = contactColor;
}

/**
 * Determines the top image class based on the task status.
 * @param {string} status - The status of the task ("to-do" or "done").
 * @returns {string} The class name for the top image.
 */
function getTopImageClass(status) {
    if (status === "to-do") {
        return "todo-img-top";
    } else if (status === "done") {
        return "done-img-top";
    }
    return "";
}

/**
 * Determines the bottom image class based on the task status.
 * @param {string} status - The status of the task ("to-do" or "done").
 * @returns {string} The class name for the bottom image.
 */
function getBottomImageClass(status) {
    if (status === "to-do") {
        return "todo-img-bottom";
    } else if (status === "done") {
        return "done-img-bottom";
    }
    return "";
}