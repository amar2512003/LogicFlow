import json
from collections import defaultdict, deque
from http.server import BaseHTTPRequestHandler


def is_dag(nodes, edges):
    node_ids = {node.get("id") for node in nodes}
    adjacency = defaultdict(list)
    in_degree = {node_id: 0 for node_id in node_ids}

    for edge in edges:
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

    return visited == len(node_ids)


class handler(BaseHTTPRequestHandler):
    def _send_json(self, status, payload):
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(payload).encode("utf-8"))

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_POST(self):
        try:
            length = int(self.headers.get("Content-Length", 0))
            pipeline = json.loads(self.rfile.read(length) or b"{}")
            nodes = pipeline.get("nodes", [])
            edges = pipeline.get("edges", [])
            self._send_json(200, {
                "num_nodes": len(nodes),
                "num_edges": len(edges),
                "is_dag": is_dag(nodes, edges),
            })
        except Exception:
            self._send_json(400, {"error": "Invalid pipeline payload"})
