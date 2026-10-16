/**
 * Configured by Hafez for Australian Mining & Manufacturing
 * Custom Vite & TanStack Start build configuration
 */
import { defineConfig as defineViteConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import path from "node:path";

export interface HafezTanstackOptions {
  tanstackStart?: Parameters<typeof tanstackStart>[0];
  nitro?: any;
  vite?: any;
}

export function defineConfig(options: HafezTanstackOptions = {}) {
  return defineViteConfig(async ({ command, mode }) => {
    const plugins: any[] = [
      tailwindcss(),
      tsConfigPaths({ projects: ["./tsconfig.json"] }),
      tanstackStart(options.tanstackStart ?? {
        server: { entry: "server" },
      }),
    ];

    if (command === "build") {
      try {
        const { nitro } = await import("nitro/vite");
        plugins.push(
          nitro({
            defaultPreset: "cloudflare-module",
            ...(typeof options.nitro === "object" ? options.nitro : {}),
          })
        );
      } catch (e) {
        console.warn("[Hafez Vite Config] Nitro plugin optional import:", e);
      }
    }

    return {
      resolve: {
        alias: {
          "@": path.resolve(process.cwd(), "src"),
        },
      },
      plugins,
      ...options.vite,
    };
  });
}

export default defineConfig;
