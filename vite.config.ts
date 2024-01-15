import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      pages: "/src/pages",
      src: "/src",
      assets: "/src/assets",
      data: "/src/data",
      components: "/src/components",
      ui: "/src/components/ui",
    },
  },
})
