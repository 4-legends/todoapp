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
  todoInput.value = "";
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
    <p id="todo-${index}" class="${
      item.disabled ? "disabled" : ""
    }" onclick="editTask(${index})">
    ${item.text}
    </p>
    </div>
    `;
    p.querySelector(".todo-checkbox").addEventListener("change", () => {
      toggleTask(index);
    });
    todoList.appendChild(p);
  });
  todoCount.innerHTML = todo.length;
}

const saveToLocalStorage = () => {
  localStorage.setItem("todo", JSON.stringify(todo));
};

function toggleTask(idx) {
  todo[idx].disabled = !todo[idx].disabled;
  saveToLocalStorage();
  displayTasks();
}

function editTask(idx) {
  const currEle = document.getElementById(`todo-${idx}`);
  const currText = todo[idx].text;
  const inputEle = document.createElement("input");
  inputEle.value = currText;
  currEle.replaceWith(inputEle);
  inputEle.focus();
  inputEle.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
      const updatedText = inputEle.value.trim();
      if (updatedText) {
        todo[idx].text = updatedText;
        saveToLocalStorage();
      }
      displayTasks();
    }
  });
}
