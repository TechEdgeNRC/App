function createReminderButton(time, taskText) {
    const reminderButton = document.createElement('button');
    reminderButton.innerHTML = `<i class="fas fa-clock"></i> ${time}`;
    reminderButton.className = 'reminder-button';
    reminderButton.taskText = taskText;
  
    reminderButton.onclick = function (event) {
      const isActive = reminderButton.classList.contains('active');
      const task = event.target.closest('.task'); // Find the parent task element
  
      if (!isActive) {
        // Deactivate reminders in the same task
        const activeButtons = task.querySelectorAll('.reminder-button.active');
        activeButtons.forEach(activeButton => {
          clearTimeout(activeButton.timeoutId);
          activeButton.classList.remove('active');
          console.log(`Reminder for task "${activeButton.taskText}" at ${activeButton.textContent} deactivated.`);
        });
  
        // Activate the reminder for this specific task
        let milliseconds = parseInt(time) * 60 * 1000;
  
        reminderButton.timeoutId = setTimeout(() => {
          alert(`Reminder: "${taskText}"`);
          delete reminderButton.timeoutId;
          reminderButton.classList.remove('active');
          console.log(`Reminder for task "${taskText}" at ${time} activated.`);
        }, milliseconds);
  
        reminderButton.classList.add('active');
        console.log(`Reminder for task "${taskText}" at ${time} activated.`);
      } else {
        clearTimeout(reminderButton.timeoutId);
        reminderButton.classList.remove('active');
        console.log(`Reminder for task "${taskText}" at ${time} deactivated.`);
      }
    };
  
    return reminderButton;
  }
  
  
  
  function editTask(taskElement, taskText) {
    const newTaskText = prompt('Edit task:', taskText);
    if (newTaskText !== null && newTaskText.trim() !== '') {
      let tasks = JSON.parse(localStorage.getItem('tasks'));
      const index = tasks.indexOf(taskText);
      if (index !== -1) {
        tasks[index] = newTaskText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
  
        // Clear existing tasks
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
  
        // Reload tasks
        tasks.forEach(task => {
          const li = document.createElement('li');
          li.className = 'task';
  
          // Add the task text element
          const taskTextElement = document.createElement('div');
          taskTextElement.classList.add('task-text');
          taskTextElement.textContent = task;
          li.appendChild(taskTextElement);
  
          // Create and append edit button
          const editButton = document.createElement('button');
          editButton.textContent = 'Edit';
          editButton.className = 'edit-button';
          editButton.onclick = function () {
            editTask(li, task);
          };
          li.appendChild(editButton);
  
          // Create and append delete button
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Delete';
          deleteButton.className = 'delete-button';
          deleteButton.onclick = function () {
            deleteTask(li, task);
          };
          li.appendChild(deleteButton);
  
          // Create and append reminder buttons
          const reminderButton10min = createReminderButton('10 min', taskText);
          const reminderButton30min = createReminderButton('30 min', taskText);
          const reminderButton1hr = createReminderButton('1 hr', taskText);
  
          li.appendChild(reminderButton10min);
          li.appendChild(reminderButton30min);
          li.appendChild(reminderButton1hr);
  
          // Apply styling explicitly to the task element
          li.style.display = 'flex'; // For example, set display to flex
          li.style.marginBottom = '10px'; // Apply margin or other necessary styles
  
          // Append the task to the taskList
          taskList.appendChild(li);
        });
      }
    }
  }
  
  
  
  
  

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');

  if (taskInput.value !== '') {
    const taskText = taskInput.value;

    const li = document.createElement('li');
    li.className = 'task';
    li.textContent = taskText;

    const buttonsSpan = document.createElement('span');
    buttonsSpan.className = 'buttons';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.onclick = function () {
      deleteTask(li, taskText);
    };

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit-button';
    editButton.onclick = function () {
      editTask(li, taskText);
    };

    const reminderButtonsSpan = document.createElement('span');
    reminderButtonsSpan.className = 'reminder-buttons';

    const reminderButton10min = createReminderButton('10 min', taskText);
    const reminderButton30min = createReminderButton('30 min', taskText);
    const reminderButton1hr = createReminderButton('1 hr', taskText);

    buttonsSpan.appendChild(editButton);
    buttonsSpan.appendChild(deleteButton);

    reminderButtonsSpan.appendChild(reminderButton10min);
    reminderButtonsSpan.appendChild(reminderButton30min);
    reminderButtonsSpan.appendChild(reminderButton1hr);

    li.appendChild(buttonsSpan);
    li.appendChild(reminderButtonsSpan);

    taskList.appendChild(li);

    saveTask(taskText);

    taskInput.value = '';
  }
}

function editTask(taskElement, taskText) {
    const newTaskText = prompt('Edit task:', taskText);
    if (newTaskText !== null && newTaskText.trim() !== '') {
      let tasks = JSON.parse(localStorage.getItem('tasks'));
      const index = tasks.indexOf(taskText);
      if (index !== -1) {
        tasks[index] = newTaskText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
  
        // Clear existing tasks
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
  
        // Reload tasks
        tasks.forEach(task => {
          const li = document.createElement('li');
          li.className = 'task';
  
          // Add the task text element
          const taskTextElement = document.createElement('div');
          taskTextElement.classList.add('task-text');
          taskTextElement.textContent = task;
          li.appendChild(taskTextElement);
  
          // Create and append edit button
          const editButton = document.createElement('button');
          editButton.textContent = 'Edit';
          editButton.className = 'edit-button';
          editButton.onclick = function () {
            editTask(li, task);
          };
          li.appendChild(editButton);
  
          // Create and append delete button
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Delete';
          deleteButton.className = 'delete-button';
          deleteButton.onclick = function () {
            deleteTask(li, task);
          };
          li.appendChild(deleteButton);
  
          // Create and append reminder buttons
          const reminderButton10min = createReminderButton('10 min', taskText);
          const reminderButton30min = createReminderButton('30 min', taskText);
          const reminderButton1hr = createReminderButton('1 hr', taskText);
  
          li.appendChild(reminderButton10min);
          li.appendChild(reminderButton30min);
          li.appendChild(reminderButton1hr);
  
          // Apply styling explicitly to the task element
          li.style.display = 'flex'; // For example, set display to flex
          li.style.marginBottom = '10px'; // Apply margin or other necessary styles
  
          // Append the task to the taskList
          taskList.appendChild(li);
        });
      }
    }
  }
  
  
  
  
  
  
  
  
  
  

function deleteTask(taskElement, taskText) {
  taskElement.remove();

  let tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks = tasks.filter(task => task !== taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function saveTask(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  const taskList = document.getElementById('taskList');
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task';
    li.textContent = task;

    const buttonsSpan = document.createElement('span');
    buttonsSpan.className = 'buttons';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.onclick = function () {
      deleteTask(li, task);
    };

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit-button';
    editButton.onclick = function () {
      editTask(li, task);
    };

    const reminderButtonsSpan = document.createElement('span');
    reminderButtonsSpan.className = 'reminder-buttons';

    const reminderButton10min = createReminderButton('10 min', task);
    const reminderButton30min = createReminderButton('30 min', task);
    const reminderButton1hr = createReminderButton('1 hr', task);

    buttonsSpan.appendChild(editButton);
    buttonsSpan.appendChild(deleteButton);

    reminderButtonsSpan.appendChild(reminderButton10min);
    reminderButtonsSpan.appendChild(reminderButton30min);
    reminderButtonsSpan.appendChild(reminderButton1hr);

    li.appendChild(buttonsSpan);
    li.appendChild(reminderButtonsSpan);

    taskList.appendChild(li);
  });
}

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    addTask();
  }
}

window.onload = function () {
  loadTasks();

  const taskInput = document.getElementById('taskInput');
  taskInput.addEventListener('keypress', handleKeyPress);
};
