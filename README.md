# VectorShift Frontend Assessment

Compact React + FastAPI implementation for the VectorShift frontend assessment.

## Run

```bash
./start.sh
```

The script installs missing dependencies, starts FastAPI on `127.0.0.1:8000`, and starts React on `localhost:3000`.

## Manual Setup

Backend:

```bash
cd backend
python3 -m venv ../.venv
../.venv/bin/pip install -r requirements.txt
../.venv/bin/uvicorn main:app --host 127.0.0.1 --port 8000
```

Frontend:

```bash
cd frontend
npm install
npm start
```

Generated folders such as `.venv`, `frontend/node_modules`, and `frontend/build` are intentionally ignored.
