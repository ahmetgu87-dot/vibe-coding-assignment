const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Render todos on page load
render();

// Add with button click
addBtn.addEventListener("click", addTodo);

// Add with Enter key
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTodo();
});

function addTodo() {
  const text = input.value.trim();
  if (!text) return;

  todos.push({ id: Date.now(), text });
  input.value = "";
  save();
  render();
}

function render() {
  list.innerHTML = "";

  todos.forEach((t) => {
    const li = document.createElement("li");
    li.className = "item";

    const span = document.createElement("span");
    span.textContent = t.text;

    const actions = document.createElement("div");
    actions.className = "actions";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => editTodo(t.id));

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => deleteTodo(t.id));

    actions.appendChild(editBtn);
    actions.appendChild(delBtn);

    li.appendChild(span);
    li.appendChild(actions);

    list.appendChild(li);
  });
}

function editTodo(id) {
  const todo = todos.find((t) => t.id === id);
  if (!todo) return;

  const newText = prompt("Edit your task:", todo.text);
  if (newText === null) return; // user canceled

  const cleaned = newText.trim();
  if (!cleaned) return;

  todo.text = cleaned;
  save();
  render();
}

function deleteTodo(id) {
  todos = todos.filter((t) => t.id !== id);
  save();
  render();
}

function save() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

