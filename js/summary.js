async function init() {
    await includeHTML();
    await loadUsers();
    await loadCurrentUser();
    document.getElementById("greeting-name").textContent = currentUser.name;
}