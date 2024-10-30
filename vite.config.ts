import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "build",
  },
  server: {
    open: true,
    strictPort: true,
    port: 4010,
    host: true,
    hmr: {
      port: 4010,
      clientPort: 4010,
    },
  },
  preview: {
    open: true,
    strictPort: true,
    port: 4014,
    host: true,
  },
});
