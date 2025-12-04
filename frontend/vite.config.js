import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    plugins: [react()],

    server: {
        port: 5173,
    },

    css: {
        preprocessorOptions: {
            scss: {
                silenceDeprecations: ["import", "mixed-decls", "color-functions", "global-builtin"],
            },
        },
    },
});
