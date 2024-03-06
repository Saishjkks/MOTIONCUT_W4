document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
  
    // Retrieve tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    // Render tasks
    function renderTasks() {
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <input type="checkbox" ${task.completed ? 'checked' : ''}>
          <span class="${task.completed ? 'completed' : ''}">${task.name}</span>
          <button class="editBtn">Edit</button>
          <button class="deleteBtn">Delete</button>
        `;
        li.querySelector('.editBtn').addEventListener('click', () => editTask(index));
        li.querySelector('.deleteBtn').addEventListener('click', () => deleteTask(index));
        li.querySelector('input[type="checkbox"]').addEventListener('change', () => toggleCompleted(index));
        taskList.appendChild(li);
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    // Add new task
    addTaskBtn.addEventListener('click', () => {
      const taskName = taskInput.value.trim();
      if (taskName !== '') {
        tasks.push({ name: taskName, completed: false });
        taskInput.value = '';
        renderTasks();
      }
    });
  
    // Edit task
    function editTask(index) {
      const newTaskName = prompt('Enter new task name:', tasks[index].name);
      if (newTaskName !== null) {
        tasks[index].name = newTaskName.trim();
        renderTasks();
      }
    }
  
    // Delete task
    function deleteTask(index) {
      tasks.splice(index, 1);
      renderTasks();
    }
  
    // Toggle task completion
    function toggleCompleted(index) {
      tasks[index].completed = !tasks[index].completed;
      renderTasks();
    }
  
    // Initial rendering
    renderTasks();
});
