import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://codewithbre.com',
  integrations: [mdx(), icon()],
  output: 'static',
});
