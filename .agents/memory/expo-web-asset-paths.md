---
name: Expo Web asset path interception
description: Why relative /assets/* URLs 404 in Expo Web and how to fix them.
---

# Expo Web intercepts /assets/* paths

When Expo Web (Metro dev server) is running, any browser request to `/assets/*` is handled by Metro's asset server — it treats `/assets/foo.jpg` as a local project file. This means relative artworkUrls like `/assets/1.jpg` from an API will 404 when loaded in the Expo web browser, even though the same images are served correctly by the Vite web app at `/assets/1.jpg`.

**Why:** Metro hijacks the `/assets/` path prefix for local bundled assets in Expo Web.

**How to apply:** Always convert relative artworkUrls to absolute URLs in the mobile data layer. The Expo dev command already exports `EXPO_PUBLIC_DOMAIN=$REPLIT_DEV_DOMAIN`, so `getBaseUrl()` returns the full Replit domain. In `usePodcasts.ts`, map results: `artworkUrl: p.artworkUrl?.startsWith("/") ? \`\${base}\${p.artworkUrl}\` : p.artworkUrl`.
