import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

const packageJson = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));
const externalPackages = [
  ...Object.keys(packageJson.dependencies ?? {}),
  ...Object.keys(packageJson.peerDependencies ?? {}),
];

const isExternal = (id: string) => {
  return externalPackages.some((pkg) => id === pkg || id.startsWith(`${pkg}/`));
};

export default defineConfig({
  build: {
    cssCodeSplit: true,
    emptyOutDir: true,
    lib: {
      entry: {
        components: resolve(__dirname, 'src/components.ts'),
        utils: resolve(__dirname, 'src/utils-entry.ts'),
        icons: resolve(__dirname, 'src/icons.tsx'),
        styles: resolve(__dirname, 'src/styles.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: isExternal,
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'style.css';
          }

          return '[name][extname]';
        },
        entryFileNames: '[name].js',
      },
    },
    target: 'esnext',
  },
  plugins: [react(), tailwindcss()],
});
