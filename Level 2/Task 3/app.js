function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskDescriptionInput = document.getElementById('task-input-description');
    const taskText = taskInput.value.trim();
    const taskDescription = taskDescriptionInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    if (taskDescription === '') {
        alert('Please enter a task description!');
        return;
    }

    const task = createTaskElement(taskText, taskDescription);
    document.getElementById('pending-tasks').appendChild(task);

    taskInput.value = '';
    taskDescriptionInput.value = '';
}

function createTaskElement(taskText, taskDescription) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskText}</span>
        <span class="description">${taskDescription}</span>
        <div>
            <button onclick="completeTask(this)">Complete</button>
            <button onclick="deleteTask(this)">Delete</button>
        </div>
    `;
    return li;
}

function completeTask(button) {
    const li = button.closest('li');
    li.classList.toggle('completed');

    const taskList = li.classList.contains('completed') ? 'completed-tasks' : 'pending-tasks';
    document.getElementById(taskList).appendChild(li);
}

function deleteTask(button) {
    const li = button.closest('li');
    li.remove();
}
