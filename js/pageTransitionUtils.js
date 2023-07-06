/**

Transitions to the password reset view by modifying classes and clearing input values.
*/
function toResetPassword() {
    modifyClassById("add", "d-none", ["forgot-password", "pop-up-login", "message-confirmation"]);
    modifyClassById("remove", "d-none", ["reset-password"]);
    modifyClassById("remove", "popUp-animation", ["message-confirmation"]);
    clearInputValues(["email-send"]);
}

/**

Transitions back to the login view from the password reset view by modifying classes, clearing input values, and delaying certain actions.
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

Transitions to the forgot password view by clearing input values and modifying classes.
*/
function toForgot() {
    clearInputValues(["new-password", "confirm-password", "email", "password"]);
    modifyClassById("remove", "not-matches-border-color", ["div-confirm-password"]);
    modifyClassById("remove", "d-none", ["forgot-password"]);
    modifyClassById("add", "d-none", ["login", "wrong-not-matches", "not-user", "reset-password"]);
}

/**

Transitions to the sign-up view by modifying classes.
*/
function toSignUp() {
    modifyClassById("add", "d-none", ["login", "not-user"]);
    modifyClassById("remove", "d-none", ["signup"]);
}

/**

Transitions to the login view by modifying classes, clearing input values, and removing a logo animation.
*/
function toLogin() {
    modifyClassById("remove", "d-none", ["login", "not-user"]);
    modifyClassById("add", "d-none", ["signup", "forgot-password"]);
    clearInputValues(["register-name", "register-email", "register-password", "email", "password"]);
    removeLogoAnimation();
}

/**

Removes a logo animation by modifying classes.
*/
function removeLogoAnimation() {
    modifyClassById("remove", "animation-opacity", ["login", "not-user"]);
}