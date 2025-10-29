import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  // For GitHub Pages project sites, assets need a base of "/<repo>/"
  // We derive it automatically in CI using GITHUB_REPOSITORY, and default to "/" locally
  base: (process.env.GITHUB_REPOSITORY && `/${process.env.GITHUB_REPOSITORY.split("/")[1]}/`) || "/",
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
