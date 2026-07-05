import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://murikanmangot.in',
  integrations: [sitemap()],
  output: 'static',
  build: { inlineStylesheets: 'auto' },
  vite: { build: { cssMinify: true } },
});
