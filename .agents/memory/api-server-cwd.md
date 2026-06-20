---
name: API server cwd vs monorepo root
description: process.cwd() in the API server points to its package dir, not the workspace root.
---

# process.cwd() behavior with pnpm filter

When pnpm runs a filtered script (`pnpm --filter @workspace/api-server run dev`), `process.cwd()` inside the running process is the **package directory** (`artifacts/api-server/`), NOT the monorepo root.

**Why:** pnpm sets the working directory to the package before executing the script.

**How to apply:** To reference sibling packages' files from the API server, use:
- `path.join(process.cwd(), "../podcast-visualizer/public/assets")` — go up one level from the package dir to the artifacts folder, then into the sibling package.
- Do NOT use `path.join(process.cwd(), "artifacts/podcast-visualizer/...")` — that would try to find `artifacts/api-server/artifacts/...` which doesn't exist.
