import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'FrontendLib',
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      // If you have external peer dependencies, you can specify them here, e.g.:
      // external: ['react', 'react-dom'],
      // output: {
      //   globals: {
      //     react: 'React'
      //   }
      // }
    },
    sourcemap: true,
    minify: true
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      include: ['src']
    })
  ]
});
