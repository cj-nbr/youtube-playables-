// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// In dev the API runs on a separate Express server (default :4000). Proxying
// `/api` makes the frontend talk to it on the same origin, so there is no
// cross-origin cookie/CORS fragility and no hardcoded backend host. In
// production set PUBLIC_API_URL to the real backend origin instead.
export default defineConfig({
  site: 'https://youtubeplayables.caloriecalculatorfree.com',
  vite: {
    plugins: [tailwindcss()],
    server: {
      // In dev the API runs on a separate Express server (default :4000).
      // Proxying `/api` makes the frontend talk to it on the same origin, so
      // there is no cross-origin cookie/CORS fragility and no hardcoded host.
      // For production set PUBLIC_API_URL to the backend origin instead.
      proxy: {
        '/api': {
          target: 'http://localhost:4000',
          changeOrigin: true,
        },
      },
    },
  },
  // Removed @astrojs/sitemap; using manual public/sitemap.xml instead.
});
