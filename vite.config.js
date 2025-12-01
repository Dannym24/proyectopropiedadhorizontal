import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Propiedad Horizontal',
        short_name: 'PropH',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0d6efd',
        icons: [
          {
            src: '/vite.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
          },
        ],
      },
    }),
  ],
  server: {
    proxy: {
      '/properties': 'http://localhost:5000',  
      '/register': 'http://localhost:5000',   
      '/login': 'http://localhost:5000',      
    },
  },
});
