/**

This file contains a set of functions related to user registration, login, and password management.
*/

/**

An array to store user data.
*/
let users = [];

/**

Initializes the application by loading users.
*/
async function init() {
    await loadUsers();
}

/**

Loads user data from storage and assigns it to the 'users' array.
*/
async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}

/**

Registers a new user by extracting data from input fields, adding the user to the 'users' array, and saving the updated data to storage.
*/
async function register() {
    const userName = document.getElementById("register-name");
    const userEmail = document.getElementById("register-email");
    const userPassword = document.getElementById("register-password");
    const registrBtn = document.getElementById("btn-register");
    registrBtn.disabled = true;
    users.push({
        name: userName.value,
        email: userEmail.value,
        password: userPassword.value,
    });
    await setItem('users', JSON.stringify(users));
    resetForm(registrBtn);
    toLogin();
}

/**

Resets the registration form by clearing input fields and enabling the registration button.
*/
function resetForm(btn) {
    clearInputValues(["register-name", "register-email", "register-password"]);
    btn.disabled = false;
}

/**

Logs in a user by checking the entered email and password against the stored user data. If a match is found, the user is redirected to the summary page; otherwise, appropriate error handling is performed.
*/
function login() {
    const loginBtn = document.getElementById("btn-login");
    const userEmail = document.getElementById("email");
    const userPassword = document.getElementById("password");
    const user = users.find(u => u.email == userEmail.value && u.password == userPassword.value);
    if (user) {
        window.location.href = "summary.html";
        resetForm(loginBtn);
    } else {
        modifyClassById("remove", "d-none", ["wrong-password"]);
        userPassword.attributes.placeholder.value = "Ups! Try again";
        clearInputValues(["password"]);
    }
}

/**

Logs in a user as a guest by redirecting them to the summary page.
*/
function guestLogin() {
    window.location.href = "summary.html";
}

/**

Initiates the process of sending an email, performing necessary class modifications, and transitioning to the reset password functionality.
*/
function sendEmail() {
    modifyClassById("remove", "d-none", ["pop-up-login", "message-confirmation"]);
    modifyClassById("add", "popUp-animation", ["message-confirmation"]);
    setTimeout(toResetPassword, 800);
}

/**

Validates the input for resetting the password. If the passwords match, it transitions back to the login view, otherwise appropriate class modifications are made to indicate the mismatched passwords.
*/
function resetPassword() {
    const inputNewPassword = document.getElementById("new-password");
    const inputConfirmPassword = document.getElementById("confirm-password");
    if (inputNewPassword.value == inputConfirmPassword.value) {
        backToLogin();
        modifyClassById("add", "d-none", ["wrong-not-matches"]);
        modifyClassById("remove", "not-matches-border-color", ["div-confirm-password"]);
    } else {
        modifyClassById("remove", "d-none", ["wrong-not-matches"]);
        modifyClassById("add", "not-matches-border-color", ["div-confirm-password"]);
    }
}