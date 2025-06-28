let filter = "all";

window.onload = () => {
  loadTasks();
};

// Load + filter tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  document.getElementById('taskList').innerHTML = '';

  tasks.forEach(task => {
    if (
      filter === "all" ||
      (filter === "completed" && task.completed) ||
      (filter === "pending" && !task.completed)
    ) {
      renderTask(task);
    }
  });
}

// Add new task
function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  if (text === '') return;

  const task = {
    id: Date.now(),      // unique id using timestamp
    text: text,
    completed: false
  };

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  input.value = '';
  loadTasks();
}

// Render task on screen
function renderTask(task) {
  const li = document.createElement('li');
  if (task.completed) li.classList.add('completed');

  li.innerHTML = `
    <span onclick="toggleComplete(${task.id})">${task.text}</span>
    <div>
      <button onclick="editTask(${task.id})">Edit</button>
      <button onclick="deleteTask(${task.id})">Delete</button>
    </div>
  `;

  document.getElementById('taskList').appendChild(li);
}

// Toggle complete status
function toggleComplete(id) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updated = tasks.map(t =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );

  localStorage.setItem('tasks', JSON.stringify(updated));
  loadTasks();
}

// Delete a task
function deleteTask(id) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updated = tasks.filter(t => t.id !== id);
  localStorage.setItem('tasks', JSON.stringify(updated));
  loadTasks();
}

// Edit a task
function editTask(id) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const task = tasks.find(t => t.id === id);
  const newText = prompt("Edit your task:", task.text);
  if (!newText) return;

  const updated = tasks.map(t =>
    t.id === id ? { ...t, text: newText } : t
  );

  localStorage.setItem('tasks', JSON.stringify(updated));
  loadTasks();
}

// Set filter type
function filterTasks(type) {
  filter = type;
  loadTasks();
}

// 🌙 Dark Mode Toggle
document.getElementById('darkModeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});
