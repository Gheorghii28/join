let currentDraggedElement;
let isLoading = false;
let taskAssignedName;

async function initBoard() {
    await includeHTML();
    await loadUsers();
    await loadCurrentUser();
    updateHTML();
    initializeEditTask();
    initializeAddTaskForm();
}

function updateHTML() {
    setTaskId();
    updateTasks("to-do");
    updateTasks("in-progress");
    updateTasks("awaiting-feedback");
    updateTasks("done");
}

function initializeEditTask() {
    addContactsToAssignedList("assigned-edit-option");
    selectAssigned("assigned-edit-option");
    setMinDate("o-t-edit-date-input");
}

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

function setTaskId() {
    let tasks = currentUser[`tasks`];
    tasks.forEach((task, index) => {
        task[`id`] = index;
    });
}

function startDragging(id) {
    currentDraggedElement = id;
    showEmptyBoxs();
}

function showEmptyBoxs() {
    const emptyBoxs = document.querySelectorAll(".empty-space-task");
    emptyBoxs.forEach(box => box.classList.remove("d-none"));
}

function moveTo(taskStatus) {
    const tasks = currentUser[`tasks`];
    tasks[currentDraggedElement]['status'] = taskStatus;
    updateEditedTasks();
    updateHTML();
}

function allowDrop(ev) {
    ev.preventDefault();
}

function highlight(event) {
    event.target.classList.add("drag-area-highlight");
}

function removeHighlight(event) {
    event.target.classList.remove("drag-area-highlight");
}

function openTask(taskId) {
    const task = currentUser[`tasks`].find(task => task.id === taskId);
    modifyClassById("remove", "d-none", ["opened-task-container", "opened-task"]);
    document.getElementById("opened-task").innerHTML = generateOpenedTaskHtml(task);
    taskPrio = task[`prio`];
}

function closeOpenedTask() {
    modifyClassById("add", "d-none", ["opened-task-container", "opened-task", "opened-task-edit"]);
}

async function deleteTask(taskId) {
    if (!isLoading) {
        isLoading = true;
        await updateRemovedTaskCurrentUser(taskId);
        await updateCurrentUserFromUsers(users, currentUser);
        await loadCurrentUser();
        await loadUsers();
        updateHTML();
        closeOpenedTask();
        isLoading = false;
    }
}

async function updateRemovedTaskCurrentUser(taskId) {
    const tasks = currentUser[`tasks`];
    tasks.splice(taskId, 1);
    currentUser[`tasks`] = tasks;
    await setItem('currentUser', JSON.stringify(currentUser));
}

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

function setSubtasks(taskId) {
    subTasks = currentUser[`tasks`][taskId][`subTasks`];
}

function setFormData(taskId) {
    document.getElementById("form-edit-task").setAttribute("data-id", `${taskId}`);
}

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

function showTaskEditAssigned() {
    document.getElementById("task-assigned-edit-ul").innerHTML = "";
    document.getElementById("task-assigned-edit-ul").innerHTML += generateAssignedHtml(assignedPersons);
}

function setTaskInputsValue(taskId) {
    const title = currentUser[`tasks`][taskId][`title`];
    const description = currentUser[`tasks`][taskId][`description`];
    const date = currentUser[`tasks`][taskId][`date`];
    setInputValue("o-t-input-edit-title", title);
    setInputValue("o-t-textarea-edit-description", description);
    setInputValue("o-t-edit-date-input", date);
}

function setPrioBtn(taskId) {
    let btns = document.querySelectorAll('[data-priority-edit]');
    btns.forEach(btn => {
        const attributValue = btn.getAttribute("data-priority-edit");
        const taskPrio = currentUser[`tasks`][taskId][`prio`];
        if (attributValue == taskPrio) {
            btn.classList.add("active");
        }
    });
}

function setTaskAssigned(taskId) {
    const assigneds = currentUser[`tasks`][taskId][`assigned`];
    document.getElementById("task-assigned-edit-ul").innerHTML = generateAssignedHtml(assigneds);
    assignedPersons = assigneds;
}

function setDataCustomStatus(taskId) {
    let userContacts = [];
    taskAssignedName = [];
    const assignedListe = document.getElementById("assigned-edit-option").childNodes;
    const assignedContacts = currentUser[`tasks`][taskId][`assigned`];
    userContactsFilter(assignedListe, userContacts);
    changeDataStatus(userContacts, assignedContacts, taskAssignedName);

}

function userContactsFilter(assignedListe, userContacts) {
    assignedListe.forEach(li => {
        if (li.attributes) {
            userContacts.push(li);
        }
    });
}

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

function showAssignedContact(li) {
    const imgUnchecked = li.children[1].children[0].children[0];
    const imgChecked = li.children[1].children[0].children[1];
    imgUnchecked.classList.add("d-none");
    imgChecked.classList.remove("d-none");
}

async function saveEditedTask() {
    const taskId = JSON.parse(document.getElementById("form-edit-task").getAttribute("data-id"));
    const taskTitle = document.getElementById("o-t-input-edit-title").value;
    const taskDescription = document.getElementById("o-t-textarea-edit-description").value;
    const taskDate = document.getElementById("o-t-edit-date-input").value;
    currentUser[`tasks`][taskId] = newEditedTask(taskId, taskTitle, taskDescription, taskDate);
    updateEditedTasks();
    updateHTML();
    modifyClassById("add", "d-none", ["opened-task-container", "opened-task-edit"]);
}

async function updateEditedTasks() {
    await setItem('currentUser', JSON.stringify(currentUser));
    await updateCurrentUserFromUsers(users, currentUser);
    await loadCurrentUser();
    await loadUsers();
}

function newEditedTask(taskId, taskTitle, taskDescription, taskDate) {
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
        status: currentUser[`tasks`][taskId][`status`]
    };
}

function closeEditedTask() {
    modifyClassById("add", "d-none", ["opened-task-edit"]);
    modifyClassById("remove", "d-none", ["opened-task"]);
}

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

