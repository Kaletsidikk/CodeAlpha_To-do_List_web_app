let tasks = [];

let editingIndex = null;

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text) {
        if (editingIndex !== null) {
            tasks[editingIndex].text = text;
            editingIndex = null;
        } else {
            tasks.push({ text: text, completed: false });
        }
        updateTasksList();
        updateStats();
        taskInput.value = '';
    }
};

const updateTasksList = () => {
    const taskList = document.getElementById('task-List');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? 'completed' : ''}">
                    <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} />
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="./img/edit.png" onClick="editTask(${index})" />
                    <img src="./img/bin.png" onClick="deleteTask(${index})" />
                </div>
            </div>
        `;
        listItem.querySelector('.checkbox').addEventListener('change', () => toggleTaskComplete(index));
        taskList.appendChild(listItem);
    });
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateStats();
};

const editTask = (index) => {
    const taskInput = document.getElementById('taskInput');
    taskInput.value = tasks[index].text;
    editingIndex = index;
    taskInput.focus();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    updateStats(); 
};

const updateStats = () => {
    const completeTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks === 0 ? 0 : (completeTasks / totalTasks) * 100;
    const progressBar = document.getElementById('progress');

    progressBar.style.width = `${progress}%`;
    document.getElementById('numbers').textContent = `${completeTasks}/${totalTasks}`;
};

document.getElementById('newtask').addEventListener('click', (e) => {
    e.preventDefault();
    addTask();
});