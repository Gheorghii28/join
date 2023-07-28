/**
 * Creates an array of tasks with specific properties based on the provided userContacts.
 * @param {Array} userContacts - An array of user contacts used to assign tasks.
 * @returns {Array} An array of tasks with various properties.
 */
function createTasks(userContacts) {
    const currentDate = new Date();
    const twoDaysLater = new Date();
    const threeDaysLater = new Date(currentDate);
    const fourDaysLater = new Date(currentDate);
    twoDaysLater.setDate(currentDate.getDate() + 2);
    threeDaysLater.setDate(currentDate.getDate() + 3);
    fourDaysLater.setDate(currentDate.getDate() + 4);
    return [
        {
            assigned: [userContacts[0], userContacts[1]],
            color: "rgb(122, 184, 255)",
            category: "Frontend",
            date: formatDate(currentDate),
            description: "Erstellen Sie eine responsive Benutzeroberfläche für die Startseite des Projekts mit HTML, CSS und JavaScript.",
            prio: "urgent",
            subTasks: [
                {
                    value: "Header design",
                    status: "opened"
                },
                {
                    value: "Navigation implementieren",
                    status: "closed"
                },
                {
                    value: "Footer design",
                    status: "closed"
                }
            ],
            title: "Startseite-Design",
            status: "in-progress",
            id: 1001,
            closedSubTasks: 2,
            progress: 66.66
        },
        {
            assigned: [userContacts[3], userContacts[5]],
            color: "rgb(255, 122, 0)",
            category: "Design",
            date: formatDate(twoDaysLater),
            description: "Entwerfen Sie das Logo und die Icons für die Anwendung basierend auf den bereitgestellten Anforderungen und Designrichtlinien.",
            prio: "medium",
            subTasks: [
                {
                    value: "Logo sketches",
                    status: "closed"
                },
                {
                    value: "Icon design",
                    status: "opened"
                }
            ],
            title: "Logo-Design",
            status: "to-do",
            id: 1002,
            closedSubTasks: 1,
            progress: 50
        },
        {
            assigned: [userContacts[10], userContacts[12]],
            color: "rgb(255, 154, 87)",
            category: "Backend",
            date: formatDate(fourDaysLater),
            description: "Entwickeln Sie die Server-APIs und Datenbankabfragen für die Benutzerregistrierung und -authentifizierung.",
            prio: "low",
            subTasks: [
                {
                    value: "API endpoints",
                    status: "opened"
                },
                {
                    value: "Database setup",
                    status: "opened"
                }
            ],
            title: "Benutzerverwaltung",
            status: "done",
            id: 1003,
            closedSubTasks: 0,
            progress: 0
        },
        {
            assigned: [userContacts[5]],
            color: "rgb(122, 184, 255)",
            category: "Frontend",
            date: formatDate(threeDaysLater),
            description: "Entwickeln Sie interaktive Benutzerkomponenten und führen Sie Frontend-Tests durch, um sicherzustellen, dass die Anwendung reibungslos funktioniert.",
            prio: "low",
            subTasks: [],
            title: "Frontend-Entwicklung",
            status: "in-progress",
            id: 1004,
            closedSubTasks: 0,
            progress: 0
        },
        {
            assigned: [userContacts[15]],
            color: "rgb(255, 122, 0)",
            category: "Design",
            date: formatDate(twoDaysLater),
            description: "Erstellen Sie Wireframes und Prototypen für die wichtigsten Seiten und Funktionen der Anwendung.",
            prio: "medium",
            subTasks: [],
            title: "Wireframes & Prototypen",
            status: "to-do",
            id: 1005,
            closedSubTasks: 0,
            progress: 0
        },
        {
            assigned: [userContacts[4]],
            color: "rgb(255, 154, 87)",
            category: "Backend",
            date: formatDate(fourDaysLater),
            description: "Implementieren Sie Datenbankoptimierungen und führen Sie Lasttests durch, um sicherzustellen, dass die Anwendung unter hoher Belastung stabil bleibt.",
            prio: "low",
            subTasks: [],
            title: "Backend-Optimierung",
            status: "done",
            id: 1006,
            closedSubTasks: 0,
            progress: 0
        }
    ];
}