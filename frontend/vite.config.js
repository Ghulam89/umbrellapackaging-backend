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
    // Prevent browser caching in development mode
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
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
    minify: 'esbuild', // Faster than terser
    cssMinify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks for better caching
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('react-redux') || id.includes('@reduxjs/toolkit') || id.includes('redux-persist')) {
              return 'redux-vendor';
            }
            if (id.includes('react-router')) {
              return 'router-vendor';
            }
            if (id.includes('axios')) {
              return 'axios-vendor';
            }
            if (id.includes('swiper')) {
              return 'swiper-vendor';
            }
            // Other vendor libraries
            return 'vendor';
          }
          // Component chunks for better code splitting
          if (id.includes('/components/')) {
            const componentName = id.split('/components/')[1]?.split('/')[0];
            if (componentName && ['Hero', 'CustomPackaging', 'CustomBoxMaterial'].includes(componentName)) {
              return `component-${componentName.toLowerCase()}`;
            }
            return 'components';
          }
        },
      },
    },
  },
});