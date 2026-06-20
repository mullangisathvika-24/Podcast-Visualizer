# Podcast Visualizer

A podcast-to-visual knowledge platform that converts podcast content into visual learning assets — posters, articles, and video thumbnails — with AI-powered generation via Gemini.

## Run & Operate

- `pnpm --filter @workspace/podcast-visualizer run dev` — run the frontend (Vite + React)
- `pnpm --filter @workspace/api-server run dev` — run the API server (Express)
- `pnpm run typecheck` — full typecheck across all packages
- Optional env: `GEMINI_API_KEY` — enables AI podcast generation via Gemini

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 19 + Vite 7, Tailwind CSS v4
- API: Express 5 + @google/genai (Gemini)
- No database — podcasts stored as presets in the API server

## Where things live

- `artifacts/podcast-visualizer/src/` — React frontend (App.tsx, pages/Dashboard.tsx, components/)
- `artifacts/api-server/src/routes/podcasts.ts` — GET /api/podcasts + POST /api/generate-podcast
- `artifacts/podcast-visualizer/public/assets/` — episode artwork images (1.jpg–10.jpg, etc.)
- `artifacts/podcast-visualizer/src/assets/` — imported assets (video thumbnail.jpg)

## Architecture decisions

- App is fully client-rendered (Vite SPA); no SSR
- Preset podcasts are hardcoded in the API server for instant load without a DB
- AI generation uses Gemini 2.0 Flash with structured JSON output schema
- Frontend gracefully falls back to local preset data if the API is unavailable
- Dark/light theme toggle managed via React state; persisted via localStorage

## Product

Users can browse a curated set of business podcast insights visualized as posters, articles, and video thumbnails. They can also generate new podcast visualizations from any topic using Gemini AI.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- `GEMINI_API_KEY` must be set in Secrets for AI generation to work; the app works fine without it (presets only)
- Asset imports in `src/pages/Dashboard.tsx` and `src/components/VideosSection.tsx` use `../assets/` (relative to src/)
- The `@google/genai` dependency is in `artifacts/api-server`, not in the frontend

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
