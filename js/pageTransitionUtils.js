/**
* Transitions to the password reset view by modifying classes and clearing input values.
*/
function toResetPassword() {
    modifyClassById("add", "d-none", ["forgot-password", "pop-up-login", "message-confirmation"]);
    modifyClassById("remove", "d-none", ["reset-password"]);
    modifyClassById("remove", "popUp-animation", ["message-confirmation"]);
    clearInputValues(["email-send"]);
}

/**
* Transitions back to the login view from the password reset view by modifying classes, clearing input values, and delaying certain actions.
*/
function backToLogin() {
    modifyClassById("remove", "d-none", ["pop-up-login", "message-reset-password"]);
    modifyClassById("add", "popUp-animation", ["message-reset-password"]);
    setTimeout(() => {
        toLogin();
        modifyClassById("add", "d-none", ["reset-password", "pop-up-login", "message-reset-password"]);
        modifyClassById("remove", "popUp-animation", ["message-reset-password"]);
        clearInputValues(["new-password", "confirm-password"]);
    }, 800);
}

/**
 * Handles the animation for a successful sign-up or login process.
 * Shows and hides pop-up messages using CSS class modifications and animations.
 */
function animationSignedSucces() {
    modifyClassById("remove", "d-none", ["pop-up-login", "message-signed-succes"]);
    modifyClassById("add", "popUp-animation", ["message-signed-succes"]);
    setTimeout(() => {
        modifyClassById("add", "d-none", ["reset-password", "pop-up-login", "message-reset-password", "message-signed-succes"]);
        modifyClassById("remove", "popUp-animation", ["message-signed-succes"]);
    }, 800);
}

/**
* Transitions to the forgot password view by clearing input values and modifying classes.
*/
function toForgot() {
    clearInputValues(["new-password", "confirm-password", "email", "password"]);
    modifyClassById("remove", "not-matches-border-color", ["div-confirm-password"]);
    modifyClassById("remove", "d-none", ["forgot-password"]);
    modifyClassById("add", "d-none", ["login", "wrong-not-matches", "not-user", "reset-password"]);
}

/**
* Transitions to the sign-up view by modifying classes.
*/
function toSignUp() {
    modifyClassById("add", "d-none", ["login", "not-user"]);
    modifyClassById("remove", "d-none", ["signup"]);
}

/**
* Transitions to the login view by modifying classes, clearing input values, and removing a logo animation.
*/
function toLogin() {
    const userPassword = document.getElementById("password");
    userPassword.attributes.placeholder.value = "Password";
    modifyClassById("remove", "d-none", ["login", "not-user"]);
    modifyClassById("add", "d-none", ["signup", "forgot-password"]);
    clearInputValues(["register-name", "register-email", "register-password", "email", "password"]);
    removeLogoAnimation();
    modifyClassById("add", "d-none", ["wrong-password"]);
}

/**
* Removes a logo animation by modifying classes.
*/
function removeLogoAnimation() {
    modifyClassById("remove", "animation-opacity", ["login", "not-user"]);
}

/**
 * Displays the "Edit Contact" form by applying CSS class modifications and animations.
 * The form or popup is identified by the element IDs provided in the comments.
 */
function showEditContactForm() {
    modifyClassById("remove", "d-none", ["pop-up-contact"]);
    modifyClassById("remove", "d-none", ["p-u-edit-contact"]);
    modifyClassById("add", "animation-move-contactForm", ["p-u-edit-contact"]);
}

/**
 * Hides the "Edit Contact" form by applying CSS class modifications and animations.
 * The form or popup is identified by the element IDs provided in the comments.
 * It introduces a delay of 500 milliseconds (0.5 seconds) to allow animations to complete smoothly.
 */
function hideEditContactForm() {
    modifyClassById("add", "animation-move-reverse-contactForm", ["p-u-edit-contact"]);
    setTimeout(() => {
        modifyClassById("remove", "animation-move-contactForm", ["p-u-edit-contact"]);
        modifyClassById("add", "d-none", ["pop-up-contact"]);
        modifyClassById("add", "d-none", ["p-u-edit-contact"]);
        modifyClassById("remove", "animation-move-reverse-contactForm", ["p-u-edit-contact"]);
    }, 500);
}

/**
 * Displays the "Add Contact" form by applying CSS class modifications and animations.
 * The form or popup is identified by the element IDs provided in the comments.
 */
function showAddContactForm() {
    modifyClassById("remove", "d-none", ["pop-up-contact"]);
    modifyClassById("remove", "d-none", ["p-u-add-contact"]);
    modifyClassById("add", "animation-move-contactForm", ["p-u-add-contact"]);
}

/**
 * Hides the "Add Contact" form by applying CSS class modifications and animations.
 * The form or popup is identified by the element IDs provided in the comments.
 */
function hideAddContactForm() {
    modifyClassById("add", "animation-move-reverse-contactForm", ["p-u-add-contact"]);
    modifyClassById("remove", "animation-move-contactForm", ["p-u-add-contact"]);
    modifyClassById("add", "d-none", ["pop-up-contact"]);
    modifyClassById("add", "d-none", ["p-u-add-contact"]);
    modifyClassById("remove", "animation-move-reverse-contactForm", ["p-u-add-contact"]);
}

/**
 * Toggles the visibility of contact-related elements on the screen.
 * This function modifies the class attributes of specified elements to control their display.
 */
function toggleContactView() {
    modifyClassById("add", "none1000px", ["contacts-div"]);
    modifyClassById("remove", "flex1000px", ["contacts-div"]);
    modifyClassById("add", "none1000px", ["btn-new-contact"]);
    modifyClassById("remove", "flex1000px", ["btn-new-contact"]);
    modifyClassById("remove", "none1000px", ["btn-to-contact"]);
    modifyClassById("add", "flex1000px", ["btn-to-contact"]);
    modifyClassById("remove", "none1000px", ["contact-headline"]);
    modifyClassById("add", "flex1000px", ["contact-headline"]);
    modifyClassById("remove", "none1000px", ["container-detailed-info"]);
    modifyClassById("add", "flex1000px", ["container-detailed-info"]);
}

/**
 * Shows the contact success message with animation and hides it after a delay.
 * This function modifies the class attributes of the contact-succes-created element to control its display and animation.
 */
function showContactSuccessMessage() {
    setTimeout(() => {
        modifyClassById("remove", "d-none", ["contact-succes-created"]);
        modifyClassById("add", "animation-added-task", ["contact-succes-created"]);
        setTimeout(() => {
            modifyClassById("add", "d-none", ["contact-succes-created"]);
            modifyClassById("remove", "animation-added-task", ["contact-succes-created"]);
        }, 500);
    }, 500);
}