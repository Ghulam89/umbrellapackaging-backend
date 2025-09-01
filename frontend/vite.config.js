// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],

  resolve: {
    alias: {
      "redux-persist": "redux-persist/es", 
    },
  },

  server: {
    allowedHosts: ["umbrellapackaging.com"],
    strictPort: true,
  },

  ssr: {
    noExternal: [
      "react-helmet-async",
      "react-dom/server",
      "react-redux",
      "redux-persist",
      "@reduxjs/toolkit",
      "react-quill",
      "jodit-react",
      "lottie-react"
    ],
  },

  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-helmet-async",
      "react-redux",
      "@reduxjs/toolkit",
      'lottie-react'
    ],
    exclude: [
      "react-dom/server",
    ],
  },

  build: {
    target: "esnext",
    sourcemap: false, 
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          redux: ["react-redux", "@reduxjs/toolkit", "redux-persist"],
          editor: ["react-quill", "jodit-react"],
        },
      },
    },
  },
});
