import { defineConfig } from 'astro/config'
import react from '@astrojs/react'

export default defineConfig({
  site: 'https://sedsodh.github.io',
  base: '/vigilancia-socioassistencial/',
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
