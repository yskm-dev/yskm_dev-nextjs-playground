import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  /* config options here */
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              dimensions: false,
            },
          },
        ],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
