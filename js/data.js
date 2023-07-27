/**
 * Creates an array of tasks with specific properties based on the provided userContacts.
 * @param {Array} userContacts - An array of user contacts used to assign tasks.
 * @returns {Array} An array of tasks with various properties.
 */
function createTasks(userContacts) {
    return [
        {
            assigned: [userContacts[0], userContacts[1]],
            color: "rgb(122, 184, 255)",
            category: "Frontend",
            date: "2023-07-28",
            description: "Erstellen Sie eine responsive Benutzeroberfläche für die Startseite des Projekts mit HTML, CSS und JavaScript.",
            prio: "urgent",
            subTasks: [],
            title: "Startseite-Design",
            status: "in-progress",
            id: 1001
        },
        {
            assigned: [userContacts[3], userContacts[5]],
            color: "rgb(255, 122, 0)",
            category: "Design",
            date: "2023-07-27",
            description: "Entwerfen Sie das Logo und die Icons für die Anwendung basierend auf den bereitgestellten Anforderungen und Designrichtlinien.",
            prio: "medium",
            subTasks: [],
            title: "Logo-Design",
            status: "to-do",
            id: 1002
        },
        {
            assigned: [userContacts[10], userContacts[12]],
            color: "rgb(255, 154, 87)",
            category: "Backend",
            date: "2023-07-30",
            description: "Entwickeln Sie die Server-APIs und Datenbankabfragen für die Benutzerregistrierung und -authentifizierung.",
            prio: "low",
            subTasks: [],
            title: "Benutzerverwaltung",
            status: "done",
            id: 1003
        },
        {
            assigned: [userContacts[5]],
            color: "rgb(122, 184, 255)",
            category: "Frontend",
            date: "2023-07-29",
            description: "Entwickeln Sie interaktive Benutzerkomponenten und führen Sie Frontend-Tests durch, um sicherzustellen, dass die Anwendung reibungslos funktioniert.",
            prio: "low",
            subTasks: [],
            title: "Frontend-Entwicklung",
            status: "in-progress",
            id: 1004
        },
        {
            assigned: [userContacts[15]],
            color: "rgb(255, 122, 0)",
            category: "Design",
            date: "2023-07-27",
            description: "Erstellen Sie Wireframes und Prototypen für die wichtigsten Seiten und Funktionen der Anwendung.",
            prio: "medium",
            subTasks: [],
            title: "Wireframes & Prototypen",
            status: "to-do",
            id: 1005
        },
        {
            assigned: [userContacts[4]],
            color: "rgb(255, 154, 87)",
            category: "Backend",
            date: "2023-07-29",
            description: "Implementieren Sie Datenbankoptimierungen und führen Sie Lasttests durch, um sicherzustellen, dass die Anwendung unter hoher Belastung stabil bleibt.",
            prio: "low",
            subTasks: [],
            title: "Backend-Optimierung",
            status: "done",
            id: 1006
        }
    ];
}