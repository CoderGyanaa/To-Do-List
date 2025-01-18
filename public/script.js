document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const addTaskButton = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");

    const editModal = document.getElementById("edit-modal");
    const editInput = document.getElementById("edit-input");
    const saveTaskButton = document.getElementById("save-task-btn");
    const closeModalButton = document.getElementById("close-modal-btn");

    let editingTask = null;

    // Add Task
    addTaskButton.addEventListener("click", () => {
        const taskValue = taskInput.value.trim();
        if (taskValue) {
            const newTask = createTaskElement(taskValue);
            taskList.appendChild(newTask);
            taskInput.value = ""; // Clear input
        } else {
            alert("Please enter a valid task.");
        }
    });

    // Create Task Element
    const createTaskElement = (taskValue) => {
        const li = document.createElement("li");
        const taskContent = document.createElement("strong");
        taskContent.textContent = taskValue;

        const editButton = document.createElement("button");
        editButton.textContent = "✏️";
        editButton.classList.add("edit");
        editButton.addEventListener("click", () => openEditModal(taskContent, li));

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "🗑️";
        deleteButton.classList.add("delete");
        deleteButton.addEventListener("click", () => li.remove());

        li.appendChild(taskContent);
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        return li;
    };

    // Open Edit Modal
    const openEditModal = (taskContent, li) => {
        editingTask = { taskContent, li };
        editInput.value = taskContent.textContent;
        editModal.style.display = "flex";
    };

    // Save Edited Task
    saveTaskButton.addEventListener("click", () => {
        if (editingTask) {
            const newTaskValue = editInput.value.trim();
            if (newTaskValue) {
                editingTask.taskContent.textContent = newTaskValue;
                editModal.style.display = "none";
                editingTask = null;
            } else {
                alert("Task cannot be empty.");
            }
        }
    });

    // Close Modal
    closeModalButton.addEventListener("click", () => {
        editModal.style.display = "none";
    });
});
