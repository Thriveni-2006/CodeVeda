const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage when page loads
window.addEventListener('DOMContentLoaded', loadTasks);

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  createTaskElement(taskText);
  saveTask(taskText);
  taskInput.value = '';
}

// Create task HTML
function createTaskElement(text, completed = false) {
  const li = document.createElement('li');
  li.textContent = text;
  if (completed) li.classList.add('completed');

  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    updateStorage();
  });

  const delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  delBtn.className = 'delete-btn';
  delBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    li.remove();
    updateStorage();
  });

  li.appendChild(delBtn);
  taskList.appendChild(li);
}

// Save new task to localStorage
function saveTask(text) {
  const tasks = getStoredTasks();
  tasks.push({ text, completed: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load saved tasks
function loadTasks() {
  const tasks = getStoredTasks();
  tasks.forEach(task => createTaskElement(task.text, task.completed));
}

// Update storage when task is toggled or deleted
function updateStorage() {
  const updatedTasks = [];
  taskList.querySelectorAll('li').forEach(li => {
    updatedTasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

function getStoredTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}
