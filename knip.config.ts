import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  project: ['src/**/*.{ts,tsx}'],
  rspack: {
    config: ['rspack.config.ts'],
  },
};

export default config;
