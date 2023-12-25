import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteVue3Bem from "vite-plugin-vue3-bem";
import GoogleFontsPlugin from "google-fonts-webpack-plugin"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ViteVue3Bem()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
