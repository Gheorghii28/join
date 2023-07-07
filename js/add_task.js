/**

This variable stores the color of a task.
*/
let taskColor;

/**

This variable stores the category of a task.
*/
let taskCategory;

/**

Asynchronous function that initializes the application.
Calls the functions 'includeHTML()', 'loadCurrentUser()', and 'initializePage()' in sequence.
*/
async function init() {
    await includeHTML();
    await loadCurrentUser();
    initializePage();
}

/**

This function initializes the application by calling various other functions.
It is responsible for setting up the initial state and behavior of the application.
*/
function initializePage() {
    handlePriorityButtonClick();
    selectCategoryOption();
    selectCategoryColor();
    setMinDate();
}

/**

This function sets the minimum date for a date input element.
It retrieves the date input element by its ID, then creates a new Date object representing the current date.
The current date is formatted as a string in ISO 8601 format (yyyy-mm-dd) and assigned to the 'min' attribute of the date input element.
*/
function setMinDate() {
    const dateInput = document.getElementById('o-t-date-input');
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    dateInput.setAttribute('min', formattedDate);
}

/**

This function handles the click event for priority buttons.
It selects all elements with the class '.o-t-edit-priority-button' and adds a click event listener to each button.
When a button is clicked, it removes the 'active' class from all buttons and adds the 'active' class to the clicked button.
*/
function handlePriorityButtonClick() {
    const buttons = document.querySelectorAll('.o-t-edit-priority-button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const priority = button.getAttribute('data-priority');
            console.log(`Aktiver Button: ${priority}`);
        });
    });
}

/**

This function toggles the visibility of a category option by modifying the CSS classes of the element.
@param {Event} event - The event object triggered by the action.
It prevents the default behavior of the event.
The function then calls the 'modifyClassById' function to toggle the 'd-none' class on the element with the ID 'toggle',
effectively hiding or showing the category option depending on its current state.
*/
function toggleCategoryHidden(event) {
    event.preventDefault();
    modifyClassById("toggle", "d-none", ["category-option"]);
}

/**

This function toggles the visibility of an assigned option by modifying the CSS classes of the element.
@param {Event} event - The event object triggered by the action.
It prevents the default behavior of the event.
The function then calls the 'modifyClassById' function to toggle the 'd-none' class on the element with the ID 'toggle',
effectively hiding or showing the assigned option depending on its current state.
*/
function toggleAssignedHidden(event) {
    event.preventDefault();
    modifyClassById("toggle", "d-none", ["assigned-option"]);
}

/**

Function that selects a category option.
Retrieves the necessary elements by their IDs and attaches a click event listener to each category option.
When a category option is clicked, it performs the necessary actions based on the selected category.
*/
function selectCategoryOption() {
    const selectedColor = document.getElementById("selected-category-color");
    const categoryInput = document.getElementById("selected-category-input");
    const categorys = document.getElementById("category-option").childNodes;
    categorys.forEach(category => {
        categoryBtnEvent(category, categoryInput, selectedColor);
    });
}

/**

Event handler for category buttons.
Adds a click event listener to a category button.
Performs actions based on the selected category, such as opening a new category field or setting the task category.
*/
function categoryBtnEvent(category, categoryInput, selectedColor) {
    category.addEventListener('click', () => {
        const selectedCategory = category.getAttribute('data-value');
        const categoryColor = category.getAttribute("data-color");
        if (selectedCategory == "New Category") {
            openFieldNewCategory();
        } else {
            setTaskCategory(categoryInput, selectedCategory, categoryColor, selectedColor);
        }
    });
}

/**

Function that opens the field for creating a new category.
Sets the task color and category to undefined and modifies the CSS classes of the elements accordingly.
*/
function openFieldNewCategory() {
    taskColor = undefined;
    taskCategory = undefined;
    modifyClassById("remove", "d-none", ["new-category-div"]);
    modifyClassById("add", "d-none", ["selected-category-div", "category-option"]);
    clearInputValues(["new-category-input"]);
    document.getElementById("new-category-input").focus();
}

/**

Function that sets the task category based on the selected category.
@param {HTMLElement} categoryInput - The input element for the selected category.
@param {string} selectedCategory - The selected category value.
@param {string} categoryColor - The category color value.
@param {HTMLElement} selectedColor - The element for the selected category color.
*/
function setTaskCategory(categoryInput, selectedCategory, categoryColor, selectedColor) {
    categoryInput.placeholder = selectedCategory;
    taskCategory = selectedCategory;
    taskColor = `rgb(${categoryColor})`;
    modifyClassById("remove", "d-none", ["selected-category-color"]);
    modifyClassById("toggle", "d-none", ["category-option"]);
    modifyClassById("add", "d-none", ["category-wrong"]);
    selectedColor.style.backgroundColor = taskColor;
}

/**

Function that handles the selection of a category color.
Retrieves the necessary elements by their IDs and attaches a click event listener to each color option.
When a color option is clicked, it retrieves the selected color value and assigns it to the 'taskColor' variable.
*/
function selectCategoryColor() {
    const selectColor = document.getElementById("selected-category-color");
    const optionsColor = document.getElementById("category-color-div").children[0].childNodes;
    optionsColor.forEach(option => {
        option.addEventListener('click', () => {
            deleteClassSelected();
            option.children[0].classList.add("selected-color");
            const selectedColor = option.children[0].getAttribute('data-color');
            taskColor = `rgb(${selectedColor})`;
        });
    });
}

/**

Function that removes the "selected-color" class from color options in the category color div.
It selects the color options within the category color div and iterates over each option.
If an option has children (indicating it contains the color element), it removes the "selected-color" class from the color element.
*/
function deleteClassSelected() {
    const optionsColor = document.getElementById("category-color-div").children[0].childNodes;
    optionsColor.forEach(o => { if (o.children) o.children[0].classList.remove("selected-color") });
}

/**

Function that closes the category selection.
Modifies the necessary elements' properties and CSS classes to hide the category selection.
Resets the 'taskCategory' and 'taskColor' variables.
*/
function closeSelectCatergory() {
    const selectInput = document.getElementById("selected-category-input");
    selectInput.placeholder = "Select task category";
    taskCategory = undefined;
    taskColor = undefined;
    deleteClassSelected();
    modifyClassById("add", "d-none", ["selected-category-color"]);
    modifyClassById("add", "d-none", ["new-category-div"]);
    modifyClassById("remove", "d-none", ["selected-category-div"]);
    modifyClassById("add", "d-none", ["category-color-div"]);
}

/**

Function that confirms the creation of a new category.
Retrieves the necessary input values and elements.
Calls the 'createNewCategory' function if a new category name is entered,
otherwise calls the 'showCategoryWrong' function to display an "This field is required".
*/
function confirmCreateCategory() {
    const selectInput = document.getElementById("selected-category-input");
    const selectColor = document.getElementById("selected-category-color");
    const newCategory = document.getElementById("new-category-input").value;
    deleteClassSelected();
    if (newCategory.length > 0) {
        createNewCategory(selectInput, newCategory, selectColor);
    } else if (newCategory.length == 0) {
        showCategoryWrong();
    }
}

/**

Function that creates a new category.
Updates the selected category input placeholder and assigns the new category value to the 'taskCategory' variable.
Modifies the necessary elements' CSS classes to show the newly selected category.
Sets the 'taskColor' variable to a random RGB color if it is not already defined.
Updates the background color of the selected color element.
@param {HTMLElement} selectInput - The input element for the selected category.
@param {string} newCategory - The new category value.
@param {HTMLElement} selectColor - The color element for the selected category.
*/
function createNewCategory(selectInput, newCategory, selectColor) {
    selectInput.placeholder = newCategory;
    taskCategory = newCategory;
    modifyClassById("add", "d-none", ["new-category-div"]);
    modifyClassById("add", "d-none", ["category-color-div"]);
    modifyClassById("remove", "d-none", ["selected-category-div"]);
    modifyClassById("remove", "d-none", ["selected-category-color"]);
    modifyClassById("add", "d-none", ["category-wrong"]);
    if (!taskColor) taskColor = getRandomRGBColor();
    selectColor.style.backgroundColor = taskColor;
}

/**

Function that shows an "This field is required" when a category is not selected.
Resets the 'taskCategory' and 'taskColor' variables and displays the category "This field is required" message.
*/
function showCategoryWrong() {
    taskCategory = undefined;
    taskColor = undefined;
    modifyClassById("remove", "d-none", ["category-wrong"]);
}

/**

Function that shows the category color options based on the input value.
If the input value has a length greater than 0, the category color options are shown.
Otherwise, the category color options are hidden.
*/
function showCategoryColor(event) {
    if (event.target.value.length > 0) {
        modifyClassById("remove", "d-none", ["category-color-div"]);
    } else if (event.target.value.length == 0) {
        modifyClassById("add", "d-none", ["category-color-div"]);
    }
}