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
