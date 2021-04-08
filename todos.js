let submitForm = document.querySelector("#todo-form");
let inputTodo = document.querySelector("#todo");
let listGroup = document.querySelector(".list-group");
let firstCard = document.querySelectorAll(".card-body")[0];
let secondCard = document.querySelectorAll(".card-body")[1];
let clearBtn = document.querySelector("#clear-todos");
let searchFilter = document.querySelector("#filter");

addEvent();

function addEvent() {
  submitForm.addEventListener("submit", addTodoToUI);
  secondCard.addEventListener("click", removeTodo);
  clearBtn.addEventListener("click", clearAllTodos);
  document.addEventListener("DOMContentLoaded", loadTodoFromStorage);
  searchFilter.addEventListener("keyup", searchTodo);
}

function addTodoToUI(e) {
  let todos = checkTodoStorage();
  if (inputTodo.value === "") {
    alertMessage("danger", "Todo boş ola bilməz");
  } else if (inputTodo.value && todos.includes(inputTodo.value)) {
    alertMessage("warning", "Todo tekrarlana bilməz");
  } else {
    creatTodoList(inputTodo.value.trim());
    alertMessage("success", "Todo əlavə olundu");
    loadTodoToStorage();
  }
  inputTodo.value = "";
  e.preventDefault();
}

function creatTodoList(newtodo) {
  let list = document.createElement("li");
  list.innerHTML = newtodo;
  list.className = "list-group-item d-flex justify-content-between";
  let link = document.createElement("a");
  link.innerHTML = "<i class = 'fa fa-remove'></i>";
  link.className = "delete-item";
  listGroup.appendChild(list);
  list.appendChild(link);
}

function alertMessage(type, message) {
  let alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type}`;
  alertDiv.innerHTML = message;
  firstCard.appendChild(alertDiv);

  setTimeout(function () {
    alertDiv.remove();
  }, 1000);
}

function removeTodo(e) {
  let todos = checkTodoStorage();
  todos.forEach((todo, index) => {
    if (e.target.parentElement.parentElement.textContent === todo) {
      e.target.parentElement.parentElement.remove();
      todos.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  });
}

function clearAllTodos(e) {
  listGroup.remove();
  localStorage.clear();
}

function checkTodoStorage() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function loadTodoToStorage() {
  let todos = checkTodoStorage();
  todos.push(inputTodo.value.trim());
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodoFromStorage() {
  let todos = checkTodoStorage();
  todos.forEach((todo) => {
    creatTodoList(todo);
  });
}

function searchTodo() {
  let search = searchFilter.value.toLowerCase();
  let list = document.querySelectorAll(".list-group-item");
  list.forEach((item,index) =>{
     _item = item.textContent.toLowerCase();
    if (_item.indexOf(search) == -1) {
      item.classList.add("hide");
    } else 
    {
        item.classList.remove("hide");
    }
  })
}
