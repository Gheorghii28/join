/**
 * Global variables to keep track of the currently dragged element, loading state, and task-related information.
 */
let currentDraggedElement;
let isLoading = false;
let taskAssignedName;
const allStatus = [
    "to-do",
    "in-progress",
    "awaiting-feedback",
    "done"
];

/**
 * Initializes the board view.
 * Includes HTML templates, loads user data, loads the current user, updates the board HTML, and initializes task-related functionality.
 */
async function initBoard() {
    await includeHTML();
    await loadUsers();
    await loadCurrentUser();
    updateHTML();
    initializeEditTask();
    initializeAddTaskForm();
}

/**
 * Updates the board view HTML with tasks in different statuses.
 */
function updateHTML() {
    setTaskId();
    updateTasks("to-do");
    updateTasks("in-progress");
    updateTasks("awaiting-feedback");
    updateTasks("done");
}

/**
 * Initializes the functionality for editing tasks.
 */
function initializeEditTask() {
    addContactsToAssignedList("assigned-edit-option");
    selectAssigned("assigned-edit-option");
    setMinDate("o-t-edit-date-input");
}

/**
 * Updates the tasks in a specific status section of the board view HTML.
 * @param {string} taskStatus - The status of the tasks to be updated.
 */
function updateTasks(taskStatus) {
    let tasks = currentUser[`tasks`].filter(t => t['status'] == `${taskStatus}`);
    const taskContainer = document.getElementById(`${taskStatus}`);
    taskContainer.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        taskContainer.innerHTML += generateTaskHTML(task);
    }
    taskContainer.innerHTML += generateEmtptySpaceForTask(taskStatus);
}

/**
 * Sets unique task IDs for tasks in the current user's data.
 */
function setTaskId() {
    let tasks = currentUser[`tasks`];
    tasks.forEach((task, index) => {
        task[`id`] = index;
    });
}

/**
 * Starts the dragging process for a task when it is dragged.
 * @param {Event} event - The drag event.
 * @param {number} id - The ID of the dragged task.
 */
function startDragging(event, id) {
    currentDraggedElement = id;
    showEmptyBoxs();
}

/**
 * Shows empty drop areas for task dragging.
 */
function showEmptyBoxs() {
    const emptyBoxs = document.querySelectorAll(".empty-space-task");
    emptyBoxs.forEach(box => box.classList.remove("d-none"));
}

/**
 * Moves a task to a new status section.
 * @param {string} taskStatus - The status section to move the task to.
 */
function moveTo(taskStatus) {
    const tasks = currentUser[`tasks`];
    tasks[currentDraggedElement]['status'] = taskStatus;
    updateEditedTasks();
    updateHTML();
}


/**
 * Allows dropping of dragged elements.
 * @param {Event} ev - The dragover event.
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * Adds highlighting when dragging over a drop area.
 * @param {Event} event - The dragenter event.
 */
function highlight(event) {
    event.target.classList.add("drag-area-highlight");
}

/**
 * Removes highlighting when dragging out of a drop area.
 * @param {Event} event - The dragleave event.
 */
function removeHighlight(event) {
    event.target.classList.remove("drag-area-highlight");
}

/**
 * Handles the task event when a task is clicked or dragged to a new status section.
 * @param {Event} event - The click or drag event.
 * @param {number} taskId - The ID of the task.
 */
function taskEvent(event, taskId) {
    if (checkDragCondition(event, "top")) {
        currentDraggedElement = taskId;
        const newTaskStatus = newStatusOfTopTask(event);
        moveTo(newTaskStatus);
    } else if (checkDragCondition(event, "bottom")) {
        currentDraggedElement = taskId;
        const newTaskStatus = newStatusOfBottomTask(event);
        moveTo(newTaskStatus);
    } else {
        openTask(taskId);
    }
}

/**
 * Calculates the new status of a task when dragged to the top of a status section.
 * @param {Event} event - The drag event.
 * @returns {string} - The new status of the task.
 */
function newStatusOfTopTask(event) {
    const taskStatus = event.target.getAttribute("data-status");
    let positionOfTask = allStatus.indexOf(`${taskStatus}`);
    if (positionOfTask == 0) {
        positionOfTask = 4;
    }
    const newTaskStatus = allStatus[positionOfTask - 1];
    return newTaskStatus;
}

/**
 * Calculates the new status of a task when dragged to the bottom of a status section.
 * @param {Event} event - The drag event.
 * @returns {string} - The new status of the task.
 */
function newStatusOfBottomTask(event) {
    const taskStatus = event.target.getAttribute("data-status");
    let positionOfTask = allStatus.indexOf(`${taskStatus}`);
    if (positionOfTask == 3) {
        positionOfTask = -1;
    }
    const newTaskStatus = allStatus[positionOfTask + 1];
    return newTaskStatus;
}

/**
 * Checks if the drag condition is met for a task to be dragged.
 * @param {Event} event - The drag event.
 * @param {string} direction - The direction of the drag (top or bottom).
 * @returns {boolean} - True if the drag condition is met, false otherwise.
 */
function checkDragCondition(event, direction) {
    return event.target.nodeName == "IMG" && event.target.getAttribute("data-direction") == direction;
}

/**
 * Opens the details of a task when clicked on.
 * @param {number} taskId - The ID of the task to open.
 */
function openTask(taskId) {
    const task = currentUser[`tasks`].find(task => task.id === taskId);
    modifyClassById("remove", "d-none", ["opened-task-container", "opened-task"]);
    document.getElementById("opened-task").innerHTML = generateOpenedTaskHtml(task);
    taskPrio = task[`prio`];
}

/**
 * Closes the details of the currently opened task.
 */
async function closeOpenedTask() {
    await updateCurrentUser(currentUser);
    await updateCurrentUserFromUsers(users, currentUser);
    await loadCurrentUser();
    await loadUsers();
    updateHTML();
    modifyClassById("add", "d-none", ["opened-task-container", "opened-task", "opened-task-edit"]);
}

/**
 * Deletes a task from the current user's tasks.
 * @param {number} taskId - The ID of the task to be deleted.
 */
async function deleteTask(taskId) {
    if (!isLoading) {
        isLoading = true;
        await updateRemovedTaskCurrentUser(taskId);
        closeOpenedTask();
        isLoading = false;
    }
}

/**
 * Updates the current user's tasks after removing a task.
 * @param {number} taskId - The ID of the task to be removed.
 */
async function updateRemovedTaskCurrentUser(taskId) {
    const tasks = currentUser[`tasks`];
    tasks.splice(taskId, 1);
    currentUser[`tasks`] = tasks;
    await setItem('currentUser', JSON.stringify(currentUser));
}

/**
 * Opens the edit task form for a task.
 * @param {number} taskId - The ID of the task to be edited.
 */
function openEditTask(taskId) {
    modifyClassById("add", "d-none", ["opened-task"]);
    modifyClassById("remove", "d-none", ["opened-task-edit"]);
    setFormData(taskId);
    setTaskInputsValue(taskId);
    setPrioBtn(taskId);
    setTaskAssigned(taskId);
    setDataCustomStatus(taskId);
    setSubtasks(taskId);
}

/**
 * Sets the subtasks for the task being edited.
 * @param {number} taskId - The ID of the task being edited.
 */
function setSubtasks(taskId) {
    subTasks = currentUser[`tasks`][taskId][`subTasks`];
}

/**
 * Sets the form data attribute for the edit task form with the provided task ID.
 * @param {number} taskId - The ID of the task being edited.
 */
function setFormData(taskId) {
    document.getElementById("form-edit-task").setAttribute("data-id", `${taskId}`);
}

/**
 * Toggles the visibility of the assigned contacts dropdown in the edit task form.
 * @param {Event} event - The click event triggering the function.
 */
function toggleEditAssignedHidden(event) {
    event.preventDefault();
    if (isAssignedOptionOpen && assignedPersons.length !== 0) {
        showTaskEditAssigned();
    } else {
    }
    isAssignedOptionOpen = !isAssignedOptionOpen;
    modifyClassById("add", "d-none", ["assigned-edit-wrong"]);
    modifyClassById("toggle", "d-none", ["assigned-edit-option"]);
}

/**
 * Shows the assigned contacts in the edit task form.
 */
function showTaskEditAssigned() {
    document.getElementById("task-assigned-edit-ul").innerHTML = "";
    document.getElementById("task-assigned-edit-ul").innerHTML += generateAssignedHtml(assignedPersons);
}

/**
 * Sets the inputs value for the edit task form with the provided task ID.
 * @param {number} taskId - The ID of the task being edited.
 */
function setTaskInputsValue(taskId) {
    const title = currentUser[`tasks`][taskId][`title`];
    const description = currentUser[`tasks`][taskId][`description`];
    const date = currentUser[`tasks`][taskId][`date`];
    setInputValue("o-t-input-edit-title", title);
    setInputValue("o-t-textarea-edit-description", description);
    setInputValue("o-t-edit-date-input", date);
}


/**
 * Sets the priority button for the edit task form with the provided task ID.
 * @param {number} taskId - The ID of the task being edited.
 */
function setPrioBtn(taskId) {
    let btns = document.querySelectorAll('[data-priority]');
    btns.forEach(btn => {
        const attributValue = btn.getAttribute("data-priority");
        const taskPrio = currentUser[`tasks`][taskId][`prio`];
        btn.classList.remove("active");
        if (attributValue == taskPrio) {
            btn.classList.add("active");
        }
    });
}

/**
 * Sets the assigned contacts for the edit task form with the provided task ID.
 * @param {number} taskId - The ID of the task being edited.
 */
function setTaskAssigned(taskId) {
    const assigneds = currentUser[`tasks`][taskId][`assigned`];
    document.getElementById("task-assigned-edit-ul").innerHTML = generateAssignedHtml(assigneds);
    assignedPersons = assigneds;
}

/**
 * Sets the data custom status for the edit task form with the provided task ID.
 * @param {number} taskId - The ID of the task being edited.
 */
function setDataCustomStatus(taskId) {
    let userContacts = [];
    taskAssignedName = [];
    const assignedListe = document.getElementById("assigned-edit-option").childNodes;
    const assignedContacts = currentUser[`tasks`][taskId][`assigned`];
    userContactsFilter(assignedListe, userContacts);
    changeDataStatus(userContacts, assignedContacts, taskAssignedName);

}

/**
 * Filters user contacts from the assigned list in the edit task form.
 * @param {NodeList} assignedListe - The assigned list in the edit task form.
 * @param {Array} userContacts - An array to store user contacts.
 */
function userContactsFilter(assignedListe, userContacts) {
    assignedListe.forEach(li => {
        if (li.attributes) {
            userContacts.push(li);
        }
    });
}

/**
 * Changes the data custom status for the edit task form with the provided user contacts and assigned contacts.
 * @param {Array} userContacts - An array containing user contacts from the assigned list.
 * @param {Array} assignedContacts - An array containing assigned contacts for the task.
 * @param {Array} taskAssignedName - An array to store the names of assigned contacts.
 */
function changeDataStatus(userContacts, assignedContacts, taskAssignedName) {
    for (let li of userContacts) {
        for (let assigned of assignedContacts) {
            let contactName = li.attributes[`data-value`].value;
            if (contactName === assigned.name) {
                li.attributes[`data-custom-status`].value = true;
                taskAssignedName.push(assigned.name);
                showAssignedContact(li);
            }
        }
    }
}

/**
 * Shows the assigned contact in the edit task form.
 * @param {HTMLElement} li - The list item element representing an assigned contact.
 */
function showAssignedContact(li) {
    const imgUnchecked = li.children[1].children[0].children[0];
    const imgChecked = li.children[1].children[0].children[1];
    imgUnchecked.classList.add("d-none");
    imgChecked.classList.remove("d-none");
}

/**
 * Saves the edited task in the current user data and updates the board view.
 */
async function saveEditedTask() {
    const taskId = JSON.parse(document.getElementById("form-edit-task").getAttribute("data-id"));
    const taskTitle = document.getElementById("o-t-input-edit-title").value;
    const taskDescription = document.getElementById("o-t-textarea-edit-description").value;
    const taskDate = document.getElementById("o-t-edit-date-input").value;
    const closedSubTasks = currentUser[`tasks`][taskId][`closedSubTasks`];
    const progress = currentUser[`tasks`][taskId][`progress`];
    currentUser[`tasks`][taskId] = newEditedTask(taskId, taskTitle, taskDescription, taskDate, closedSubTasks, progress);
    updateEditedTasks();
    updateHTML();
    modifyClassById("add", "d-none", ["opened-task-container", "opened-task-edit"]);
}

/**
 * Updates the current user data and user list with the edited tasks.
 */
async function updateEditedTasks() {
    await setItem('currentUser', JSON.stringify(currentUser));
    await updateCurrentUserFromUsers(users, currentUser);
    await loadCurrentUser();
    await loadUsers();
}

/**
 * Creates a new task object with edited task information.
 * @param {number} taskId - The ID of the task being edited.
 * @param {string} taskTitle - The title of the edited task.
 * @param {string} taskDescription - The description of the edited task.
 * @param {string} taskDate - The due date of the edited task.
 * @returns {Object} - The new task object with edited task information.
 */
function newEditedTask(taskId, taskTitle, taskDescription, taskDate, closedSubTasks, progress) {
    return {
        id: currentUser[`tasks`][taskId][`id`],
        assigned: assignedPersons,
        color: currentUser[`tasks`][taskId][`color`],
        category: currentUser[`tasks`][taskId][`category`],
        date: taskDate,
        description: taskDescription,
        prio: taskPrio,
        subTasks: subTasks,
        title: taskTitle,
        status: currentUser[`tasks`][taskId][`status`],
        progress: progress,
        closedSubTasks: closedSubTasks
    };
}

/**
 * Closes the edited task form.
 */
function closeEditedTask() {
    modifyClassById("add", "d-none", ["opened-task-edit"]);
    modifyClassById("remove", "d-none", ["opened-task"]);
}

/**
 * Searches tasks based on the text input and filters the displayed tasks accordingly.
 */
function searchText() {
    const searchInput = document.getElementById("input-search-task-board");
    const searchText = searchInput.value.toLowerCase();
    const taskTitles = document.querySelectorAll(".task-card .task-title");
    const taskTexts = document.querySelectorAll(".task-card .task-text");
    const taskElements = Array.from(taskTitles).concat(Array.from(taskTexts));
    taskElements.forEach(element => {
        const elementText = element.textContent.toLowerCase();
        if (elementText.includes(searchText)) {
            element.closest(".task-card").style.display = "block";
        } else {
            element.closest(".task-card").style.display = "none";
        }
    });
}