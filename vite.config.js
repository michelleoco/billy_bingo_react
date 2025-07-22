import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/billy_bingo_react/",
  server: {
    port: 3000, // Specify the port for the development server
  },
});
