#!/usr/bin/env bash

set -e

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
VENV_DIR="$ROOT_DIR/.venv"

if [ ! -x "$VENV_DIR/bin/python" ]; then
  python3 -m venv "$VENV_DIR"
fi

if ! "$VENV_DIR/bin/python" -c "import fastapi, uvicorn" 2>/dev/null; then
  "$VENV_DIR/bin/pip" install -r "$ROOT_DIR/backend/requirements.txt"
fi

cleanup() {
  kill "$BACKEND_PID" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

(
  cd "$ROOT_DIR/backend"
  "$VENV_DIR/bin/uvicorn" main:app --host 127.0.0.1 --port 8000
) &
BACKEND_PID=$!

cd "$ROOT_DIR/frontend"
if [ ! -d node_modules ]; then
  npm install
fi
npm start
