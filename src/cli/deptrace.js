/*
deptrace

Dependency lineage analysis for Node.js projects.

https://github.com/bryanziehl/deptrace
*/

const path = require("path");
const { parseLockfile } = require("../graph/parseLockfile");
const { resolveLineage } = require("../lineage/resolveLineage");

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log("Usage: deptrace <package-name>");
  process.exit(1);
}

const target = args[0];

const lockfile = path.join(process.cwd(), "package-lock.json");

let graph;

try {
  graph = parseLockfile(lockfile);
} catch (err) {
  console.error("Could not read package-lock.json in this directory.");
  process.exit(1);
}

const chains = resolveLineage(graph, target);

console.log("\nDependency Lineage Report\n");

if (!chains || chains.length === 0) {
  console.log("Dependency not found.");
  process.exit(0);
}

for (const chain of chains) {
  console.log(chain.join(" -> "));
}