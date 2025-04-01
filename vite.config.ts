import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import observerPlugin from 'mobx-react-observer/babel-plugin'

export default defineConfig({
  plugins: [react({
    babel: {
      plugins: [observerPlugin()]
    }
  })],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'admin/index.html'),
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8787',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  },
  // @ts-expect-error
  test: {
    coverage: {
      reporter: ['text'],
    },
  },
})
