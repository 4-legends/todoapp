let todo = JSON.parse(globalThis.window.localStorage.getItem("todo")) || [];
let todoInput = document.getElementById("todoInput");
var todoCount = document.getElementById("todoCount");
let todoList = document.getElementById("todoList");

let addButton = document.querySelector(".btn");
let deleteButton = document.getElementById("deleteButton");

document.addEventListener("DOMContentLoaded", function () {
  addButton.addEventListener("click", addTask);
  todoInput.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
      event.preventDefault();
      addTask();
    }
  });
  deleteButton.addEventListener("click", deleteAllTasks);
  displayTasks();
});

const addTask = () => {
  let newTask = todoInput.value.trim();

  if (newTask.length > 0) {
    todo.push({
      text: newTask,
      disabled: false,
    });
  }
  saveToLocalStorage();
  displayTasks();
};

const deleteAllTasks = () => {
  todo = [];
  saveToLocalStorage();
  displayTasks();
};

function displayTasks() {
  todoList.innerHTML = "";
  // run a for loop for each todo aray index and display each index
  todo.forEach((item, index) => {
    const p = document.createElement("p");
    p.innerHTML = `
    <div class="todo-container">
    <input type="checkbox" class="todo-checkbox" 
    id = "input-${index}" ${item.disabled ? "checked" : ""}>
    <p id="todo-${index}" class="${item.disabled ? "disabled" : ""}">
    ${item.text}
    </p>
    </div>
    `;
    p.querySelector(".todo-checkbox").addEventListener("change", () => {
      toggleTask(index);
    });
    todoList.appendChild(p);
  });
  todoCount.textContent = todo.length;
}

const saveToLocalStorage = () => {
  localStorage.setItem("todo", JSON.stringify(todo));
};

function toggleTask(idx) {
  todo[idx].disabled = !todo[idx].disabled;
  saveToLocalStorage();
  displayTasks();
}
