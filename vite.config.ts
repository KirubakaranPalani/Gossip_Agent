import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [cloudflare({ viteEnvironment: { name: "worker" } })],
  appType: "spa",
  server: { host: "0.0.0.0" },
  preview: { host: "0.0.0.0" },
});
