window.onload = function() {
    loadTasks();
};

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value.trim();

    if (task !== '') {
        const taskList = document.getElementById('taskList');
        const listItem = document.createElement('li');
        listItem.innerHTML = `<input type="checkbox" onchange="toggleTask(this)" class="mr-2 h-5 w-5">${task} <button onclick="deleteTask(this.parentNode)" class="text-red-500 ml-2">Удалить</button>`;
        taskList.appendChild(listItem);
        taskInput.value = '';
    }
}

function toggleTask(checkbox) {
    const task = checkbox.nextSibling.textContent;
    const isChecked = checkbox.checked;

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(item => {
        if (item.task === task) {
            item.checked = isChecked;
        }
        return item;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(taskItem) {
    const task = taskItem.firstChild.nextSibling.textContent;
    taskItem.remove();

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(item => item.task !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function saveTasks() {
    const tasks = Array.from(document.querySelectorAll('#taskList input[type="checkbox"]')).map(checkbox => {
        return {
            task: checkbox.nextSibling.textContent,
            checked: checkbox.checked
        };
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    alert('Задачи сохранены в localStorage');
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const listItem = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.checked;
        checkbox.addEventListener('change', () => toggleTask(checkbox));
        listItem.appendChild(checkbox);
        listItem.innerHTML += task.task + ' <button onclick="deleteTask(this.parentNode)" class="text-red-500 ml-2">Удалить</button>';
        taskList.appendChild(listItem);
    });
}