import { defineConfig } from 'vite'
import VueRouter from 'unplugin-vue-router/vite'
import vue from '@vitejs/plugin-vue'
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({

    }),
    vue(),
    VueI18nPlugin({
      include: [path.resolve(__dirname, './locales/**')]
    }),
  ],
  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        404: path.resolve(__dirname, '404.html')
      }
    }
  }
})
