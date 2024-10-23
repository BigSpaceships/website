import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const base = process.env.VITE_BASE || "/wahaha/";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: base,
})
