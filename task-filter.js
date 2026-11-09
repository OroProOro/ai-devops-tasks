
/**
 * Filtruje ukończone zadania, sortuje je według ID
 * i zwraca tablicę ich tytułów.
 *
 * @param {Array<{id: number, title: string, status: string}>} tasks
 * @returns {string[]}
 */
function getCompletedTaskTitles(tasks) {
    return tasks
        .filter(task => task.status === "completed")
        .sort((a, b) => a.id - b.id)
        .map(task => task.title);
}

module.exports = getCompletedTaskTitles;
