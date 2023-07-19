async function initSummary() {
    await includeHTML();
    await loadUsers();
    await loadCurrentUser();
    document.getElementById("greeting-day").textContent = "Good morning, ";
    document.getElementById("greeting-name").textContent = currentUser.name;
    updateSummaryHtml();
    nameAnimation();
}

function getDate(urgentTasks) {
    if (urgentTasks.length > 0) {
        const earliestDate = urgentTasks.reduce((minDate, obj) => {
            const currentDate = new Date(obj.date);
            return currentDate < minDate ? currentDate : minDate;
        }, new Date(urgentTasks[0].date));
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric"
        };
        const formattedDate = earliestDate.toLocaleDateString("en-US", options);
        return formattedDate;
    }
    return "";
}

function updateSummaryHtml() {
    const tasks = currentUser[`tasks`];
    const tasksCount = tasks.length;
    const todoCount = tasks.filter(obj => obj.status === "to-do").length;
    const inProgressCount = tasks.filter(obj => obj.status === "in-progress").length;
    const feedbackCount = tasks.filter(obj => obj.status === "awaiting-feedback").length;
    const doneCount = tasks.filter(obj => obj.status === "done").length;
    const urgentCount = tasks.filter(obj => obj.prio === "urgent").length;
    const urgentTasks = tasks.filter(obj => obj.prio === "urgent");
    const urgentDate = getDate(urgentTasks);
    document.getElementById("tasksContainer").innerHTML = generateTasksBtnsHtml(tasksCount, inProgressCount, feedbackCount);
    document.getElementById("urgentContainer").innerHTML = generateUrgentBtnHtml(urgentCount, urgentDate);
    document.getElementById("statusContainer").innerHTML = generateStatusContainerHtml(todoCount, doneCount);
}