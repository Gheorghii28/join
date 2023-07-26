/**
 * Animates the background of a mobile element by adding the "animation-opacity" class to it, and then hiding it after a delay.
 */
function bgAnimation() {
    modifyClassById("add", "animatio-opacity", ["bg-mobil"]);
    setTimeout(() => {
        modifyClassById("add", "d-none", ["bg-mobil"]);
    }, 1000);
}

/**
 * Handles the logo animation based on the window width. Sets the logo image source to "./assets/img/logo-joi-white.png"
 * if the window width is less than or equal to 1100 pixels, otherwise sets it to "./assets/img/join-logo.png". After a delay of 900 milliseconds,
 * sets the logo image source back to "./assets/img/join-logo.png".
 */
function logoAnimation() {
    const logoImg = document.getElementById("img-logo");
    if (window.innerWidth <= 1100) {
        logoImg.setAttribute("src", "./assets/img/logo-joi-white.png")
    } else {
        logoImg.setAttribute("src", "./assets/img/join-logo.png")
    }
    setTimeout(() => {
        logoImg.setAttribute("src", "./assets/img/join-logo.png");
    }, 900);
}

/**
 * Animates the display of the "greeting-container" element by adding the "responsive-display" class to it after a delay of 1 second (1000 milliseconds).
 * The "responsive-display" class likely contains CSS rules to make the element visible.
 */
function nameAnimation() {
    setTimeout(() => {
        modifyClassById("add", "responsive-display", ["greeting-container"]);
    }, 1000);
}