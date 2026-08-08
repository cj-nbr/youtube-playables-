// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import path from 'node:path';
import node from '@astrojs/node';

// In dev the API runs on a separate Express server (default :4000). Proxying
// `/api` makes the frontend talk to it on the same origin, so there is no
// cross-origin cookie/CORS fragility and no hardcoded backend host. In
// production set PUBLIC_API_URL to the real backend origin instead.
export default defineConfig({
  site: 'https://youtubeplayables.caloriecalculatorfree.com',
  adapter: node({
    mode: 'static'
  }),
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@lib': path.resolve('./src/lib'),
        '@subscription': path.resolve('./src/subscription'),
      },
    },
    server: {
      // In dev the API runs on a separate Express server (default :4000).
      // Proxying `/api` makes the frontend talk to it on the same origin, so
      // there is no cross-origin cookie/CORS fragility and no hardcoded host.
      // For production set PUBLIC_API_URL to the real backend origin instead.
      proxy: {
        '/api': {
          target: 'http://localhost:4000',
          changeOrigin: true,
        },
      },
    },
  },
  public: {
    "/app": {
      entry: "src/pages/app.astro",
    },
  },
  // Removed @astrojs/sitemap; using manual public/sitemap.xml instead.
});