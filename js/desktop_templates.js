

function activeBtn() {

    // JavaScript
    const menuLi = document.querySelectorAll('.el-bg');
    let elActive = "Summary";
    menuLi.forEach(button => {
        button.addEventListener('click', () => {
            // Entferne die aktive Klasse von allen menuLi
            menuLi.forEach(btn => btn.classList.remove('active'));

            // Füge die aktive Klasse zum angeklickten Button hinzu
            button.classList.add('active');

            // Rufe die Information über den aktiven Button ab
            elActive = button.getAttribute('data-el');
            console.log(`Aktiver Button: ${elActive}`);
        });
    });
    console.log(`Aktiver Button: ${elActive}`);
}
