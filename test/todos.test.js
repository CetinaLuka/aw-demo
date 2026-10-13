const test = require("node:test");
const assert = require("node:assert");
const { addTodo, formatTitle } = require("../src/todos");

test("formatTitle trims and capitalizes", () => {
  assert.strictEqual(formatTitle("  buy milk "), "Buy milk");
});

test("addTodo stores a formatted title", () => {
  const todo = addTodo("walk the dog");
  assert.strictEqual(todo.title, "Walk the dog");
  assert.strictEqual(todo.done, false);
});
