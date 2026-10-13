const http = require("node:http");
const { addTodo, listTodos } = require("./todos");

const PAGE = `<!doctype html>
<html>
  <head><title>Todo Demo</title></head>
  <body>
    <h1>Todo Demo</h1>
    <form id="f"><input id="t" placeholder="New todo" required><button>Add</button></form>
    <ul id="list"></ul>
    <script>
      async function load() {
        const todos = await (await fetch("/api/todos")).json();
        document.getElementById("list").innerHTML =
          todos.map((t) => "<li>" + t.title + "</li>").join("");
      }
      document.getElementById("f").onsubmit = async (e) => {
        e.preventDefault();
        await fetch("/api/todos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: document.getElementById("t").value }),
        });
        e.target.reset();
        load();
      };
      load();
    </script>
  </body>
</html>`;

function send(res, status, body, type = "application/json") {
  res.writeHead(status, { "Content-Type": type });
  res.end(type === "application/json" ? JSON.stringify(body) : body);
}

function createApp() {
  return http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/") {
      return send(res, 200, PAGE, "text/html");
    }
    if (req.method === "GET" && req.url === "/health") {
      return send(res, 200, { status: "ok" });
    }
    if (req.method === "GET" && req.url === "/api/todos") {
      return send(res, 200, listTodos());
    }
    if (req.method === "POST" && req.url === "/api/todos") {
      let data = "";
      req.on("data", (chunk) => (data += chunk));
      req.on("end", () => {
        try {
          const { title } = JSON.parse(data);
          if (typeof title !== "string" || !title.trim()) {
            return send(res, 400, { error: "title is required" });
          }
          return send(res, 201, addTodo(title));
        } catch {
          return send(res, 400, { error: "invalid JSON" });
        }
      });
      return;
    }
    send(res, 404, { error: "not found" });
  });
}

module.exports = { createApp };
