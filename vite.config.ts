import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      hooks: "/src/hooks",
      src: "/src",
      assets: "/src/assets",
      components: "/src/components",
      types: "/src/types",
    },
  },
})
