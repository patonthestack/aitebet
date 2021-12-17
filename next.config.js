const withPWA = require('next-pwa');
const withPlugins = require('next-compose-plugins');
const prod = process.env.NODE_ENV === 'production';

const nextConfig = {
  future: {
    webpack5: true,
  },
  crossOrigin: 'anonymous',
  generateEtags: false,
  poweredByHeader: false,
  reactStrictMode: true,
  compression: true,
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    iconSizes: [],
    domains: ['firebasestorage.googleapis.com'],
    path: '/_next/image',
    loader: 'default',
  },
};

module.exports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          disable: prod ? false : true,
          dest: 'public',
        },
      },
    ],
  ],
  nextConfig,
);
