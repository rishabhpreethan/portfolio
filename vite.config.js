import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/portfolio/',
  optimizeDeps: {
    include: ['@react-three/fiber', '@react-three/drei', 'gsap', 'three'],
  },
  build: {
    outDir: 'build'
  }
})
