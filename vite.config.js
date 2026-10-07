import { defineConfig } from 'vite';

export default defineConfig({
  base: '/memory-game/',
  server: {
    port: 3000,
    open: true,
  },
});
