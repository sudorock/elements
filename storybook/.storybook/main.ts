import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import { mergeConfig, searchForWorkspaceRoot } from 'vite';
import type { StorybookConfig } from '@storybook/react-vite';
import tailwindcss from '@tailwindcss/vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const libraryRoot = path.resolve(__dirname, '../../lib');

const config: StorybookConfig = {
  stories: ['../src/**/*.story.@(js|jsx|ts|tsx|mdx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-themes',
    '@storybook/addon-docs',
    '@storybook/addon-mcp',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },

  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@elements': path.resolve(__dirname, '../../lib/src'),
          '@story': path.resolve(__dirname, '../src'),
        },
        dedupe: ['react', 'react-dom'],
      },
      server: {
        fs: {
          allow: [searchForWorkspaceRoot(process.cwd()), libraryRoot],
        },
      },
      build: {
        target: 'esnext',
      },
      plugins: [tailwindcss()],
    });
  },
};

export default config;
