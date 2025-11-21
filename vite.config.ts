import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(new URL(import.meta.url)));

export default defineConfig({
  plugins: [react(), tailwindcss()] as PluginOption[],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: [".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx", ".json"],
  },
  server: {
    port: 5173,
    open: true,
    warmup: {
      clientFiles: [
        "./src/main.tsx",
        "./src/routes/_layout.tsx",
        "./src/routes/index.tsx",
        "./src/routes/calculator.tsx",
        "./src/components/calculator/index.ts",
        "./src/hooks/useCalculator.ts",
      ],
    },
  },
  build: {
    target: "esnext",
    sourcemap: true,
    minify: "esbuild",
    cssMinify: true,
    cssCodeSplit: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom")) {
              return "vendor-react";
            }
            if (id.includes("react-router")) {
              return "vendor-router";
            }
            if (id.includes("lucide-react")) {
              return "vendor-icons";
            }
            return "vendor";
          }
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split(".") ?? [];
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext ?? "")) {
            return "assets/images/[name]-[hash][extname]";
          }
          if (/woff2?|eot|ttf|otf/i.test(ext ?? "")) {
            return "assets/fonts/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router", "react-router-dom"],
    exclude: [],
  },
  esbuild: {
    target: "esnext",
    legalComments: "none",
  },
});
