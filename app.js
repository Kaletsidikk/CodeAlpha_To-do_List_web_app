let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let editingIndex = null;

// Initialize the app
const initializeApp = () => {
  updateTasksList();
  updateStats();
};

// Save tasks to localStorage
const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Add/Edit task
const addTask = () => {
  const taskInput = document.getElementById('taskInput');
  const text = taskInput.value.trim();

  if (text) {
    if (editingIndex !== null) {
      // Edit existing task
      tasks[editingIndex].text = text;
      editingIndex = null;
    } else {
      // Add new task
      tasks.push({ text, completed: false });
    }
    taskInput.value = '';
    updateTasksList();
    updateStats();
    saveTasks(); 
  }
};

// Delete task
const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTasksList();
  updateStats();
  saveTasks(); 
};  

// Toggle task completion
const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTasksList();
  updateStats();
  saveTasks();
};

// Edit task (populate input field)
const editTask = (index) => {
  const taskInput = document.getElementById('taskInput');
  taskInput.value = tasks[index].text;
  editingIndex = index;
  taskInput.focus();
};

// Update the UI
const updateTasksList = () => {
  const taskList = document.getElementById('task-List');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <div class="taskItem">
        <div class="task ${task.completed ? 'completed' : ''}">
          <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''}>
          <p>${task.text}</p>
        </div>
        <div class="icons">
          <img src="./img/edit.png" onclick="editTask(${index})">
          <img src="./img/bin.png" onclick="deleteTask(${index})">
        </div>
      </div>
    `;
    listItem.querySelector('.checkbox').addEventListener('change', () => toggleTaskComplete(index));
    taskList.appendChild(listItem);

  });
};

// Update progress stats
const updateStats = () => {
    const completed = tasks.filter(task => task.completed).length;
    const total = tasks.length;
    const progress = total > 0 ? (completed / total) * 100 : 0;
  
    document.getElementById('progress').style.width = `${progress}%`;
    document.getElementById('numbers').textContent = `${completed}/${total}`;
  
    // Fire confetti ONLY when all tasks are completed (and there are tasks)
    if (completed === total && total > 0) {
      blaskConfetti();
    }
  };
// Event listeners
document.getElementById('newtask').addEventListener('click', (e) => {
  e.preventDefault();
  addTask();
});

document.getElementById('taskInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    addTask();
  }
});

// Initialize on page load
window.addEventListener('load', initializeApp);

const blaskConfetti=() => {
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}