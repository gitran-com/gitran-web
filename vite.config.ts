import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
  },
  plugins: [reactRefresh()],
  resolve: {
    alias: [
      {
        find: /@\//,
        replacement: path.join(__dirname, "./src/"),
      },
    ],
  },
});
