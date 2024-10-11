import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    preprocessorOptions: {
      css: {
        import: true,
      },
    },
  },
});
