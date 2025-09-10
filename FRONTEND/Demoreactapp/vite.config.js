import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ReactSpringBootCRUD/',
  build: {
    outDir: 'build', // output folder changed from 'dist' to 'build'
  },
})
