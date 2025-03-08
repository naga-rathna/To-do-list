
    let taskForm = document.getElementById('task-form');
    let taskInput = document.getElementById('task-name');
    let taskList = document.getElementById('task-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


    function addTask(event) {
        event.preventDefault(); 

        let taskName = taskInput.value.trim();
        if (taskName === '') {
            alert('Please enter a task.');
            return;
        }

        let task = {
            id: Date.now(),
            taskName: taskName,
            checked: false
        };

        tasks.push(task);
        updateUI();
        taskInput.value = ''; 
        saveTasks();
    }

    function updateUI() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            let listItemHTML = `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <input type="checkbox" class="task-checkbox" data-id="${task.id}" ${task.checked ? 'checked' : ''}>
                    <span style="text-decoration: ${task.checked ? 'line-through' : 'none'};">${task.taskName}</span>
                    <button class="btn btn-danger btn-sm delete">Delete</button>
                    <button class="btn btn-success btn-sm update">Update</button>
                </li>
            `;
            taskList.innerHTML += listItemHTML;
        });
    }

    function deleteTask(event) {
        if (event.target.classList.contains('delete')) {
            let listItem = event.target.parentElement;
            let taskId = listItem.querySelector('.task-checkbox').dataset.id;
            tasks = tasks.filter(task => task.id != taskId);
            updateUI();
            saveTasks();
        }
    }

    function updateTask(event) {
        if (event.target.classList.contains('update')) {
            let listItem = event.target.parentElement;
            let taskId = listItem.querySelector('.task-checkbox').dataset.id;
            let taskIndex = tasks.findIndex(task => task.id == taskId);
            let newTaskName = prompt('Update the task:', tasks[taskIndex].taskName);
            if (newTaskName !== null && newTaskName.trim() !== '') {
                tasks[taskIndex].taskName = newTaskName.trim();
                updateUI();
                saveTasks();
            }
        }
    }

   
    function toggleTaskCompletion(event) {
        if (event.target.classList.contains('task-checkbox')) {
            let taskId = event.target.dataset.id;
            let taskIndex = tasks.findIndex(task => task.id == taskId);
            tasks[taskIndex].checked = event.target.checked;
            updateUI();
            saveTasks();
        }
    }

    
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    taskForm.addEventListener('submit', addTask);
    taskList.addEventListener('click', deleteTask);
    taskList.addEventListener('click', updateTask);
    taskList.addEventListener('change', toggleTaskCompletion);

    updateUI();