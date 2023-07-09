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