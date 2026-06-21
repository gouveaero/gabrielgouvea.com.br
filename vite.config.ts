import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Build outputs to dist/ (served by nginx in production via Dockerfile).
// _concepts/ is reference-only and is never imported, so it is excluded from the bundle.
export default defineConfig({
  plugins: [react()],
  server: { host: "127.0.0.1", port: 5173 },
  build: {
    target: "es2020",
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1200,
  },
});
