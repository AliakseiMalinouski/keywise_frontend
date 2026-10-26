import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from '@rspack/cli';
import { rspack, type SwcLoaderOptions } from '@rspack/core';
import { ReactRefreshRspackPlugin } from '@rspack/plugin-react-refresh';

const root = path.dirname(fileURLToPath(import.meta.url));
const isDev = process.env.NODE_ENV === 'development';
const apiPath = process.env.KEYWISE_API_PATH ?? '';

export default defineConfig({
  entry: {
    main: './src/main.tsx',
  },
  target: ['browserslist:last 2 versions, > 0.2%, not dead, Firefox ESR'],
  resolve: {
    extensions: ['...', '.ts', '.tsx', '.jsx'],
    tsConfig: path.join(root, 'tsconfig.json'),
    alias: {
      '&network': path.resolve(root, 'src/network'),
      '&constants': path.resolve(root, 'src/constants'),
      '&containers': path.resolve(root, 'src/containers'),
      '&ui': path.resolve(root, 'src/ui'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(?:png|jpe?g|gif|webp|ico|svg)$/i,
        type: 'asset',
      },
      {
        test: /\.css$/,
        type: 'css/auto',
      },
      {
        test: /\.(?:js|jsx|mjs|cjs|ts|tsx|mts|cts)$/,
        use: [
          {
            loader: 'builtin:swc-loader',
            options: {
              detectSyntax: 'auto',
              jsc: {
                transform: {
                  react: {
                    runtime: 'automatic',
                    development: isDev,
                    refresh: isDev,
                  },
                },
              },
            } satisfies SwcLoaderOptions,
          },
        ],
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: './index.html',
      favicon: './src/assets/gamepad.webp',
    }),
    new rspack.DefinePlugin({
      'process.env.KEYWISE_API_PATH': JSON.stringify(apiPath),
    }),
    isDev && new ReactRefreshRspackPlugin(),
  ],
  devServer: {
    open: 'http://localhost:8080/'
  }
});
