const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const editModal = document.getElementById("editModal");
const editInput = document.getElementById("editInput");
const saveButton = document.getElementById("saveButton");

let editingTaskId = null;

const API_URL = "http://localhost:3000";

// Format date function
const formatDate = (date) => {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric', 
        second: 'numeric', 
        hour12: true 
    };
    return new Date(date).toLocaleString(undefined, options);
};

// Fetch tasks from the server
const fetchTasks = async () => {
    const response = await fetch(`${API_URL}/tasks`);
    const tasks = await response.json();

    taskList.innerHTML = tasks
        .map(task => {
            const createdAt = formatDate(task.createdAt);
            const updatedAt = task.updatedAt ? formatDate(task.updatedAt) : "Not updated yet";

            return `
                <li id="task-${task.id}">
                    <div>
                        <strong>${task.description}</strong>
                        <p class="task-time">Created: ${createdAt}</p>
                        <p class="task-time">Last Updated: ${updatedAt}</p>
                    </div>
                    <div>
                        <button class="edit" onclick="editTask(${task.id}, '${task.description}')">Edit</button>
                        <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
                    </div>
                </li>
            `;
        })
        .join("");
};

// Add a new task
const addTask = async () => {
    const description = taskInput.value;
    if (description) {
        await fetch(`${API_URL}/tasks`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ description }),
        });
        taskInput.value = "";
        fetchTasks();
};

// Delete a task
const deleteTask = async (id) => {
    await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
    fetchTasks();
};

// Open the edit modal and load task data
const editTask = (id, description) => {
    editingTaskId = id;
    editInput.value = description;
    editModal.style.display = "flex";
};

// Save the edited task
const saveEdit = async () => {
    const updatedDescription = editInput.value;
    if (updatedDescription) {
        await fetch(`${API_URL}/tasks/${editingTaskId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ description: updatedDescription }),
        });
        editModal.style.display = "none";  // Close the modal
        fetchTasks();  // Re-fetch and re-render the task list
    }
};

// Close the edit modal
const closeModal = () => {
    editModal.style.display = "none";
};

addTaskButton.addEventListener("click", addTask);
saveButton.addEventListener("click", saveEdit);
editModal.addEventListener("click", (e) => {
    if (e.target === editModal) {
        closeModal();
    }
});

fetchTasks();
