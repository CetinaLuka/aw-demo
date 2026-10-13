# aw-demo

A small todo web app built with plain Node.js (no dependencies), used to demo agentic GitHub workflows.

## Requirements

- Node.js 20 or newer

## Running

```bash
npm start      # serves on http://localhost:3000 (override with PORT)
npm test       # runs tests with the built-in node:test runner
```

## Project structure

| Path | Purpose |
| --- | --- |
| `src/server.js` | Entry point; starts the HTTP server |
| `src/app.js` | HTTP routes and the single-page UI |
| `src/todos.js` | In-memory todo store and title formatting |
| `test/todos.test.js` | Unit tests for the todo logic |
| `.github/workflows/ci.yml` | CI workflow that runs `npm test` |

## API

| Method | Path | Description |
| --- | --- | --- |
| GET | `/` | HTML UI for listing and adding todos |
| GET | `/health` | Returns `{ "status": "ok" }` |
| GET | `/api/todos` | Lists all todos |
| POST | `/api/todos` | Creates a todo from `{ "title": "..." }`; returns 201, or 400 if the title is missing or the JSON is invalid |

A todo looks like `{ "id": 1, "title": "Buy milk", "done": false }`. Titles are trimmed and capitalized. Data is stored in memory and lost on restart.

## CI

The `CI` workflow runs on pushes to `main`, pull requests and manual dispatch. It installs Node 20 and runs `npm test`.