import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://minalidya.es',
  output: 'static',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'fr', 'tr', 'it', 'de', 'nl', 'ru'],
    routing: {
        prefixDefaultLocale: false,
        fallbackType: 'redirect'
    }
  }
});
