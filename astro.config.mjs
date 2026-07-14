import { defineConfig } from 'astro/config'
import react from '@astrojs/react'

export default defineConfig({
  site: 'https://hub-vigilancia.sedsodh.org',
  base: '/',
  integrations: [
    react(),
  ],
  output: 'static',
  build: {
    assets: '_assets',
  },
  vite: {
    resolve: {
      alias: { '@': '/src' },
    },
    optimizeDeps: {
      include: ['react-dom/client'],
    },
  },
})
