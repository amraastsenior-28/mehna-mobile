import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// When building inside GitHub Actions for Pages, assets must be served from
// the /mehna-mobile/ subpath. For local dev and Capacitor Android builds,
// the base stays at root '/'.
const base = process.env.GITHUB_PAGES === 'true' ? '/mehna-mobile/' : '/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [
    react(),
    tailwindcss(),
  ],
})
