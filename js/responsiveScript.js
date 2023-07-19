
function bgAnimation() {
    modifyClassById("add", "animatio-opacity", ["bg-mobil"]);
    setTimeout(() => {
        modifyClassById("add", "d-none", ["bg-mobil"]);
    }, 1000);
}

function logoAnimation() {
    const logoImg = document.getElementById("img-logo");
    logoImg.setAttribute("src", "./assets/img/logo-joi-white.png");
    setTimeout(() => {
        logoImg.setAttribute("src", "./assets/img/join-logo.png");
    }, 900);
}

function nameAnimation() {
    setTimeout(() => {
        modifyClassById("add", "responsive-display", ["greeting-container"]);
    }, 1000);
}