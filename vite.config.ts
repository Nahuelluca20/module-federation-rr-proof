/* eslint-disable @typescript-eslint/ban-ts-comment */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "host",
      remotes: {
        remote: "http://localhost:3001/assets/remoteEntry.js",
      },
      exposes: {
        "./root": "./src/App",
      },
      shared: ["react", "react-dom", "react-router-dom"],
    }),
  ],
  server: {
    port: 5173,
  },
  build: {
    target: "esnext",
  },
});
