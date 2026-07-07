from collections import defaultdict, deque
from typing import Any

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


class Pipeline(BaseModel):
    nodes: list[dict[str, Any]]
    edges: list[dict[str, Any]]


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    node_ids = {node.get("id") for node in pipeline.nodes}
    adjacency = defaultdict(list)
    in_degree = {node_id: 0 for node_id in node_ids}

    for edge in pipeline.edges:
        source, target = edge.get("source"), edge.get("target")
        if source in node_ids and target in node_ids:
            adjacency[source].append(target)
            in_degree[target] += 1

    queue = deque(node_id for node_id, degree in in_degree.items() if degree == 0)
    visited = 0
    while queue:
        current = queue.popleft()
        visited += 1
        for neighbor in adjacency[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return {
        "num_nodes": len(pipeline.nodes),
        "num_edges": len(pipeline.edges),
        "is_dag": visited == len(node_ids),
    }
