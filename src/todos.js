const todos = [];
let nextId = 1;

// Titles are meant to be trimmed and start with an uppercase letter.
function formatTitle(title) {
  return title.trim();
}

function addTodo(title) {
  const todo = { id: nextId++, title: formatTitle(title), done: false };
  todos.push(todo);
  return todo;
}

function listTodos() {
  return [...todos];
}

module.exports = { addTodo, listTodos, formatTitle };
