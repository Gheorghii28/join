/**
 * Generates an HTML list item representing an assigned task with the given name and background color.
 * @param {string} assignedName - The name of the person assigned to the task.
 * @param {string} rgbColor - The background color in the format "rgb(red, green, blue)".
 * @returns {string} The HTML markup for the assigned task list item.
 */
function taskAssigned(assignedName, rgbColor) {
    return `
    <li>
        <div style="background-color: ${rgbColor};">
            <span>${assignedName}</span>
        </div>
    </li>`;
}

/**
 * Generates an HTML list item representing a subtask with the given subTask string and index.
 * @param {string} subTask - The description of the subtask.
 * @param {number} index - The index of the subtask, used as a unique identifier for the subtask.
 * @returns {string} The HTML markup for the subtask list item.
 */
function subTaskAssigned(subTask, index) {
    return `
    <li>
        <div class="">
            <div class="label-style">
                <img id="img-default-${index}" onclick="addSubtask('${subTask[`value`]}', ${index})" class="image-1 w16-h16 d-none" src="./assets/img/check-default.png">
                <img id="img-valid-${index}" onclick="removeSubTask('${subTask[`value`]}', ${index})" class="image-2 w16-h16" src="./assets/img/check-valid.png">
            </div>
        </div>
        <span>${subTask[`value`]}</span>
    </li>`;
}

/**
 * Generates HTML markup for displaying a task card with various details.
 * @param {Object} task - An object representing a task with properties like id, title, description, category, status, color, assigned, prio, etc.
 * @returns {string} The HTML markup for the task card.
 */
function generateTaskHTML(task) {
    const assigneds = generateAssignedHtml(task[`assigned`]);
    const taskProgresBar = generateTaskProgresBarHtml(task);
    let description = getLimitedtext(task[`description`], 100);
    let topImgClass = getTopImageClass(task[`status`]);
    let bottomImgClass = getBottomImageClass(task[`status`]);
    return `
    <div onclick="taskEvent(event, ${task[`id`]})" draggable="true" ondragstart="startDragging(event ,${task[`id`]})" class="task-card">
        <div>
            <img class="btn-direction ${topImgClass}" data-status="${task[`status`]}" data-direction="top" src="./assets/img/direction-top.png">
            <img class="btn-direction ${bottomImgClass}" data-status="${task[`status`]}" data-direction="bottom" src="./assets/img/direction-bottom.png">
            <div class="task-type" style="background-color: ${task[`color`]};">
                <span>${task[`category`]}</span>
            </div>
            <div class="task-content">
                <div>
                    <span class="task-title">${task[`title`]}</span>
                    <span class="task-text">${description}</span>
                </div>
            </div>
            ${taskProgresBar}
            <div class="task-footer">
                <div class="task-responsible">
                    ${assigneds}
                </div>
                <div class="prio-symbol">
                    <img class="height-${task[`prio`]}" src="./assets/img/prio-baja-${task[`prio`]}.png" alt="">
                </div>
            </div>
        </div>
    </div>`;
}

/**
 * Generates HTML markup for displaying the task progress bar, showing the number of done subtasks out of the total subtasks.
 * @param {Object} task - An object representing a task with properties like id, title, description, category, status, color, assigned, prio, etc.
 * @returns {string} The HTML markup for the task progress bar.
 */
function generateTaskProgresBarHtml(task) {
    const subTasks = task[`subTasks`];
    const subTaskCount = subTasks.length;
    const progress = task[`progress`];
    const closedSubTask = task[`closedSubTasks`];
    let display = "d-none";
    if (subTaskCount > 0) {
        display = "";
    }
    return `
    <div class="task-progress ${display}">
        <div class="task-progress-bar">
            <div style="width: ${progress}%;"></div>
        </div>
        <span>${closedSubTask}/${subTaskCount} Done</span>
    </div>`;
}

/**
 * Generates HTML elements representing assigned individuals with their initials and background color.
 * @param {Array} assigneds - An array of objects representing assigned individuals with properties like name and color.
 * @returns {string} The HTML markup for the assigned individuals.
 */
function generateAssignedHtml(assigneds) {
    let assignedHtml = "";
    assigneds.forEach(assigned => {
        const initials = getInitials(`${assigned[`name`]}`);
        assignedHtml += `
        <div class="responsible" style="background-color: ${assigned[`color`]};">
            <span>${initials}</span>
        </div>`;
    });
    return assignedHtml;
}

/**
 * Generates an HTML <div> element with the class "empty-space-task" and the class "d-none".
 * @returns {string} The HTML markup for the empty space element.
 */
function generateEmtptySpaceForTask() {
    return `
    <div class="empty-space-task d-none"></div>`;
}

/**
 * Generates HTML markup for displaying an opened task with its details.
 * @param {Object} task - The task object containing details of the opened task.
 * @returns {string} The HTML markup for the opened task view.
 */
function generateOpenedTaskHtml(task) {
    const date = task[`date`];
    const parts = date.split("-");
    const formattedDate = parts.reverse().join("-");
    const subtasks = generateSubTaskHtml(task);
    const assigneds = generateOpenedTaskAssignedHtml(task[`assigned`]);
    return `            
    <div id="o-t-type" style="background-color: ${task[`color`]};">
        <span>${task[`category`]}</span>
    </div>
    <div id="opened-task-content">
        <div id="o-t-title">
            <span>${task[`title`]}</span>
        </div>
        <span id="o-t-text">${task[`description`]}</span>
        <div id="o-t-date">
            <span>Due date: </span>
            <span>${formattedDate}</span>
        </div>
        <div id="o-t-prio">
            <span>Priority: </span>
            <img src="./assets/img/btn-prio-${task[`prio`]}.png">
        </div>
        <div id="o-t-subtasks">
            <ul>
                ${subtasks}
            </ul>
        </div>
        <span id="o-t-assigned">Assigned To:</span>
        ${assigneds}
    </div>
    <img onclick="closeOpenedTask()" class="o-t-close-img" src="./assets/img/o-t-close.png">
    <div id="o-t-btns-container">
        <button onclick="deleteTask(${task[`id`]})" id="o-t-btn-delete">
            <img src="./assets/img/img-delete.png">
            <img src="./assets/img/delete-icon-blue.png">
            <img src="./assets/img/delete-icon-black.png">
        </button>
        <button onclick="openEditTask(${task[`id`]})" id="o-t-btn-edit">
            <img src="./assets/img/img-edit.png">
        </button>
    </div>`;
}

/**
 * Generates HTML markup for displaying a list of subtasks as list items.
 * @param {Object} task - An object representing a task with properties like id and subTasks.
 * @returns {string} The HTML markup for the list of subtasks.
 */
function generateSubTaskHtml(task) {
    let li = "";
    let subTasks = task.subTasks;
    subTasks.forEach((subTask, index) => {
        li += generateSubTaskListItem(task.id, subTask, index);
    });
    return li;
}

/**
 * Generates HTML markup for a single subtask list item.
 * @param {number} taskId - The ID of the parent task.
 * @param {Object} subTask - An object representing a subtask with properties like value and status.
 * @param {number} index - The index of the subtask in the parent task's subTasks array.
 * @returns {string} The HTML markup for the single subtask list item.
 */
function generateSubTaskListItem(taskId, subTask, index) {
    const idNr = `1${taskId}${index}`;
    const defaultDisplay = subTask.status === "opened" ? "" : "d-none";
    const validDisplay = subTask.status === "closed" ? "" : "d-none";
    return `
    <li>
        <div class="">
            <div class="label-style">
                <img id="subtask-default${idNr}" onclick="closeSubTask(${taskId}, ${idNr}, ${index})" class="image-1 w16-h16 ${defaultDisplay}" src="./assets/img/check-default.png">
                <img id="subtask-valid${idNr}"  onclick="openSubTask(${taskId}, ${idNr}, ${index})" class="image-2 w16-h16 ${validDisplay}" src="./assets/img/check-valid.png">
            </div>
        </div>
        <span>${subTask.value}</span>
    </li>`;
}

/**
 * Generates HTML markup for displaying assigned individuals with initials, name, and background color within an opened task view.
 * @param {Array} assigneds - An array of objects representing assigned individuals with properties like name and color.
 * @returns {string} The HTML markup for the assigned individuals in the opened task view.
 */
function generateOpenedTaskAssignedHtml(assigneds) {
    let assignedHtml = "";
    assigneds.forEach(assigned => {
        const initials = getInitials(`${assigned[`name`]}`);
        assignedHtml += `
        <div class="o-t-user">
            <div style="background-color: ${assigned[`color`]};">
                <span>${initials}</span>
            </div>
            <span>${assigned[`name`]}</span>
        </div>`;
    });
    return assignedHtml;
}

/**
 * Generates HTML markup for displaying a list of assigned contacts, including an option to invite a new contact.
 * @returns {string} The HTML markup for the list of assigned contacts.
 */
function generateAssignedListHtml() {
    const assigned = generateAssigned();
    return `
    <li data-value="user-invite" data-custom-status="false"  class="user-invite d-none">
        <span>Invite new contact </span>
        <div class="user-icon">
            <img src="./assets/img/user-icon.png">
        </div>
    </li>
    ${assigned}`;
}

/**
 * Generates HTML markup for displaying a list of contacts with checkboxes for selection.
 * @returns {string} The HTML markup for the list of contacts.
 */
function generateAssigned() {
    const contacts = currentUser[`contacts`];
    contacts.sort((a, b) => a.name.localeCompare(b.name));
    let assignedListeHtml = "";
    contacts.forEach(contact => {
        assignedListeHtml += `
        <li data-value="${contact[`id`]}" data-custom-status="false">
            <span>${contact[`name`]}</span>
            <div class="check-container">
                <label>
                    <img class="image-1" src="./assets/img/unchecked.png">
                    <img class="image-2 d-none" src="./assets/img/checked.png">
                </label>
            </div>
        </li>`;
    });
    return assignedListeHtml;
}

/**
 * Generates HTML markup for displaying a letter and a separate line image.
 * @param {string} letter - The letter to be displayed.
 * @returns {string} The HTML markup for the letter and the separate line.
 */
function generateLetterHTML(letter) {
    return `
    <li class="letter">
        <span>${letter}</span>
    </li>
    <li class="separate-line">
        <img src="./assets/img/separate-line.png">
    </li>`;
}

/**
 * Generates HTML markup for displaying a contact in a list.
 * @param {Object} contact - The contact object containing details of the contact.
 * @returns {string} The HTML markup for the contact's display in the list.
 */
function generateContactHTML(contact) {
    return `
      <li id="contact-li-${contact[`id`]}" onclick="showChosenContact(${contact[`id`]})" class="contact">
        <div class="initials" style="background-color: ${contact[`color`]}">
            <div>
                <span>${contact[`initials`]}</span>
            </div>
        </div>
        <div class="contact-name">
            <span class="bg-name">${contact[`name`]}</span>
            <span>${contact[`email`]}</span>
        </div>
      </li>
    `;
}

/**
 * Generates HTML markup for displaying an information container for a specific contact.
 * @param {string} contactId - The unique identifier of the contact.
 * @returns {string} The HTML markup for the contact information container.
 */
function generateInfoContainerHtml(contactId) {
    const headline = generateContactHeadlineHtml(contactId);
    const edit = generateContactEditHtml(contactId);
    const contactInfo = generateContactInfoHtml(contactId);
    return `
    ${headline}
    ${edit}
    ${contactInfo}`;
}

/**
 * Generates HTML markup for displaying the headline of a specific contact.
 * @param {number} contactId - The ID of the contact for which the headline is generated.
 * @returns {string} The HTML markup for the contact's headline.
 */
function generateContactHeadlineHtml(contactId) {
    const contactIndex = getContactIndex(contactId, currentUser);
    const contact = currentUser[`contacts`][contactIndex];
    return `
    <div>
        <div id="contact-initials">
            <div>
                <span>${contact[`initials`]}</span>
            </div>
        </div>
        <div id="contact-name">
            <div>
                <span>${contact[`name`]}</span>
            </div>
            <div>
                <button onclick="showScreenWithTaskForm('${statusTask}')" id="btn-add-task" type="button">
                    <img src="./assets/img/add-contact.png">
                    <img src="./assets/img/add-contact-hover.png">
                    <span>Add Task</span>
                </button>
            </div>
        </div>
    </div>`;
}

/**
 * Generates HTML markup for displaying the contact information section along with an "Edit" button for a specific contact.
 * @param {number} contactId - The ID of the contact for which the contact information section is generated.
 * @returns {string} The HTML markup for the contact information section and the "Edit" button.
 */
function generateContactEditHtml(contactId) {
    const contactIndex = getContactIndex(contactId, currentUser);
    const contact = currentUser[`contacts`][contactIndex];
    return `            
    <div>
        <span>Contact Information</span>
        <div>
            <button onclick="openEditContactForm(${contactId})" type="button" id="btn-edit-info">
                <img src="./assets/img/edit.png">
                <img src="./assets/img/edit-blue.png">
                <span>Edit</span>
            </button>
        </div>
    </div>`;
}

/**
 * Generates HTML markup for displaying the contact information (email and phone) for a specific contact.
 * @param {number} contactId - The ID of the contact for which the contact information is generated.
 * @returns {string} The HTML markup for displaying the contact information (email and phone).
 */
function generateContactInfoHtml(contactId) {
    const contactIndex = getContactIndex(contactId, currentUser);
    const contact = currentUser[`contacts`][contactIndex];
    return `
    <div>
        <div id="email-info">
            <span>Email</span>
            <span>${contact[`email`]}</span>
        </div>
        <div id="phone-info">
            <span>Phone</span>
            <span>${contact[`phone`]}</span>
        </div>
    </div>`;
}

/**
 * Generates HTML markup for displaying task buttons representing different categories of tasks.
 * @param {number} tasksCount - The count of tasks in the "Tasks in Board" category.
 * @param {number} inProgressCount - The count of tasks in the "Tasks in Progress" category.
 * @param {number} feedbackCount - The count of tasks in the "Awaiting Feedback" category.
 * @returns {string} The HTML markup for displaying task buttons with task category counts.
 */
function generateTasksBtnsHtml(tasksCount, inProgressCount, feedbackCount) {
    return `
    <div>
        <a href="board.html">
            <div id="tasksInBoard" class="task-btn">
                <div>
                    <span>${tasksCount}</span>
                    <span>Tasks in Board</span>
                </div>
            </div>
        </a>
    </div>
    <div>
        <a href="board.html">
            <div id="tasksInProgress" class="task-btn">
                <div>
                    <span>${inProgressCount}</span>
                    <span>Tasks In Progress</span>
                </div>
            </div>
        </a>
    </div>
    <div>
        <a href="board.html">
            <div id="awaitingFeedback" class="task-btn">
                <div>
                    <span>${feedbackCount}</span>
                    <span>Awaiting Feedback</span>
                </div>
            </div>
        </a>
    </div>`;
}

/**
 * Generates HTML markup for displaying a button representing urgent tasks with their count and an upcoming deadline date.
 * @param {number} urgentCount - The count of urgent tasks.
 * @param {string} date - The upcoming deadline date.
 * @returns {string} The HTML markup for the urgent tasks button.
 */
function generateUrgentBtnHtml(urgentCount, date) {
    return `
    <div>
        <a href="board.html">
            <div id="urgent">
                <div id="urgent-left">
                    <img src="./assets/img/ellipse 4.png">
                    <div>
                        <span>${urgentCount}</span>
                        <span>Urgent</span>
                    </div>
                </div>
                <img src="./assets/img/vertical-line-gray.png">
                <div id="urgent-right">
                    <span>${date}</span>
                    <span>Upcoming Deadline</span>
                </div>
            </div>
        </a>
    </div>`;
}

/**
 * Generates HTML markup for displaying status containers for "To-do" and "Done" tasks.
 * @param {number} todoCount - The count of "To-do" tasks.
 * @param {number} doneCount - The count of "Done" tasks.
 * @returns {string} The HTML markup for the status containers.
 */
function generateStatusContainerHtml(todoCount, doneCount) {
    return `
    <div>
        <a href="board.html">
            <div id="todo-sumarry">
                <img src="./assets/img/todo.png">
                <img src="./assets/img/todo-white.png">
                <div>
                    <span>${todoCount}</span>
                    <span>To-do</span>
                </div>
            </div>
        </a>
    </div>
    <div>
        <a href="board.html">
            <div id="done-summary">
                <img src="./assets/img/done.png">
                <img src="./assets/img/done-white.png">
                <div>
                    <span>${doneCount}</span>
                    <span>Done</span>
                </div>
            </div>
        </a>
    </div>`;
}