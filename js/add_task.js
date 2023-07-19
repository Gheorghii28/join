let task;
let taskColor;
let taskCategory;
let assignedPersons = [];
let taskPrio;
let subTasks = [];
let isAssignedOptionOpen = false;

/**

Asynchronous function that initializes the application.
Calls the functions 'includeHTML()', 'loadCurrentUser()', and 'initializeAddTaskForm()' in sequence.
*/
async function initAddTask() {
    await includeHTML();
    await loadUsers();
    await loadCurrentUser();
    initializeAddTaskForm();
}

/**

This function initializes the application by calling various other functions.
It is responsible for setting up the initial state and behavior of the application.
*/
function initializeAddTaskForm() {
    addContactsToAssignedList("assigned-option");
    selectCategoryOption();
    selectCategoryColor();
    selectAssigned("assigned-option");
    setMinDate("o-t-date-input");
}

function settaskPrioValue(event) {
    const buttons = document.querySelectorAll('.o-t-edit-priority-button');
    buttons.forEach(btn => btn.classList.remove('active'));
    modifyClassById("add", "d-none", ["prio-wrong"]);
    event.currentTarget.classList.add("active");
    const priority = event.currentTarget.getAttribute("data-priority");
    taskPrio = priority;
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
    if (isAssignedOptionOpen && assignedPersons.length > 0) {
        modifyClassById("remove", "d-none", ["task-assigned-div"]);
        showTaskAssigned();
    } else {
        modifyClassById("add", "d-none", ["task-assigned-div"]);
    }
    isAssignedOptionOpen = !isAssignedOptionOpen;
    modifyClassById("add", "d-none", ["assigned-wrong"]);
    modifyClassById("toggle", "d-none", ["assigned-option"]);
}

function showTaskAssigned() {
    document.getElementById("task-assigned-ul").innerHTML = "";
    assignedPersons.forEach(obj => {
        const initials = getInitials(obj.name);
        document.getElementById("task-assigned-ul").innerHTML += taskAssigned(initials, obj.color);
    });
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
        if (category.nodeName == "LI") {
            categoryBtnEvent(category, categoryInput, selectedColor);
        }
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
        modifyClassById("add", "d-none", ["category-wrong"]);
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

function filterAssignedPersons(array, personName) {
    return array.filter(obj => obj.name !== personName);
}


function selectAssigned(ulListeId) {
    const optionBtns = document.getElementById(ulListeId).childNodes;
    optionBtns.forEach(option => {
        if (option.attributes) {
            let isChecked;
            option.addEventListener("click", event => {
                event.preventDefault();
                isChecked = JSON.parse(`${option.getAttribute("data-custom-status")}`);
                const contactId = parseInt(event.target.attributes[0].value);
                const contatIndex = getContactIndex(contactId, currentUser);
                const assignedPerson = currentUser[`contacts`][contatIndex];
                if (contactId >= 0) {
                    isChecked = !isChecked;
                    option.setAttribute("data-custom-status", `${isChecked}`);
                    saveAssignedOption(isChecked, event, assignedPerson);
                } else {
                    openUserInviteField();
                    isAssignedOptionOpen = !isAssignedOptionOpen;
                }
            });
        }
    });
}

function saveAssignedOption(isChecked, event, assignedPerson) {
    const imgUnchecked = event.target.children[1].children[0].children[0];
    const imgChecked = event.target.children[1].children[0].children[1];
    imgUnchecked.classList.toggle("d-none");
    imgChecked.classList.toggle("d-none");
    assignedPersons = filterAssignedPersons(assignedPersons, assignedPerson.name);
    if (isChecked) {
        assignedPersons.push(assignedPerson);
    }
}

function openUserInviteField() {
    modifyClassById("add", "d-none", ["selected-assigned-div", "assigned-option"]);
    modifyClassById("remove", "d-none", ["user-invite-div"]);
    document.getElementById("user-invite-input").focus();
}

function closeUserInviteField() {
    modifyClassById("add", "d-none", ["user-invite-div"]);
    modifyClassById("remove", "d-none", ["selected-assigned-div"]);
    modifyClassById("remove", "d-none", ["task-assigned-div"]);
}

function confirmUserInvite() {
    closeUserInviteField();
    clearInputValues(["user-invite-input"]);
    modifyClassById("remove", "d-none", ["task-assigned-div"]);
}

function showBtns(event) {
    if (event.target.value.length > 0) {
        modifyClassById("remove", "d-none", ["btn-cancel-subtask", "img-separate-line", "btn-confirm-subtask"]);
        modifyClassById("add", "d-none", ["plus-subtask"]);
    } else if (event.target.value.length == 0) {
        modifyClassById("add", "d-none", ["btn-cancel-subtask", "img-separate-line", "btn-confirm-subtask"]);
        modifyClassById("remove", "d-none", ["plus-subtask"]);
    }
}

function subTaskInputFocus() {
    document.getElementById("subtask-input").focus();
}

function showSubTask() {
    saveSubTask();
    document.getElementById("subtask-ul").innerHTML = "";
    subTasks.forEach((subTask, index) => {
        document.getElementById("subtask-ul").innerHTML += subTaskAssigned(subTask, index);
    });
}

function saveSubTask() {
    let subTask = document.getElementById("subtask-input").value;
    if (subTask.length > 0) {
        addUniqueElement(subTasks, subTask);
    }
    clearInputValues(["subtask-input"]);
}

function cancelInputSubTask() {
    clearInputValues(["subtask-input"]);
    document.getElementById("subtask-input").blur();
    modifyClassById("add", "d-none", ["btn-cancel-subtask", "img-separate-line", "btn-confirm-subtask"]);
    modifyClassById("remove", "d-none", ["plus-subtask"]);
}


function filterSubTasks(array, subTask) {
    return array.filter(el => el !== subTask);
}

function removeSubTask(subTask, index) {
    subTasks = filterSubTasks(subTasks, subTask);
    modifyClassById("add", "d-none", [`img-valid-${index}`]);
    modifyClassById("remove", "d-none", [`img-default-${index}`]);
}

function addSubtask(subTask, index) {
    subTasks.push(subTask);
    modifyClassById("remove", "d-none", [`img-valid-${index}`]);
    modifyClassById("add", "d-none", [`img-default-${index}`]);
}

function resetInputCategory() {
    taskCategory = undefined;
    taskColor = undefined;
    document.getElementById("selected-category-input").placeholder = "Select task category";
    modifyClassById("add", "d-none", ["new-category-div", "category-option", "category-color-div", "selected-category-color"]);
    modifyClassById("remove", "d-none", ["selected-category-div"]);
}

function resetInputAssigned() {
    assignedPersons = [];
    isAssignedOptionOpen = false;
    document.getElementById("selected-assigned-input").placeholder = "Select contacts to assign";
    modifyClassById("add", "d-none", ["user-invite-div", "assigned-option", "task-assigned-div"]);
    modifyClassById("remove", "d-none", ["selected-assigned-div"]);
    const uncheckedImg = document.getElementById("assigned-option").querySelectorAll(".image-1");
    const checkedImg = document.getElementById("assigned-option").querySelectorAll(".image-2");
    uncheckedImg.forEach(img => img.classList.remove("d-none"));
    checkedImg.forEach(img => img.classList.add("d-none"));
    const assignedListe = document.getElementById("assigned-option").childNodes;
    assignedListe.forEach(option => {
        if (option.attributes) {
            option.setAttribute("data-custom-status", `${false}`);
        }
    });
}

function resetTaskPrio() {
    taskPrio = undefined;
    const prioBtns = document.querySelectorAll(".o-t-edit-priority-button");
    prioBtns.forEach(btn => {
        btn.classList.remove("active");
    });
}

function resetSubTask() {
    subTasks = [];
    document.getElementById("subtask-ul").innerHTML = "";
    cancelInputSubTask();
}

function clearTaskForm() {
    clearInputValues(["o-t-input-title", "o-t-textarea-description", "o-t-date-input"]);
    resetInputCategory();
    resetInputAssigned();
    resetTaskPrio();
    resetSubTask();
}

async function saveTask() {
    let title = document.getElementById("o-t-input-title").value;
    let description = document.getElementById("o-t-textarea-description").value;
    let date = document.getElementById("o-t-date-input").value;
    if (checkTaskField()) {
        task = newTask(title, description, date);
        await addNewTask();
    } else {
        showWrong();
    }
}

function checkTaskField() {
    return taskCategory && taskPrio && assignedPersons.length > 0;
}

async function addNewTask() {
    await updateAddedTaskCurrentUser(task, currentUser);
    await updateCurrentUserFromUsers(users, currentUser);
    modifyClassById("remove", "d-none", ["pop-up-added-task"]);
    modifyClassById("add", "animation-added-task", ["pop-up-added-task"]);
    setTimeout(() => {
        modifyClassById("add", "d-none", ["pop-up-added-task"]);
        window.location.href = "board.html";
        clearTaskForm();
    }, 900)
}

function showWrong() {
    if (!taskCategory) {
        modifyClassById("remove", "d-none", ["category-wrong"]);
        window.location.href = "#o-t-e-label";
    }
    if (!taskPrio) {
        modifyClassById("remove", "d-none", ["prio-wrong"]);
        window.location.href = "#o-t-edit-prio";
    }
    if (assignedPersons.length == 0) {
        modifyClassById("remove", "d-none", ["assigned-wrong"]);
        window.location.href = "#o-t-edit-assigned";
    }
}

function newTask(title, description, date) {
    return {
        assigned: assignedPersons,
        color: taskColor,
        category: taskCategory,
        date: date,
        description: description,
        prio: taskPrio,
        subTasks: subTasks,
        title: title,
        status: "to-do"
    };
}

function addContactsToAssignedList(listId) {
    const list = document.getElementById(listId);
    list.innerHTML = generateAssignedListHtml();
}