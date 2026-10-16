/**
 * Configured by Hafez for Australian Mining & Manufacturing
 * Production & Development Vite Configuration
 */
import { defineConfig } from "./hafez-vite-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts
    server: { entry: "server" },
    prerender: {
      routes: ["/", "/products", "/about", "/contact", "/privacy"],
      crawlLinks: true,
    },
  },
});
