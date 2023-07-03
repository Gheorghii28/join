
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




function setMinDate() {
    const dateInput = document.getElementById('o-t-date-input');

    // JavaScript-Code, um das aktuelle Datum zu erhalten
    var currentDate = new Date();

    // Formatierung des Datums als YYYY-MM-DD (z.B. "2023-06-27")
    var formattedDate = currentDate.toISOString().split('T')[0];

    // Setzen des aktuellen Datums als Wert für das min-Attribut des Input-Feldes
    dateInput.setAttribute('min', formattedDate);
    console.log(dateInput)

}