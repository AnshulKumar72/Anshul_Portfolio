import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: "esnext", // Use modern JavaScript for smaller bundles
    minify: "esbuild", // Use esbuild for faster minification
    sourcemap: false, // Disable sourcemaps in production
    chunkSizeWarningLimit: 500, // Adjust chunk size warning limit
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"], // Separate vendor libraries
        },
      },
    },
  },
  server: {
    open: true, // Automatically open the browser
    hmr: true, // Enable Hot Module Replacement
  },
  optimizeDeps: {
    include: ["react", "react-dom"], // Pre-bundle frequently used dependencies
  },
});