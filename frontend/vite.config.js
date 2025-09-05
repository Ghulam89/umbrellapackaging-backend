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
    allowedHosts: ["umbrellapackaging.com", "www.umbrellapackaging.com"],
    strictPort: true,
  },

  ssr: {
    noExternal: [
      "react-helmet-async",
      "react-dom/server",
      "react-redux",
      "redux-persist",
      "@reduxjs/toolkit",
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
          // Remove 'react' from manualChunks since it's already handled by Vite
          redux: ["react-redux", "@reduxjs/toolkit", "redux-persist"],
          // You can add other logical chunks here
          vendor: ["react-helmet-async", "lottie-react"],
        },
      },
    },
  },
});