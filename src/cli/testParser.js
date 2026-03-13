const path = require("path");
const { parseLockfile } = require("../graph/parseLockfile");
const { resolveLineage } = require("../lineage/resolveLineage");

const lockfile = path.join(__dirname, "../../fixtures/demo/package-lock.json");

const graph = parseLockfile(lockfile);

console.log("Nodes:", graph.nodes.size);
console.log("Edges:", graph.edges.size);
console.log("ReverseEdges:", graph.reverseEdges.size);

console.log("\nAvailable package names:\n");

for (const node of graph.nodes.values()) {
  console.log(node.name);
}

const chains = resolveLineage(graph, "debug");

console.log("\nLineage chains:\n");

if (!chains) {
  console.log("Dependency not found");
} else {
  for (const chain of chains) {
    console.log(chain.join(" -> "));
  }
}