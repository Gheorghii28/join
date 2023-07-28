/**
 * First names for contacts.
 */
const firstNameArr = ["Adam", "Alex", "Aaron", "Ben", "Carl", "Dan", "David", "Edward", "Fred", "Frank", "George", "Hal", "Hank", "Ike", "John", "Jack", "Joe", "Larry", "Monte", "Matthew", "Mark", "Nathan", "Otto", "Paul", "Peter", "Roger", "Roger", "Steve", "Thomas", "Tim", "Ty", "Victor", "Walter"];

/**
 * Last names for contacts.
 */
const lastNameArr = ["Anderson", "Ashwoon", "Aikin", "Bateman", "Bongard", "Bowers", "Boyd", "Cannon", "Cast", "Deitz", "Dewalt", "Ebner", "Frick", "Hancock", "Haworth", "Hesch", "Hoffman", "Kassing", "Knutson", "Lawless", "Lawicki", "Mccord", "McCormack", "Miller", "Myers", "Nugent", "Ortiz", "Orwig", "Ory", "Paiser", "Pak", "Pettigrew", "Quinn", "Quizoz", "Ramachandran", "Resnick", "Sagar", "Schickowski", "Schiebel", "Sellon", "Severson", "Shaffer", "Solberg", "Soloman", "Sonderling", "Soukup", "Soulis", "Stahl", "Sweeney", "Tandy", "Trebil", "Trusela", "Trussel", "Turco", "Uddin", "Uflan", "Ulrich", "Upson", "Vader", "Vail", "Valente", "Van Zandt", "Vanderpoel", "Ventotla", "Vogal", "Wagle", "Wagner", "Wakefield", "Weinstein", "Weiss", "Woo", "Yang", "Yates", "Yocum", "Zeaser", "Zeller", "Ziegler", "Bauer", "Baxster", "Casal", "Cataldi", "Caswell", "Celedon", "Chambers", "Chapman", "Christensen", "Darnell", "Davidson", "Davis", "DeLorenzo", "Dinkins", "Doran", "Dugelman", "Dugan", "Duffman", "Eastman", "Ferro", "Ferry", "Fletcher", "Fietzer", "Hylan", "Hydinger", "Illingsworth", "Ingram", "Irwin", "Jagtap", "Jenson", "Johnson", "Johnsen", "Jones", "Jurgenson", "Kalleg", "Kaskel", "Keller", "Leisinger", "LePage", "Lewis", "Linde", "Lulloff", "Maki", "Martin", "McGinnis", "Mills", "Moody", "Moore", "Napier", "Nelson", "Norquist", "Nuttle", "Olson", "Ostrander", "Reamer", "Reardon", "Reyes", "Rice", "Ripka", "Roberts", "Rogers", "Root", "Sandstrom", "Sawyer", "Schlicht", "Schmitt", "Schwager", "Schutz", "Schuster", "Tapia", "Thompson", "Tiernan", "Tisler"];

/**
 * An array to store user contacts.
 */
let userContacts;

/**
 * Initializes the contact page.
 */
async function initContact() {
    includeHTML();
    await loadUsers();
    await loadCurrentUser();
    showContactListe();
    initializeAddTaskForm();
}

/**
 * Creates a batch of random contacts.
 * @returns {Array} - An array of randomly generated contacts.
 */
function createContacts() {
    let contacts = [];
    for (let i = 0; i < 20; i++) {
        let contact = generateRandomContact();
        contacts.push(contact);
    }
    setContactId(contacts);
    return contacts;
}

/**
 * Sets unique IDs for each contact in the array.
 * @param {Array} contacts - The array of contacts to set IDs for.
 */
function setContactId(contacts) {
    contacts.forEach((contact, index) => {
        contact[`id`] = index;
    });
}

/**
 * Generates a random contact object.
 * @returns {Object} - A randomly generated contact object.
 */
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

/**
 * Creates a contact object.
 * @param {string} contactName - The name of the contact.
 * @param {string} contactEmail - The email of the contact.
 * @param {string} contactPhone - The phone number of the contact.
 * @param {string} contactColor - The color associated with the contact.
 * @param {string} contactInitials - The initials of the contact's name.
 * @returns {Object} - The contact object.
 */
function contactObj(contactName, contactEmail, contactPhone, contactColor, contactInitials) {
    return {
        name: contactName,
        email: contactEmail,
        phone: contactPhone,
        color: contactColor,
        initials: contactInitials
    }
}

/**
 * Generates a random phone number.
 * @returns {string} - A random phone number.
 */
function generateRandomPhone() {
    const phone = `+491${Math.floor(Math.random() * 100000000)}`;
    return phone;
}

/**
 * Generates a random first name.
 * @returns {string} - A random first name.
 */
function generateFirstName() {
    return firstNameArr[Math.floor(Math.random() * firstNameArr.length)];
}

/**
 * Generates a random last name.
 * @returns {string} - A random last name.
 */
function generateLastName() {
    return lastNameArr[Math.floor(Math.random() * lastNameArr.length)];
}

/**
 * Displays the contact list grouped by letters.
 */
function showContactListe() {
    userContacts = currentUser[`contacts`];
    const contactList = document.getElementById("contactList");
    const letters = getFirstLetters(userContacts);
    const uniqueLetters = getUniqueLetters(letters);
    clearContactList(contactList);
    uniqueLetters.forEach(letter => {
        const letterHTML = generateLetterHTML(letter);
        appendToContactList(contactList, letterHTML);
        const filteredContacts = filterContactsByLetter(userContacts, letter);
        filteredContacts.forEach(contact => {
            const contactHTML = generateContactHTML(contact);
            appendToContactList(contactList, contactHTML);
        });
    });
}

/**
 * Appends the HTML content to the contact list element.
 * @param {HTMLElement} contactList - The element to which HTML content will be appended.
 * @param {string} content - The HTML content to be appended.
 */
function appendToContactList(contactList, content) {
    contactList.innerHTML += content;
}

/**
 * Clears the content of the contact list element.
 * @param {HTMLElement} contactList - The element to be cleared.
 */
function clearContactList(contactList) {
    contactList.innerHTML = "";
}

/**
 * Filters out duplicate letters from the array.
 * @param {Array} letters - The array containing letters.
 * @returns {Array} - An array with unique letters.
 */
function getUniqueLetters(letters) {
    return [...new Set(letters)].sort((a, b) => a.localeCompare(b));
}

/**
 * Extracts the first letters of contact names and converts them to uppercase.
 * @param {Array} contacts - The array of contacts to extract first letters from.
 * @returns {Array} - An array containing the first letters of contacts in uppercase.
 */
function getFirstLetters(contacts) {
    return contacts.map(contact => contact.name.charAt(0).toUpperCase());
}

/**
 * Filters the contacts based on the given starting letter.
 * @param {Array} contacts - The array of contacts to be filtered.
 * @param {string} letter - The letter to filter contacts by.
 * @returns {Array} - The filtered contacts array.
 */
function filterContactsByLetter(contacts, letter) {
    return contacts.filter(contact => contact.name.charAt(0).toUpperCase() === letter);
}

/**
 * Shows the details of a chosen contact.
 * @param {number} contactId - The ID of the chosen contact.
 */
function showChosenContact(contactId) {
    const infoContainer = document.getElementById("container-detailed-info");
    infoContainer.innerHTML = generateInfoContainerHtml(contactId);
    infoContainer.classList.add("animation-move-contact");
    setBgColorToChosedContact(contactId);
    toggleContactView();
}

/**
 * Function to set the background color of the chosen contact and its related list item.
 * It sets the background color of the specified element with ID "contact-initials"
 * to the color of the contact with the provided contactId from the currentUser's contacts.
 * Additionally, it removes the "bg-li" class from all ".contact" list items and adds the "bg-li" class
 * to the list item with the class "contact-li-{contactId}" to highlight the chosen contact in the list.
 * @param {number} contactId - The ID of the chosen contact.
 */
function setBgColorToChosedContact(contactId) {
    setContactColorToElement(contactId, "contact-initials", currentUser);
    document.querySelectorAll(".contact").forEach(li => {
        li.classList.remove("bg-li");
        modifyClassById("add", "bg-li", [`contact-li-${contactId}`]);
    });
}

/**
 * Function to open the edit contact form and pre-fill it with the details of the specified contact.
 * It sets the background color of the element with ID "user-bg" to the color of the contact
 * with the provided contactId from the currentUser's contacts.
 * Then, it pre-fills the edit contact form fields with the details of the chosen contact using
 * the setContactValueToEditForm function.
 * After that, it displays the edit contact form by calling the showEditContactForm function.
 * Finally, it sets the data-id attribute of the edit contact form to the provided contactId
 * using the setDataIdForm function.
 * @param {number} contactId - The ID of the contact to be edited.
 */
function openEditContactForm(contactId) {
    setContactColorToElement(contactId, "user-bg", currentUser);
    setContactValueToEditForm(contactId);
    showEditContactForm();
    setDataIdForm(contactId);
}

/**
 * Sets the data-id attribute for the edit contact form.
 * @param {number} contactId - The ID of the selected contact.
 */
function setDataIdForm(contactId) {
    document.getElementById("edit-contact-form").setAttribute("data-id", contactId);
}

/**
 * Sets the values of the selected contact to the edit contact form.
 * @param {number} contactId - The ID of the selected contact.
 */
function setContactValueToEditForm(contactId) {
    const contactIndex = getContactIndex(contactId, currentUser);
    const contact = currentUser[`contacts`][contactIndex];
    const phoneNumber = convertPhoneNumber(contact[`phone`]);
    setInputValue("edit-contact-name", contact[`name`]);
    setInputValue("edit-contact-email", contact[`email`]);
    setInputValue("edit-contact-phone", phoneNumber);
    document.getElementById("c-initials").innerHTML = contact[`initials`];
}

/**
 * Closes the edit contact form.
 */
function closeEditContactForm() {
    clearInputValueFromEditContactForm();
    hideEditContactForm();
}

/**
 * Clears input values from the edit contact form.
 */
function clearInputValueFromEditContactForm() {
    clearInputValues(["edit-contact-name"]);
    clearInputValues(["edit-contact-email"]);
    clearInputValues(["edit-contact-phone"]);
}

/**
 * Opens the add contact form.
 */
function openAddContactForm() {
    showAddContactForm();
}

/**
 * Closes the add contact form.
 */
function closeAddContactForm() {
    clearInputValueFromAddContactForm();
    hideAddContactForm();
}

/**
 * Clears input values from the add contact form.
 */
function clearInputValueFromAddContactForm() {
    clearInputValues(["add-contact-name"]);
    clearInputValues(["add-contact-email"]);
    clearInputValues(["add-contact-phone"]);
}

/**
 * Adds a new contact to the user's contacts.
 * Creates a new contact object, sets a unique ID, saves it, and updates the contact list.
 * Also, shows a success message and scrolls to the newly added contact.
 */
function addContact() {
    const newContact = createNewContact();
    setUniqueIdToNewContact(newContact)
    saveNewContact(newContact);
    showContactListe();
    closeAddContactForm();
    showChosenContact(newContact[`id`]);
    scrollToSelected(newContact[`id`]);
    showContactSuccessMessage();
}

/**
 * Creates a new contact object with details entered in the add contact form.
 * @returns {Object} - The newly created contact object.
 */
function createNewContact() {
    const contactName = getInputValue("add-contact-name");
    const contactEmail = getInputValue("add-contact-email");
    const contactPhone = getConvertedInputValue("add-contact-phone");
    const contactColor = getRandomRGBColor();
    const contactInitials = getInitials(contactName);
    const contact = contactObj(contactName, contactEmail, contactPhone, contactColor, contactInitials);
    return contact;
}

/**
 * Sets a unique ID for the new contact.
 * @param {Object} contact - The contact object to set the ID for.
 */
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

/**
 * Saves the new contact to the current user's contacts.
 * @param {Object} newContact - The new contact object to be saved.
 */
async function saveNewContact(newContact) {
    await updateAddedContactToCurrentUser(newContact, currentUser);
    await updateCurrentUserFromUsers(users, currentUser);
    await loadCurrentUser();
    await loadUsers();
}

/**
 * Saves the edited contact details.
 */
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

/**
 * Updates the edited contact details for the current user.
 */
async function updateEditedContact() {
    await updateCurrentUser(currentUser);
    await updateCurrentUserFromUsers(users, currentUser);
    await loadCurrentUser();
    await loadUsers();
}

/**
 * Retrieves the contact ID from the edit contact form.
 * @returns {number} - The contact ID.
 */
function getContactId() {
    const contactId = document.getElementById("edit-contact-form").getAttribute("data-id");
    return parseInt(contactId);
}

/**
 * Creates a new contact object with edited details.
 * @param {number} contactId - The ID of the edited contact.
 * @returns {Object} - The new contact object with edited details.
 */
function newEditedContact(contactId) {
    const contactName = getInputValue("edit-contact-name");
    const contactEmail = getInputValue("edit-contact-email");
    const contactPhone = getConvertedInputValue("edit-contact-phone");
    const contactInitials = getInitials(contactName);
    const contact = changeEditedContact(contactId, contactName, contactEmail, contactPhone, contactInitials);
    return contact;
}

/**
 * Changes the details of the edited contact object.
 * @param {number} contactId - The ID of the edited contact.
 * @param {string} contactName - The edited name of the contact.
 * @param {string} contactEmail - The edited email of the contact.
 * @param {string} contactPhone - The edited phone number of the contact.
 * @param {string} contactInitials - The edited initials of the contact's name.
 * @returns {Object} - The contact object with edited details.
 */
function changeEditedContact(contactId, contactName, contactEmail, contactPhone, contactInitials) {
    const contactIndex = getContactIndex(contactId, currentUser);
    const contact = currentUser[`contacts`][contactIndex];
    contact[`name`] = contactName;
    contact[`email`] = contactEmail;
    contact[`phone`] = contactPhone;
    contact[`initials`] = contactInitials;
    return contact;
}

/**
 * Deletes the chosen contact.
 */
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

/**
 * Updates the current user's contacts after deleting a contact.
 */
async function updateDeletedContacts() {
    await updateCurrentUser(currentUser);
    await updateCurrentUserFromUsers(users, currentUser);
    await loadCurrentUser();
    await loadUsers();
}