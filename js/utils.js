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