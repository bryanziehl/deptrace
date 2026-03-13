function resolveLineage(graph, targetName) {
  const { nodes, reverseEdges } = graph;

  const startNodes = [];

  for (const [id, node] of nodes.entries()) {
    if (node.name === targetName) {
      startNodes.push(id);
    }
  }

  if (startNodes.length === 0) {
    return null;
  }

  const chains = [];

  for (const start of startNodes) {
    const chain = [];
    walk(start, reverseEdges, chain, chains);
  }

  return chains;
}

function walk(nodeId, reverseEdges, chain, chains) {
  chain.push(nodeId);

  const parents = reverseEdges.get(nodeId) || [];

  if (parents.length === 0) {
    chains.push([...chain].reverse());
  } else {
    for (const parent of parents) {
      walk(parent, reverseEdges, chain, chains);
    }
  }

  chain.pop();
}

module.exports = { resolveLineage };