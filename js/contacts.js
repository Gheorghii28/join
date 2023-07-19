const firstNameArr = ["Adam", "Alex", "Aaron", "Ben", "Carl", "Dan", "David", "Edward", "Fred", "Frank", "George", "Hal", "Hank", "Ike", "John", "Jack", "Joe", "Larry", "Monte", "Matthew", "Mark", "Nathan", "Otto", "Paul", "Peter", "Roger", "Roger", "Steve", "Thomas", "Tim", "Ty", "Victor", "Walter"];
const lastNameArr = ["Anderson", "Ashwoon", "Aikin", "Bateman", "Bongard", "Bowers", "Boyd", "Cannon", "Cast", "Deitz", "Dewalt", "Ebner", "Frick", "Hancock", "Haworth", "Hesch", "Hoffman", "Kassing", "Knutson", "Lawless", "Lawicki", "Mccord", "McCormack", "Miller", "Myers", "Nugent", "Ortiz", "Orwig", "Ory", "Paiser", "Pak", "Pettigrew", "Quinn", "Quizoz", "Ramachandran", "Resnick", "Sagar", "Schickowski", "Schiebel", "Sellon", "Severson", "Shaffer", "Solberg", "Soloman", "Sonderling", "Soukup", "Soulis", "Stahl", "Sweeney", "Tandy", "Trebil", "Trusela", "Trussel", "Turco", "Uddin", "Uflan", "Ulrich", "Upson", "Vader", "Vail", "Valente", "Van Zandt", "Vanderpoel", "Ventotla", "Vogal", "Wagle", "Wagner", "Wakefield", "Weinstein", "Weiss", "Woo", "Yang", "Yates", "Yocum", "Zeaser", "Zeller", "Ziegler", "Bauer", "Baxster", "Casal", "Cataldi", "Caswell", "Celedon", "Chambers", "Chapman", "Christensen", "Darnell", "Davidson", "Davis", "DeLorenzo", "Dinkins", "Doran", "Dugelman", "Dugan", "Duffman", "Eastman", "Ferro", "Ferry", "Fletcher", "Fietzer", "Hylan", "Hydinger", "Illingsworth", "Ingram", "Irwin", "Jagtap", "Jenson", "Johnson", "Johnsen", "Jones", "Jurgenson", "Kalleg", "Kaskel", "Keller", "Leisinger", "LePage", "Lewis", "Linde", "Lulloff", "Maki", "Martin", "McGinnis", "Mills", "Moody", "Moore", "Napier", "Nelson", "Norquist", "Nuttle", "Olson", "Ostrander", "Reamer", "Reardon", "Reyes", "Rice", "Ripka", "Roberts", "Rogers", "Root", "Sandstrom", "Sawyer", "Schlicht", "Schmitt", "Schwager", "Schutz", "Schuster", "Tapia", "Thompson", "Tiernan", "Tisler"];
let userContacts;

async function initContact() {
    includeHTML();
    await loadUsers();
    await loadCurrentUser();
    showContactListe();
    initializeAddTaskForm();
}

function createContacts() {
    let contacts = [];
    for (let i = 0; i < 20; i++) {
        let contact = generateRandomContact();
        contacts.push(contact);
    }
    setContactId(contacts);
    return contacts;
}

function setContactId(contacts) {
    contacts.forEach((contact, index) => {
        contact[`id`] = index;
    });
}

function generateRandomContact() {
    const firstName = generateFirstName();
    const lasttName = generateLastName();
    const contactName = `${firstName} ${lasttName}`;
    const contactEmail = `${firstName.toLowerCase()}${lasttName.toLowerCase()}@gmail.com`;
    const contactPhone = generateRandomPhone();
    const contactColor = getRandomRGBColor();
    const contactInitials = getInitials(contactName);
    const contact = contactObj(contactName, contactEmail, contactPhone, contactColor, contactInitials);
    return contact;
}

function contactObj(contactName, contactEmail, contactPhone, contactColor, contactInitials) {
    return {
        name: contactName,
        email: contactEmail,
        phone: contactPhone,
        color: contactColor,
        initials: contactInitials
    }
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
    userContacts = currentUser[`contacts`];
    const contactList = document.getElementById("contactList");
    const letters = userContacts.map(contact => contact.name.charAt(0).toUpperCase());
    letters.sort((a, b) => a.localeCompare(b));
    const uniqueLetters = [...new Set(letters)];
    contactList.innerHTML = "";
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
    const infoContainer = document.getElementById("container-detailed-info");
    infoContainer.innerHTML = generateInfoContainerHtml(contactId);
    infoContainer.classList.add("animation-move-contact");
    setBgColorToChosedContact(contactId);
    modifyClassById("add", "none1000px", ["contacts-div"]);
    modifyClassById("remove", "flex1000px", ["contacts-div"]);
    modifyClassById("add", "none1000px", ["btn-new-contact"]);
    modifyClassById("remove", "flex1000px", ["btn-new-contact"]);

    modifyClassById("remove", "none1000px", ["btn-to-contact"]);
    modifyClassById("add", "flex1000px", ["btn-to-contact"]);
    modifyClassById("remove", "none1000px", ["contact-headline"]);
    modifyClassById("add", "flex1000px", ["contact-headline"]);
    modifyClassById("remove", "none1000px", ["container-detailed-info"]);
    modifyClassById("add", "flex1000px", ["container-detailed-info"]);
}

function setBgColorToChosedContact(contactId) {
    document.querySelectorAll(".contact").forEach(li => {
        li.classList.remove("bg-li");
        modifyClassById("add", "bg-li", [`contact-li-${contactId}`]);
    });
}

function openEditContactForm(contactId) {
    setContactValueToEditForm(contactId);
    showEditContactForm();
    setDataIdForm(contactId);
}

function setDataIdForm(contactId) {
    document.getElementById("edit-contact-form").setAttribute("data-id", contactId);
}

function setContactValueToEditForm(contactId) {
    const contactIndex = getContactIndex(contactId, currentUser);
    const contact = currentUser[`contacts`][contactIndex];
    setInputValue("edit-contact-name", contact[`name`]);
    setInputValue("edit-contact-email", contact[`email`]);
    setInputValue("edit-contact-phone", contact[`phone`]);
}

function closeEditContactForm() {
    clearInputValueFromEditContactForm();
    hideEditContactForm();
}

function clearInputValueFromEditContactForm() {
    clearInputValues(["edit-contact-name"]);
    clearInputValues(["edit-contact-email"]);
    clearInputValues(["edit-contact-phone"]);
}

function openAddContactForm() {
    showAddContactForm();
}

function closeAddContactForm() {
    clearInputValueFromAddContactForm();
    hideAddContactForm();
}

function clearInputValueFromAddContactForm() {
    clearInputValues(["add-contact-name"]);
    clearInputValues(["add-contact-email"]);
    clearInputValues(["add-contact-phone"]);
}

function addContact() {
    const newContact = createNewContact();
    setUniqueIdToNewContact(newContact)
    saveNewContact(newContact);
    showContactListe();
    closeAddContactForm();
    showChosenContact(newContact[`id`]);
    scrollToSelected(newContact[`id`]);
    setTimeout(() => {
        modifyClassById("remove", "d-none", ["contact-succes-created"]);
        modifyClassById("add", "animation-added-task", ["contact-succes-created"]);
        setTimeout(() => {
            modifyClassById("add", "d-none", ["contact-succes-created"]);
            modifyClassById("remove", "animation-added-task", ["contact-succes-created"]);
        }, 500);
    }, 500);
}

function createNewContact() {
    const contactName = getInputValue("add-contact-name");
    const contactEmail = getInputValue("add-contact-email");
    const contactPhone = getInputValue("add-contact-phone");
    const contactColor = getRandomRGBColor();
    const contactInitials = getInitials(contactName);
    const contact = contactObj(contactName, contactEmail, contactPhone, contactColor, contactInitials);
    return contact;
}

function setUniqueIdToNewContact(contact) {
    const userContacts = currentUser[`contacts`];
    const usedIds = new Set(userContacts.map(contact => contact[`id`]));
    const newIndex = 0;
    let newId = newIndex;
    while (usedIds.has(newId)) {
        newId++;
    }
    contact[`id`] = newId;
}

async function saveNewContact(newContact) {
    await updateAddedContactToCurrentUser(newContact, currentUser);
    await updateCurrentUserFromUsers(users, currentUser);
    await loadCurrentUser();
    await loadUsers();
}

function saveEditedContact() {
    const contactId = getContactId();
    const editedContact = newEditedContact(contactId);
    const contactIndex = getContactIndex(contactId, currentUser);
    currentUser[`contacts`][contactIndex] = editedContact;
    updateEditedContact();
    showContactListe();
    closeEditContactForm();
    showChosenContact(contactId);
}

async function updateEditedContact() {
    await updateCurrentUser(currentUser);
    await updateCurrentUserFromUsers(users, currentUser);
    await loadCurrentUser();
    await loadUsers();
}

function getContactId() {
    const contactId = document.getElementById("edit-contact-form").getAttribute("data-id");
    return parseInt(contactId);
}

function newEditedContact(contactId) {
    const contactName = getInputValue("edit-contact-name");
    const contactEmail = getInputValue("edit-contact-email");
    const contactPhone = getInputValue("edit-contact-phone");
    const contactInitials = getInitials(contactName);
    const contact = changeEditedContact(contactId, contactName, contactEmail, contactPhone, contactInitials);
    return contact;
}

function changeEditedContact(contactId, contactName, contactEmail, contactPhone, contactInitials) {
    const contactIndex = getContactIndex(contactId, currentUser);
    const contact = currentUser[`contacts`][contactIndex];
    contact[`name`] = contactName;
    contact[`email`] = contactEmail;
    contact[`phone`] = contactPhone;
    contact[`initials`] = contactInitials;
    return contact;
}

function deleteContact() {
    const contactId = getContactId();
    const contacts = currentUser[`contacts`];
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i][`id`] === contactId) {
            contacts.splice(i, 1);
            break;
        }
    }
    updateDeletedContacts();
    showContactListe();
    closeEditContactForm();
    document.getElementById("container-detailed-info").innerHTML = "";
}

async function updateDeletedContacts() {
    await updateCurrentUser(currentUser);
    await updateCurrentUserFromUsers(users, currentUser);
    await loadCurrentUser();
    await loadUsers();
}