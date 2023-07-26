/**
* An array to store user data.
*/
let users = [];

/**
* This variable stores the current user.
*/
let currentUser;

/**
 * Initializes the application by loading users.
 * Calls the 'loadUsers' function to load user data from storage.
 * Initiates background and logo animations.
 */
async function init() {
    await loadUsers();
    bgAnimation();
    logoAnimation();
}

/**
 * Loads user data from storage and assigns it to the 'users' array.
 * It retrieves user data using the 'getItem' function and parses it as JSON.
 * Any errors during the process are logged to the console.
 */
async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}

/**
 * An asynchronous function that loads the current user.
 * Retrieves the current user data from storage using the 'getItem' function.
 * The retrieved user data is parsed as JSON and stored in the 'currentUser' variable.
 * Any errors during the process are logged to the console.
 */
async function loadCurrentUser() {
    try {
        currentUser = JSON.parse(await getItem('currentUser'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}

/**
 * Registers a new user by extracting data from input fields, adding the user to the 'users' array, and saving the updated data to storage.
 * The function retrieves user input data and creates new contacts and tasks for the user.
 * It then pushes the new user object to the 'users' array and saves the updated 'users' array to storage using the 'setItem' function.
 * After successful registration, the registration form is reset, and an animation is triggered.
 */
async function register() {
    const userName = document.getElementById("register-name");
    const userEmail = document.getElementById("register-email");
    const userPassword = document.getElementById("register-password");
    const registrBtn = document.getElementById("btn-register");
    const userContacts = createContacts();
    registrBtn.disabled = true;
    users.push({
        name: userName.value,
        email: userEmail.value,
        password: userPassword.value,
        contacts: userContacts,
        tasks: createTasks(userContacts)
    });
    await setItem('users', JSON.stringify(users));
    resetForm(registrBtn);
    animationSignedSucces();
    toLogin();
}

/**
 * Resets the registration form by clearing input fields and enabling the registration button.
 */
function resetForm(btn) {
    clearInputValues(["register-name", "register-email", "register-password"]);
    btn.disabled = false;
}

/**
 * Logs in a user by checking the entered email and password against the stored user data.
 * If a match is found, the user is redirected to the summary page; otherwise, appropriate error handling is performed.
 * The function compares the entered email and password with the user data in the 'users' array.
 * If a match is found, the user's data is saved to the storage as the current user using the 'setItem' function, and the user is redirected to the summary page.
 * If the login credentials do not match any user in the 'users' array, appropriate error handling is performed by displaying a wrong password message and clearing the password input field.
 */
async function login() {
    const loginBtn = document.getElementById("btn-login");
    const userEmail = document.getElementById("email");
    const userPassword = document.getElementById("password");
    const user = users.find(u => u.email == userEmail.value && u.password == userPassword.value);
    if (user) {
        await setItem('currentUser', JSON.stringify(user));
        window.location.href = "summary.html";
        resetForm(loginBtn);
    } else {
        modifyClassById("remove", "d-none", ["wrong-password"]);
        userPassword.attributes.placeholder.value = "Ups! Try again";
        clearInputValues(["password"]);
    }
}

/**
 * Logs in a user as a guest by redirecting them to the summary page.
 * The function creates a guest user object with contacts and tasks using the 'createContacts' and 'createTasks' functions, respectively.
 * The guest user object is then saved to the storage as the current user using the 'setItem' function, and the user is redirected to the summary page.
 */
async function guestLogin() {
    let guestContacts = createContacts();
    let guest = {
        name: "Guest",
        contacts: guestContacts,
        tasks: createTasks(guestContacts)
    }
    await setItem('currentUser', JSON.stringify(guest));
    window.location.href = "summary.html";
}

/**
 * Initiates the process of sending an email, performing necessary class modifications, and transitioning to the reset password functionality.
 * The function modifies classes to show the confirmation message and animates the transition to the reset password functionality using a timeout.
 */
function sendEmail() {
    modifyClassById("remove", "d-none", ["pop-up-login", "message-confirmation"]);
    modifyClassById("add", "popUp-animation", ["message-confirmation"]);
    setTimeout(toResetPassword, 800);
}

/**
 * Validates the input for resetting the password.
 * If the passwords match, it transitions back to the login view; otherwise, appropriate class modifications are made to indicate the mismatched passwords.
 * The function checks if the new password and confirm password inputs have matching values.
 * If the passwords match, the user is transitioned back to the login view using the 'backToLogin' function.
 * If the passwords do not match, appropriate class modifications are made to show the wrong not-matches message and highlight the confirm password input field.
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