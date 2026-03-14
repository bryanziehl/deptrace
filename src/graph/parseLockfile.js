/*
deptrace

Dependency lineage analysis for Node.js projects.

https://github.com/bryanziehl/deptrace
*/

const fs = require("fs");

function normalizeName(pkgPath, pkgData) {
  if (pkgData.name) return pkgData.name;

  if (!pkgPath) return "root";

  return pkgPath.replace(/^node_modules\//, "");
}

function parseLockfile(lockfilePath) {

  const raw = fs.readFileSync(lockfilePath, "utf8");
  const lock = JSON.parse(raw);

  const nodes = new Map();
  const edges = new Map();
  const reverseEdges = new Map();

  const packages = lock.packages || {};

  // Build nodes
  for (const [pkgPath, pkgData] of Object.entries(packages)) {

    const name = normalizeName(pkgPath, pkgData);
    const version = pkgData.version || "0.0.0";

    const id = `${name}@${version}`;

    nodes.set(id, { name, version, path: pkgPath });

    edges.set(id, []);
    reverseEdges.set(id, []);
  }

  // Build edges using dependency map
  for (const [pkgPath, pkgData] of Object.entries(packages)) {

    const parentName = normalizeName(pkgPath, pkgData);
    const parentVersion = pkgData.version || "0.0.0";
    const parentId = `${parentName}@${parentVersion}`;

    if (!pkgData.dependencies) continue;

    for (const depName of Object.keys(pkgData.dependencies)) {

      // find matching node
      for (const nodeId of nodes.keys()) {

        if (nodeId.startsWith(depName + "@")) {

          edges.get(parentId).push(nodeId);
          reverseEdges.get(nodeId).push(parentId);

        }
      }
    }
  }

  return { nodes, edges, reverseEdges };
}

module.exports = { parseLockfile };