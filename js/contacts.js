const firstNameArr = ["Adam", "Alex", "Aaron", "Ben", "Carl", "Dan", "David", "Edward", "Fred", "Frank", "George", "Hal", "Hank", "Ike", "John", "Jack", "Joe", "Larry", "Monte", "Matthew", "Mark", "Nathan", "Otto", "Paul", "Peter", "Roger", "Roger", "Steve", "Thomas", "Tim", "Ty", "Victor", "Walter"];
const lastNameArr = ["Anderson", "Ashwoon", "Aikin", "Bateman", "Bongard", "Bowers", "Boyd", "Cannon", "Cast", "Deitz", "Dewalt", "Ebner", "Frick", "Hancock", "Haworth", "Hesch", "Hoffman", "Kassing", "Knutson", "Lawless", "Lawicki", "Mccord", "McCormack", "Miller", "Myers", "Nugent", "Ortiz", "Orwig", "Ory", "Paiser", "Pak", "Pettigrew", "Quinn", "Quizoz", "Ramachandran", "Resnick", "Sagar", "Schickowski", "Schiebel", "Sellon", "Severson", "Shaffer", "Solberg", "Soloman", "Sonderling", "Soukup", "Soulis", "Stahl", "Sweeney", "Tandy", "Trebil", "Trusela", "Trussel", "Turco", "Uddin", "Uflan", "Ulrich", "Upson", "Vader", "Vail", "Valente", "Van Zandt", "Vanderpoel", "Ventotla", "Vogal", "Wagle", "Wagner", "Wakefield", "Weinstein", "Weiss", "Woo", "Yang", "Yates", "Yocum", "Zeaser", "Zeller", "Ziegler", "Bauer", "Baxster", "Casal", "Cataldi", "Caswell", "Celedon", "Chambers", "Chapman", "Christensen", "Darnell", "Davidson", "Davis", "DeLorenzo", "Dinkins", "Doran", "Dugelman", "Dugan", "Duffman", "Eastman", "Ferro", "Ferry", "Fletcher", "Fietzer", "Hylan", "Hydinger", "Illingsworth", "Ingram", "Irwin", "Jagtap", "Jenson", "Johnson", "Johnsen", "Jones", "Jurgenson", "Kalleg", "Kaskel", "Keller", "Leisinger", "LePage", "Lewis", "Linde", "Lulloff", "Maki", "Martin", "McGinnis", "Mills", "Moody", "Moore", "Napier", "Nelson", "Norquist", "Nuttle", "Olson", "Ostrander", "Reamer", "Reardon", "Reyes", "Rice", "Ripka", "Roberts", "Rogers", "Root", "Sandstrom", "Sawyer", "Schlicht", "Schmitt", "Schwager", "Schutz", "Schuster", "Tapia", "Thompson", "Tiernan", "Tisler"];
let userContacts;

async function initContact() {
    includeHTML();
    await loadUsers();
    await loadCurrentUser();
    userContacts = currentUser[`contacts`];
    showContactListe();
}

function createContacts() {
    let contacts = [];
    for (let i = 0; i < 20; i++) {
        let contact = generateRandomContact();
        contacts.push(contact);
    }
    contacts.sort((a, b) => a.name.localeCompare(b.name));
    setContactId(contacts);
    return contacts;
}

function setContactId(contacts) {
    contacts.forEach((contact, index) => {
        contact[`id`] = index;
    });
}

function generateRandomContact() {
    let firstName = generateFirstName();
    let lasttName = generateLastName();
    let contactName = `${firstName} ${lasttName}`;
    let contactEmail = `${firstName.toLowerCase()}${lasttName.toLowerCase()}@gmail.com`;
    let contactPhone = generateRandomPhone();
    let contactColor = getRandomRGBColor();
    let contactInitials = getInitials(contactName);
    let contact = {
        name: contactName,
        email: contactEmail,
        phone: contactPhone,
        color: contactColor,
        initials: contactInitials
    }
    return contact;
}

function generateRandomPhone() {
    const phone = `+49 1${Math.floor(Math.random() * 100000000)}`;
    return phone;
}

function generateFirstName() {
    return firstNameArr[Math.floor(Math.random() * firstNameArr.length)];
}

function generateLastName() {
    return lastNameArr[Math.floor(Math.random() * lastNameArr.length)];
}

function showContactListe() {
    const contactList = document.getElementById("contactList");
    const letters = userContacts.map(contact => contact.name.charAt(0).toUpperCase());
    const uniqueLetters = [...new Set(letters)];
    uniqueLetters.forEach(letter => {
        const letterHTML = generateLetterHTML(letter);
        contactList.innerHTML += letterHTML;
        const filteredContacts = userContacts.filter(contact => contact.name.charAt(0).toUpperCase() === letter);
        filteredContacts.forEach(contact => {
            const contactHTML = generateContactHTML(contact);
            contactList.innerHTML += contactHTML;
        });
    });
}

function showChosenContact(contactId) {
    console.log(currentUser[`contacts`][contactId]);
    const infoContainer = document.getElementById("container-detailed-info");
    infoContainer.innerHTML = generateInfoContainerHtml(contactId);
    infoContainer.classList.add("animation-move-contact");
}