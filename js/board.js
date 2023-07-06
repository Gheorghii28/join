
// JavaScript
const buttons = document.querySelectorAll('.o-t-edit-priority-button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Entferne die aktive Klasse von allen Buttons
        buttons.forEach(btn => btn.classList.remove('active'));

        // Füge die aktive Klasse zum angeklickten Button hinzu
        button.classList.add('active');

        // Rufe die Information über den aktiven Button ab
        const priority = button.getAttribute('data-priority');
        console.log(`Aktiver Button: ${priority}`);
    });
});


// ----------------
const selectTrigger = document.querySelector('.o-t-e-select-trigger');

selectTrigger.addEventListener('click', function (event) {
    event.preventDefault();
    // Hier können weitere Aktionen hinzugefügt werden, wenn die .o-t-e-select-trigger angeklickt wird
});


// -------------------------------
// document.addEventListener('DOMContentLoaded', function () {
//     const selectTrigger = document.querySelector('.select-trigger');
//     const selectOptions = document.querySelector('.select-options');

//     selectTrigger.addEventListener('click', function () {
//         selectOptions.style.display = selectOptions.style.display === 'none' ? 'block' : 'none';
//     });

//     selectOptions.addEventListener('click', function (event) {
//         if (event.target.tagName === 'LI') {
//             const selectedValue = event.target.dataset.value;
//             selectTrigger.textContent = event.target.textContent;
//             selectOptions.style.display = 'none';
//             console.log('Selected value:', selectedValue);
//         }
//     });
// }); anpassen





