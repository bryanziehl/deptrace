# deptrace

Dependency lineage analysis for Node.js projects.

`deptrace` answers a simple question:

**Why is this dependency installed?**

Modern JavaScript projects often contain deep transitive dependency trees.  
When a package appears in `npm audit` or `node_modules`, it can be difficult to determine how it was introduced.

`deptrace` traces the dependency lineage from your project root to the target package.

---

## Example

Run:

deptrace debug

Output:

Dependency Lineage Report

demo@1.0.0 -> express@5.2.1 -> body-parser@2.2.2 -> debug@4.4.3  
demo@1.0.0 -> express@5.2.1 -> debug@4.4.3  
demo@1.0.0 -> express@5.2.1 -> finalhandler@2.1.1 -> debug@4.4.3  
demo@1.0.0 -> express@5.2.1 -> router@2.2.0 -> debug@4.4.3  
demo@1.0.0 -> express@5.2.1 -> send@1.2.1 -> debug@4.4.3  
demo@1.0.0 -> express@5.2.1 -> serve-static@2.2.1 -> send@1.2.1 -> debug@4.4.3

---

## Installation

Global install:

npm install -g deptrace

Or run directly using npx:

npx deptrace <package-name>

---

## Usage

Run the tool from the root of a Node.js project containing a `package-lock.json`.

deptrace <package-name>

Example:

deptrace debug

---

## Purpose

JavaScript dependency trees can become opaque as projects grow.

`deptrace` exposes the lineage that introduces a dependency into your project, making it easier to:

- investigate `npm audit` alerts
- understand transitive dependencies
- debug unexpected packages in `node_modules`

---

## Troubleshooting

### Command not found (Windows)

If `deptrace` is not recognized after installation, your npm global bin directory may not be in your PATH.

Check your npm prefix:

npm config get prefix

Ensure the returned directory is included in your PATH.

You can always run the tool with:

npx deptrace <package-name>

---

## Current Features

- `package-lock.json` parsing
- dependency graph construction
- dependency lineage tracing

Planned improvements:

- tree-style output
- yarn/pnpm support
- dependency graph visualization