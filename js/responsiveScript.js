
function bgAnimation() {
    modifyClassById("add", "animatio-opacity", ["bg-mobil"]);
    setTimeout(() => {
        modifyClassById("add", "d-none", ["bg-mobil"]);
    }, 1000);
}

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

function nameAnimation() {
    setTimeout(() => {
        modifyClassById("add", "responsive-display", ["greeting-container"]);
    }, 1000);
}