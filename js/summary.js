async function init() {
    await includeHTML();
    await loadCurrentUser();
    document.getElementById("greeting-name").textContent = currentUser.name;
}