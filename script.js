/**Asynchronous function to include HTML files into the current page */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        let file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

/**

This function takes an event object as a parameter and focuses on the input element within the current target element.
@param {Event} event - The event object triggered by the click event.
*/
function focusInput(event) {
    const input = event.currentTarget.querySelector('input');
    input.focus();
}

/**

This function toggles between two images based on the state of a checkbox.
@param {string} inputId - The ID of the input element (checkbox) that controls the state.
 */
function toggleImage(inputId) {
    const checkbox = document.getElementById(inputId);
    const image1 = document.querySelector(`#${inputId} ~ .image-1`);
    const image2 = document.querySelector(`#${inputId} ~ .image-2`);

    if (checkbox.checked) {
        image1.classList.add("d-none");
        image2.classList.remove("d-none");
    } else {
        image1.classList.remove("d-none");
        image2.classList.add("d-none");
    }
}

/**

This function toggles the visibility of the logout button by adding or removing the "d-none" class based on its current state.
*/
async function toggleLogOut() {
    modifyClassById("toggle", "d-none", ["btn-log-out"]);
}
