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