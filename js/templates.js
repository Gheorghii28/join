function taskAssigned(assignedName, rgbColor) {
    return `
    <li>
        <div style="background-color: ${rgbColor};">
            <span>${assignedName}</span>
        </div>
    </li>`;
}

function subTaskAssigned(subTask, index) {
    return `
    <li>
        <div class="">
            <div class="label-style">
                <img id="img-default-${index}" onclick="addSubtask('${subTask}', ${index})" class="image-1 w16-h16 d-none" src="./assets/img/check-default.png">
                <img id="img-valid-${index}" onclick="removeSubTask('${subTask}', ${index})" class="image-2 w16-h16" src="./assets/img/check-valid.png">
            </div>
        </div>
        <span>${subTask}</span>
    </li>`;
}

function generateTaskHTML(task) {
    const assigneds = generateAssignedHtml(task[`assigned`]);
    return `
    <div onclick="openTask(${task[`id`]})" draggable="true" ondragstart="startDragging(${task[`id`]})" class="task-card">
        <div>
            <div class="task-type" style="background-color: ${task[`color`]};">
                <span>${task[`category`]}</span>
            </div>
            <div class="task-content">
                <div>
                    <span class="task-title">${task[`title`]}</span>
                    <span class="task-text">${task[`description`]}</span>
                </div>
            </div>
            <div class="task-progress">
                <div class="task-progress-bar"></div>
                <span>1/2 Done</span>
            </div>
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

function generateEmtptySpaceForTask(taskStatus) {
    return `
    <div class="empty-space-task d-none" ondrop="moveTo('${taskStatus}')" ondragleave="removeHighlight(event)" ondragover="allowDrop(event); highlight(event)"></div>`;
}

function generateOpenedTaskHtml(task) {
    const date = task[`date`];
    const parts = date.split("-");
    const formattedDate = parts.reverse().join("-");
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

function generateAssignedListHtml() {
    const assigned = generateAssigned();
    return `
    <li data-value="user-invite" data-custom-status="false"  class="user-invite">
        <span>Invite new contact </span>
        <div class="user-icon">
            <img src="./assets/img/user-icon.png">
        </div>
    </li>
    ${assigned}`;
}

function generateAssigned() {
    const contacts = currentUser[`contacts`];
    let assignedListeHtml = "";
    contacts.forEach(contact => {
        assignedListeHtml += `
        <li data-value="${contact[`name`]}" data-custom-status="false">
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

function generateLetterHTML(letter) {
    return `
    <li class="letter">
        <span>${letter}</span>
    </li>
    <li class="separate-line">
        <img src="./assets/img/separate-line.png">
    </li>`;
}

function generateContactHTML(contact) {
    return `
      <li onclick="showChosenContact(${contact[`id`]})" onclick="showChosenContact()" class="contact">
        <div class="initials" style="background-color: ${contact[`color`]}">
            <div>
                <span>${contact[`initials`]}</span>
            </div>
        </div>
        <div class="contact-name">
            <span>${contact[`name`]}</span>
            <span>${contact[`email`]}</span>
        </div>
      </li>
    `;
}

function generateInfoContainerHtml(contactId) {
    const headline = generateContactHeadlineHtml(contactId);
    const edit = generateContactEditHtml(contactId);
    const contactInfo = generateContactInfoHtml(contactId);
    return `
    ${headline}
    ${edit}
    ${contactInfo}`;
}

function generateContactHeadlineHtml(contactId) {
    const contact = currentUser[`contacts`][contactId];
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
                <button id="btn-add-task" type="button">
                    <img src="./assets/img/add-contact.png">
                    <img src="./assets/img/add-contact-hover.png">
                    <span>Add Task</span>
                </button>
            </div>
        </div>
    </div>`;
}

function generateContactEditHtml(contactId) {
    const contact = currentUser[`contacts`][contactId];
    return `            
    <div>
        <span>Contact Information</span>
        <div>
            <button id="btn-edit-info">
                <img src="./assets/img/edit.png">
                <img src="./assets/img/edit-blue.png">
                <span>Edit</span>
            </button>
        </div>
    </div>`;
}

function generateContactInfoHtml(contactId) {
    const contact = currentUser[`contacts`][contactId];
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