/**
 * Handles the activation of a button in a menu or navigation bar.
 */
function activeBtn() {
    const menuLi = document.querySelectorAll('.el-bg');
    let elActive = "Summary";
    menuLi.forEach(button => {
        button.addEventListener('click', () => {
            menuLi.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            elActive = button.getAttribute('data-el');
        });
    });
}