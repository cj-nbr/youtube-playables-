// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://youtubeplayables.caloriecalculatorfree.com',
  vite: {
    plugins: [tailwindcss()],
  },
  // Removed @astrojs/sitemap; using manual public/sitemap.xml instead.
});
