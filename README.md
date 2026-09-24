# CodeArena Frontend

Vite + React UI for testing the CodeArena Runner service locally

(`POST /api/v1/runner/execute`).

## Run

```bash
cd frontend
npm install
npm run dev
```

Open <http://localhost:5173>. The dev server proxies `/api` and `/actuator`
to the runner backend on `http://localhost:8081`, so no CORS setup is needed.

## Requirements

- Node.js 18+
- The CodeArena runner stack running on port 8081
  (`docker compose up -d --build runner` at the repo root)

## Build

```bash
npm run build   # outputs dist/
```