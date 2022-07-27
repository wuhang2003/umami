process.title = 'Umami (NextJS)';

require('dotenv').config();
const pkg = require('./package.json');

module.exports = {
  env: {
    currentVersion: pkg.version,
    loginDisabled: process.env.DISABLE_LOGIN,
    updatesDisabled: process.env.DISABLE_UPDATES,
    telemetryDisabled: process.env.DISABLE_TELEMETRY,
  },
  basePath: process.env.BASE_PATH,
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },

  rewrites() {
    return {
      fallback: [
        { source: '/hash/:tracker(.*?\\.js)', destination: '/hash/umami.js' },
        { source: '/:tracker(.*?\\.js)', destination: '/umami.js' },
      ],
    };
  },

  async headers() {
    return [
      {
        source: `/(.*\\.js)`,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000', // 30 days
          },
        ],
      },
    ];
  },
};
