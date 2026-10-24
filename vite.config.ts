import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { fileURLToPath, URL } from 'node:url';

const isProd = process.env.NODE_ENV === 'production';

const pwaPlugin = VitePWA({
  registerType: 'autoUpdate',
  includeAssets: ['favicon.svg', 'robots.txt'],
  manifest: {
    name: "KARTHI's Birthday Wishes",
    short_name: 'KARTHI Birthday',
    description: 'A luxury cinematic birthday surprise for KARTHI',
    theme_color: '#0a0a0a',
    background_color: '#0a0a0a',
    display: 'standalone',
    orientation: 'portrait',
    icons: [
      { src: '/favicon.svg', sizes: '192x192', type: 'image/svg+xml' },
      { src: '/favicon.svg', sizes: '512x512', type: 'image/svg+xml' },
    ],
  },
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'gallery-images',
          expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 },
        },
      },
    ],
  },
});

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/karthi-birthday-wishes/' : '/',
  plugins: [
    react(),
    // Only include the PWA plugin in non-production builds to avoid Workbox
    // writing absolute Windows paths that can break when the project folder
    // contains special characters (like apostrophes).
    ...(isProd ? [] : [pwaPlugin]),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion', 'gsap'],
          media: ['react-player', '@react-pdf/renderer'],
        },
      },
    },
  },
});
