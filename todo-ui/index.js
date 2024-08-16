const mainForm = document.querySelector("#mainForm");
const mainInput = document.querySelector("#taskInput");

const tasksContainer = document.querySelector("#todos");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

if (JSON.parse(localStorage.getItem("tasks"))) {
  tasks.map(task => {
    createTask(task);
  })
}

mainForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = mainInput.value;

  if (inputValue.trim() === "") {
    return;
  }

  const task = {
    id: new Date().getTime(),
    content: inputValue,
    isCompleted: false,
  };

  tasks.push(task);

  // Store task array in localStorage and create new task
  localStorage.setItem("tasks", JSON.stringify(tasks));
  createTask(task);

  mainForm.reset();
  mainInput.focus();
});

tasksContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete") || e.target.parentElement.classList.contains("delete")) {
    const taskId = e.target.closest("article").id;
    removeTask(taskId);
  }
});

tasksContainer.addEventListener("input", (e) => {
  const taskId = e.target.closest("article").id;

  updateTask(taskId, e.target);
})

// listening for when the user presses enter while editing task
tasksContainer.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();

    e.target.blur();
  }
})


function createTask(task) {
  const taskElement = document.createElement("article");
  taskElement.classList.add("todo");
  taskElement.setAttribute("id", task.id);

  if (task.isCompleted) {
    taskElement.classList.add("complete");
  }

  const taskMarkup = `
    <div>
    <input type="checkbox" name="checkbox" id="${task.id}" ${task.isCompleted ? 'checked' : ''} />
    <span ${!task.isCompleted ? 'contenteditable' : ''}>${task.content}</span>
  </div>

  <div>
    <button class="save">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="#000000"
        viewBox="0 0 256 256"
      >
        <path
          d="M224,152v56a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V152a8,8,0,0,1,16,0v56H208V152a8,8,0,0,1,16,0ZM93.66,85.66,120,59.31V152a8,8,0,0,0,16,0V59.31l26.34,26.35a8,8,0,0,0,11.32-11.32l-40-40a8,8,0,0,0-11.32,0l-40,40A8,8,0,0,0,93.66,85.66Z"
        ></path>
      </svg>
    </button>

    <button class="delete">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="#000000"
        viewBox="0 0 256 256"
      >
        <path
          d="M216,48H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM192,208H64V64H192ZM80,24a8,8,0,0,1,8-8h80a8,8,0,0,1,0,16H88A8,8,0,0,1,80,24Z"
        ></path>
      </svg>
    </button>
  </div>
  `;

  taskElement.innerHTML = taskMarkup;

  tasksContainer.appendChild(taskElement);
}

function removeTask(taskId) {
  tasks = tasks.filter(task => task.id !== parseInt(taskId))

  localStorage.setItem("tasks", JSON.stringify(tasks));
  document.getElementById(taskId).remove();
}

function updateTask(taskId, element) {
  const task = tasks.find(task => task.id === parseInt(taskId));

  if (element.hasAttribute('contenteditable')) {
    task.content = element.textContent;
    
  } else {
    const span = element.nextElementSibling; // getting the editable span element;
    const parent = element.closest('article'); // getting the task element;

    task.isCompleted = !task.isCompleted;

    if (task.isCompleted) {
      span.removeAttribute('contenteditable');
      parent.classList.add('complete');
    } else {
      span.setAttribute('contenteditable', true);
      parent.classList.remove('complete');
    }
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}